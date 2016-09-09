# swipeSlide for Zepto/jQuery Plugin

## 简介

移动端（基于Zepto/jQuery）的轮播插件：<http://ons.me/500.html>

## 示例

![扫一扫](website.png)
[普通轮播DEMO链接](http://ximan.github.io/swipeSlide/index.html)

![扫一扫](website-pic.png)
[全屏大图DEMO链接](http://ximan.github.io/swipeSlide/full-screen-pic.html)

![扫一扫](website-text.png)
[全屏文字DEMO链接](http://ximan.github.io/swipeSlide/full-screen-text.html)

![扫一扫](website-switch.png)
[快速切换DEMO链接](http://ximan.github.io/swipeSlide/index-switch.html)

![扫一扫](website-comment.png)
[点小图出大图DEMO链接](http://ximan.github.io/swipeSlide/comment-thumbnails.html)

## 依赖

Zepto 或者 jQuery

## 使用方法

````
$('.element').swipeSlide({
    // 参数
});
````

## 参数列表

|       参数        |   说明   |  默认值 |      可填值     |
|------------------|----------|--------|----------------|
| ul               | 父dom    | ul     | .element的子dom |
| li               | 子dom    | li     | ul的子dom       |
| index            | 轮播初始值 | 0     | 数字       |
| continuousScroll | 连续滚动   | false | true和false |
| autoSwipe        | 自动切换   | true  | true和false |
| speed            | 切换速度   | 4000  | 数字        |
| axisX            | X轴滚动   | true   | true和false |
| transitionType   | 过渡类型   | ease  | linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier |
| lazyLoad         | 图片懒加载 | false | true和false |
| firstCallback    | 页面加载回调| 空    | function(i,sum,me){}（i为索引值，sum为总和，me为自己） |
| callback         | 每次滚动回调| 空    | function(i,sum,me){}（参数同上） |

## API

暴露一些功能，可以让swipeSlide更灵活的使用

`goTo(num)` 指定轮播，详见[DEMO4代码](index-switch.html)

## 最新版本

### 3.4.4(160909)

* 修复自动切换但连不续滚动时，手动操作首屏向前滑动或者末屏向后滑动，不自动切换bug

[所有更新日志](Changelog.md)

## 缺点

只能固定高度或者成比例宽度，无法自适应高度。