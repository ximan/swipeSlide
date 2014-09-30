/**
 * Zepto swipeSlide Plugin
 * 西门 http://ons.me/500.html
 * 20140930 v1.1
 */

;(function($){
    'use strict';
    $.fn.swipeSlide = function(options,callback){
        var _index = 0,
            _startX = 0,
            _moveX = 0,
            _curX = 0,
            autoSwipe,
            _touchDistance = 50,
            firstScrollRight = true,
            $this = $(this),
            opts = $.extend({}, {
                ul : $this.children('ul'),
                li : $this.children().children('li'),
                autoSwipe : true,
                speed : 4000,
                lazyLoad : false
            }, options || {}),
            _liWidth = opts.li.width(),
            _liLength = opts.li.length,
            callback = callback || function(){};

        // 初始化
        (function(){
            // 复制dom
            opts.ul.prepend(opts.li.last().clone()).append(opts.li.first().clone());
            fnTranslate(opts.ul.children().first(),_liWidth*-1);
            fnTranslate(opts.ul.children().last(),_liWidth*_liLength);

            // 懒加载图片
            if(opts.lazyLoad){
                var i = 0;
                for(i; i<=2; i++){
                    fnLazyLoad(i);
                }
            }

            // 给初始图片定位
            opts.li.each(function(i){
                fnTranslate($(this),_liWidth*i);
            });

            // 自动滚动
            fnAutoSwipe();

            // 回调
            callback(_index);

            // 绑定触摸
            $this.on('touchstart',function(e){
                fnTouches(e);
                fnTouchstart(e);
            });
            $this.on('touchmove',function(e){
                fnTouches(e);
                fnTouchmove(e);
            });
            $this.on('touchend',function(){
                fnTouchend();
            });
        })();

        // css过渡
        function fnTransition(dom,num){
            dom.css({
                '-webkit-transition':'all '+num+'s',
                'transition':'all '+num+'s'
            });
        }

        // css滚动
        function fnTranslate(dom,result){
            dom.css({
                '-webkit-transform':'translate3d(' + result + 'px,0,0)',
                'transform':'translate3d(' + result + 'px,0,0)'
            });
        }

        // 懒加载图片
        function fnLazyLoad(index){
            if(opts.lazyLoad){
                var $thisImg = opts.ul.find('img').eq(index);
                if($thisImg.attr('data-src')){
                    $thisImg.attr('src',$thisImg.attr('data-src')).removeAttr('data-src');
                }
            }
        }

        // touches
        function fnTouches(e){
            if(!e.touches){
                e.touches = e.originalEvent.touches;
            }
        }

        // touchstart
        function fnTouchstart(e){
            _startX = e.touches[0].pageX;
        }

        // touchmove
        function fnTouchmove(e){
            e.preventDefault();
            if(opts.autoSwipe){
                clearInterval(autoSwipe);
            }
            _curX = e.touches[0].pageX;
            _moveX = _curX - _startX;
            fnTransition(opts.ul,0);
            fnTranslate(opts.ul,-(_liWidth * (parseInt(_index)) - _moveX));
        }

        // touchend
        function fnTouchend(){
            // 距离小
            if(Math.abs(_moveX) <= _touchDistance){
                fnScroll(.3);
            // 距离大
            }else{
                // 手指触摸向右滚动
                if(_moveX > _touchDistance){
                    fnMoveRight();
                    fnAutoSwipe();
                // 手指触摸向左滚动
                }else if(_moveX < -_touchDistance){
                    fnMoveLeft();
                    fnAutoSwipe();
                }
            }
            _moveX = 0;
        }

        // 滚动方法
        function fnScroll(num){
            fnTransition(opts.ul,num);
            fnTranslate(opts.ul,-_index*_liWidth);
        }

        // 滚动判断
        function fnMove(){
            if(_index >= _liLength){
                fnScroll(.3);
                _index = 0;
                setTimeout(function(){
                    fnScroll(0);
                },300);
            }else if(_index < 0){
                fnScroll(.3);
                _index = _liLength-1;
                setTimeout(function(){
                    fnScroll(0);
                },300);
            }else{
                fnScroll(.3);
            }
            callback(_index);
        }

        // 向左滚动
        function fnMoveLeft(){
            _index++;
            fnMove();
            if(opts.lazyLoad){
                fnLazyLoad(_index+2);
            }
        }

        // 向右滚动
        function fnMoveRight(){
            _index--;
            fnMove();
            // 第一次往右滚动懒加载图片
            if(firstScrollRight && opts.lazyLoad){
                var i = _liLength-1;
                for(i; i <= (_liLength+1); i++){
                    fnLazyLoad(i);
                }
                firstScrollRight = false;
                return;
            }
            if(!firstScrollRight && opts.lazyLoad){
                fnLazyLoad(_index);
            }
        }
        
        // 自动滚动
        function fnAutoSwipe(){
            if(opts.autoSwipe){
                autoSwipe = setInterval(function(){
                    fnMoveLeft();
                },opts.speed);
            }
        };
    }
})(window.Zepto || window.jQuery);