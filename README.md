# swipeSlide for Zepto/jQuery Plugin

## 简介

移动端（基于Zepto/jQuery）的轮播插件：<http://ons.me/500.html>

## 示例

![扫一扫](website.png)
[DEMO1链接](http://ons.me/wp-content/uploads/2014/09/swipeSlide/index.html)

![扫一扫](website-pic.png)
[DEMO2链接](http://ons.me/wp-content/uploads/2014/09/swipeSlide/full-screen-pic.html)

![扫一扫](website-text.png)
[DEMO3链接](http://ons.me/wp-content/uploads/2014/09/swipeSlide/full-screen-text.html)

![扫一扫](website-switch.png)
[DEMO4链接](http://ons.me/wp-content/uploads/2014/09/swipeSlide/index-switch.html)

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
| callback         | 回调方法   | 空    | function(i,sum){}（i为索引值，sum为总和） |

## API

暴露一些功能，可以让swipeSlide更灵活的使用

`goTo(num)` 指定轮播，详见[DEMO4代码](index-switch.html)

## 最新版本

### 3.3.1(150427)

* 修复只有1个轮播时不执行lazyLoad和callback

[所有更新日志](Changelog.md)

## 缺点

只能固定高度或者成比例宽度，无法自适应高度。