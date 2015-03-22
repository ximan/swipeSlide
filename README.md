# swipeSlide for Zepto/jQuery Plugin

## 简介

移动端（基于Zepto/jQuery）的轮播插件：<http://ons.me/500.html>

## 示例

![扫一扫](website.png)
[DEMO链接](http://ons.me/wp-content/uploads/2014/09/swipeSlide/index.html)

![扫一扫](website-pic.png)
[DEMO链接](http://ons.me/wp-content/uploads/2014/09/swipeSlide/full-screen-pic.html)

![扫一扫](website-text.png)
[DEMO链接](http://ons.me/wp-content/uploads/2014/09/swipeSlide/full-screen-text.html)

![扫一扫](website-switch.png)
[DEMO链接](http://ons.me/wp-content/uploads/2014/09/swipeSlide/index-switch.html)

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
| continuousScroll | 连续滚动   | false | true和false |
| autoSwipe        | 自动切换   | true  | true和false |
| speed            | 切换速度   | 4000  | 数字        |
| axisX            | X轴滚动   | true   | true和false |
| transitionType   | 过渡类型   | ease  | linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier |
| lazyLoad         | 图片懒加载 | false | true和false |
| callback         | 回调方法   | 空    | function(i,sum){}（i为索引值，sum为总和） |

## 最新版本

### 3.2.0(150322)

* 增加回调callback方法sum参数
* 修复连续滚动时只滚动一轮bug

[所有更新日志](Changelog.md)

## 缺点

只能固定高度或者成比例宽度，无法自适应高度。