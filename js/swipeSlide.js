/**
 * Zepto swipeSlide Plugin
 * 西门 http://ons.me/500.html
 * 20150130 v2.2.1
 */

;(function($){
    'use strict';
    $.fn.swipeSlide = function(options,callback){
        var _index = 0,
            _startX = 0,
            _startY = 0,
            _moveX = 0,
            _moveY = 0,
            _moveResultX = 0,
            _moveResultY = 0,
            _moveDistance = 0,
            _curX = 0,
            _curY = 0,
            autoScroll,
            _touchDistance = 50,
            _loadPicNum = 0,
            firstMovePrev = true,
            allowSlideClick = true,
            $this = $(this),
            browser = {
                ie10 : window.navigator.msPointerEnabled,
                ie11 : window.navigator.pointerEnabled
            },
            events = ['touchstart','touchmove','touchend'],
            support = {
                touch : (window.Modernizr && Modernizr.touch === true) || (function () {
                    return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
                })()
            },
            opts = $.extend({}, {
                ul : $this.children('ul'),              // 父dom
                li : $this.children().children('li'),   // 子dom
                continuousScroll : false,               // 连续滚动
                autoSwipe : true,                       // 自动切换
                speed : 4000,                           // 切换速度
                axisX : true,                           // X轴
                transitionType : 'ease',                // 过渡类型
                lazyLoad : false                        // 懒加载
            }, options || {}),
            _liWidth = opts.li.width(),
            _liHeight = opts.li.height(),
            _liLength = opts.li.length,
            callback = callback || function(){};

        // 判断浏览器
        if (browser.ie10) events = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
        if (browser.ie11) events = ['pointerdown', 'pointermove', 'pointerup'];

        // 触摸赋值
        var touchEvents = {
            touchStart : events[0],
            touchMove : events[1],
            touchEnd : events[2]
        };

        // 初始化
        (function(){
            // 如果轮播小于等于1个，跳出
            if(_liLength <= 1){
                fnLazyLoad(0);
                return false;
            }

            // 连续滚动，需要复制dom
            if(opts.continuousScroll){
                opts.ul.prepend(opts.li.last().clone()).append(opts.li.first().clone());
                if(opts.axisX){
                    fnTranslate(opts.ul.children().first(),_liWidth*-1);
                    fnTranslate(opts.ul.children().last(),_liWidth*_liLength);
                }else{
                    fnTranslate(opts.ul.children().first(),_liHeight*-1);
                    fnTranslate(opts.ul.children().last(),_liHeight*_liLength);
                }
            }

            // 懒加载图片
            if(opts.lazyLoad){
                var i = 0;
                if(opts.continuousScroll){
                    _loadPicNum = 3;
                }else{
                    _loadPicNum = 2;
                }
                for(i; i < _loadPicNum; i++){
                    fnLazyLoad(i);
                }
            }

            // IE触控
            if(browser.ie10 || browser.ie11){
                var action = '';
                if(opts.axisX){
                    action = 'pan-y';
                }else{
                    action = 'none';
                }
                $this.css({'-ms-touch-action':action,'touch-action':action});
            }

            // 给初始图片定位
            if(opts.axisX){
                opts.li.each(function(i){
                    fnTranslate($(this),_liWidth*i);
                });
            }else{
                opts.li.each(function(i){
                    fnTranslate($(this),_liHeight*i);
                });
            }

            // 自动滚动
            fnAutoSwipe();

            // 回调
            callback(_index);

            $this.on('click',function(){
                return allowSlideClick;
            });

            // 绑定触摸
            $this.on(touchEvents.touchStart,function(e){
                fnTouches(e);
                fnTouchstart(e);
            });
            $this.on(touchEvents.touchMove,function(e){
                fnTouches(e);
                fnTouchmove(e);
            });
            $this.on(touchEvents.touchEnd,function(){
                fnTouchend();
            });
        })();

        // css过渡
        function fnTransition(dom,num){
            dom.css({
                '-webkit-transition':'all '+num+'s '+opts.transitionType,
                'transition':'all '+num+'s '+opts.transitionType
            });
        }

        // css滚动
        function fnTranslate(dom,result){
            if(opts.axisX){
                dom.css({
                    '-webkit-transform':'translate3d(' + result + 'px,0,0)',
                    'transform':'translate3d(' + result + 'px,0,0)'
                });
            }else{
                dom.css({
                    '-webkit-transform':'translate3d(0,' + result + 'px,0)',
                    'transform':'translate3d(0,' + result + 'px,0)'
                });
            }
        }

        // 懒加载图片
        function fnLazyLoad(index){
            if(opts.lazyLoad){
                var $li = opts.ul.children();
                var $thisImg = $li.eq(index).find('[data-src]');
                if($thisImg){
                    if($thisImg.is('img')){
                        $thisImg.attr('src',$thisImg.data('src'));
                        $thisImg.removeAttr('data-src');
                    }else{
                        $thisImg.css({'background-image':'url('+$thisImg.data('src')+')'});
                        $thisImg.removeAttr('data-src');
                    }
                }
            }
        }

        // touches
        function fnTouches(e){
            if(support.touch && !e.touches){
                e.touches = e.originalEvent.touches;
            }
        }

        // touchstart
        function fnTouchstart(e){
            _startX = support.touch ? e.touches[0].pageX : (e.pageX || e.clientX);
            _startY = support.touch ? e.touches[0].pageY : (e.pageY || e.clientY);
        }

        // touchmove
        function fnTouchmove(e){
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
            if(opts.autoSwipe){
                clearInterval(autoScroll);
            }
            allowSlideClick = false;
            _curX = support.touch ? e.touches[0].pageX : (e.pageX || e.clientX);
            _curY = support.touch ? e.touches[0].pageY : (e.pageY || e.clientY);
            _moveX = _moveResultX = _curX - _startX;
            _moveY = _moveResultY = _curY - _startY;
            fnTransition(opts.ul,0);
            if(opts.axisX){
                if(!opts.continuousScroll){
                    if(_index == 0 && _moveResultX > 0){
                        _moveResultX = 0;
                        return fnAutoSwipe();
                    }else if((_index + 1) >= _liLength && _moveResultX < 0){
                        _moveResultX = 0;
                        return fnAutoSwipe();
                    }
                }
                fnTranslate(opts.ul,-(_liWidth * (parseInt(_index)) - _moveResultX));
            }else{
                if(!opts.continuousScroll){
                    if(_index == 0 && _moveResultY > 0){
                        _moveResultY = 0;
                        return fnAutoSwipe();
                    }else if((_index + 1) >= _liLength && _moveResultY < 0){
                        _moveResultY = 0;
                        return fnAutoSwipe();
                    }
                }
                fnTranslate(opts.ul,-(_liHeight * (parseInt(_index)) - _moveResultY));
            }
        }

        // touchend
        function fnTouchend(){
            if(opts.axisX){
                _moveDistance = _moveResultX;
            }else{
                _moveDistance = _moveResultY;
            }

            // 解决IE滑动触发click
            if(Math.abs(_moveX) < 5){
                allowSlideClick = true;
            }
            setTimeout(function(){
                allowSlideClick = true;
            },100);

            // 距离小
            if(Math.abs(_moveDistance) <= _touchDistance){
                fnScroll(.3);
            // 距离大
            }else{
                // 手指触摸上一屏滚动
                if(_moveDistance > _touchDistance){
                    fnMovePrev();
                    fnAutoSwipe();
                // 手指触摸下一屏滚动
                }else if(_moveDistance < -_touchDistance){
                    fnMoveNext();
                    fnAutoSwipe();
                }
            }
            _moveX = _moveResultX = 0,_moveY = _moveResultY = 0;
        }

        // 滚动方法
        function fnScroll(num){
            fnTransition(opts.ul,num);
            if(opts.axisX){
                fnTranslate(opts.ul,-_index*_liWidth);
            }else{
                fnTranslate(opts.ul,-_index*_liHeight);
            }
        }

        // 滚动判断
        function fnMove(){
            if(opts.continuousScroll){
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
            }else{
                if(_index >= _liLength){
                    _index = 0;
                }else if(_index < 0){
                    _index = _liLength-1;
                }
                fnScroll(.3);
            }
            callback(_index);
        }

        // 下一屏滚动
        function fnMoveNext(){
            _index++;
            fnMove();
            if(opts.lazyLoad){
                if(opts.continuousScroll){
                    fnLazyLoad(_index+2);
                }else{
                    fnLazyLoad(_index+1);
                }
            }
        }

        // 上一屏滚动
        function fnMovePrev(){
            _index--;
            fnMove();
            // 第一次往右滚动懒加载图片
            if(firstMovePrev && opts.lazyLoad){
                var i = _liLength-1;
                for(i; i <= (_liLength+1); i++){
                    fnLazyLoad(i);
                }
                firstMovePrev = false;
                return;
            }
            if(!firstMovePrev && opts.lazyLoad){
                fnLazyLoad(_index);
            }
        }
        
        // 自动滚动
        function fnAutoSwipe(){
            if(opts.autoSwipe){
                autoScroll = setInterval(function(){
                    fnMoveNext();
                },opts.speed);
            }
        }
    }
})(window.Zepto || window.jQuery);