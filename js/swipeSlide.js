/**
 * Zepto swipeSlide Plugin
 * 西门 http://ons.me/500.html
 * 20140905 v1.0
 */

;(function($){
    $.fn.swipeSlide = function(options,callback){
        var _index = 0,
            _autoSwipe,
            $this = $(this),
            opts = $.extend({}, {
                ul : $this.children('ul'),
                li : $this.children().children('li'),
                autoSwipe : true,
                speed : 4000,
                lazyLoad : false
            }, options || {}),
            _li_length = opts.li.length,
            callback = callback || function(){};

        // 初始化
        (function(){
            // 复制dom
            opts.ul.prepend(opts.li.last().clone()).append(opts.li.first().clone());
            fnTranslate(opts.ul.children().first(),-1);
            fnTranslate(opts.ul.children().last(),_li_length);

            // 懒加载图片
            if(opts.lazyLoad){
                for(var i=0; i<=2; i++){
                    fnLazyLoad(i);
                }
            }

            // 给初始图片定位
            opts.li.each(function(i){
                fnTranslate($(this),i);
            });

            // 自动滚动
            fnAutoSwipe();

            // 回调
            callback(_index);
        })();

        // css滚动
        function fnTranslate(dom,i){
            dom.css({
                '-webkit-transform':'translate3d('+i+'00%,0,0)',
                'transform':'translate3d('+i+'00%,0,0)'
            });
        }

        // css过度
        function fnTransition(dom,num){
            dom.css({
                '-webkit-transition':'all '+num+'s',
                'transition':'all '+num+'s'
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

        // 滚动方法
        function fnScroll(num){
            fnTransition(opts.ul,num);
            fnTranslate(opts.ul,-_index);
        }

        // 滚动判断
        function fnMove(){
            if(_index >= _li_length){
                fnScroll(.3);
                _index = 0;
                setTimeout(function(){
                    fnScroll(0);
                },300);
            }else if(_index < 0){
                fnScroll(.3);
                _index = _li_length-1;
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
        }
        
        // 自动滚动
        function fnAutoSwipe(){
            if(opts.autoSwipe){
                _autoSwipe = setInterval(function(){
                    fnMoveLeft();
                },opts.speed);
            }
        };

        // 手动向左滚动
        $this.swipeLeft(function(){
            clearInterval(_autoSwipe);
            fnMoveLeft();
            fnAutoSwipe();
        });

        // 手动向右滚动
        $this.swipeRight(function(){
            clearInterval(_autoSwipe);
            fnMoveRight();
            fnAutoSwipe();
        });
    }
})(Zepto);