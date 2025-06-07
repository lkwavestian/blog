::: tip

原文地址：[Debouncing and Throttling Explained Through Examples](https://css-tricks.com/debouncing-throttling-explained-examples/)

原文作者：[David Corbacho](https://twitter.com/dcorbacho)

译者：[千浔](https://github.com/lkwavestian)
:::

# 通过实例深入了解防抖与节流

防抖`（Debouncing）`与节流`（Throttling）`是两个相似但又截然不同的技术，他们都用于控制在一段时间内函数执行的次数。

防抖和节流特别适用于`DOM`事件，因为我们会在 `DOM` 事件与执行函数之间多加一层。需要注意一点：我们无法控制 `DOM` 事件的的触发频率，我们只能控制函数执行的频率。

看下面这个滚动事件的例子:

<!-- <div class="cp_embed_wrapper"><iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="268" width="100%" name="cp_embed_1" scrolling="no" src="https://codepen.io/dcorb/embed/PZOZgB?height=268&amp;theme-id=0&amp;slug-hash=PZOZgB&amp;default-tab=result&amp;user=dcorb&amp;name=cp_embed_1" style="width: 100%; overflow:hidden; display:block;" title="CodePen Embed" loading="lazy" id="cp_embed_PZOZgB"></iframe></div> -->

当我们使用触控板、滚轮或者拖动滚动条来滚动时，每秒可以轻松触发 `30` 次滚动事件。甚至在我的测试中，使用智能手机缓慢滚动时，每秒甚至可以触发多达 `100` 次滚动事件。这么高的回调频率，你的执行函数压力真的不大吗？

`2011` 年， `Twitter` 网站曾出现一个`Bug`：当用户向下滑动他们的 `Twitter`摘要时，页面会卡顿甚至变得毫无反应。`John Resig` 发表了一篇[有关问题的博客文章](https://johnresig.com/blog/learning-from-twitter/)，其中解释了将内存消耗昂贵的函数直接绑定在滚动事件上的做法有多糟糕。

`John` 在他的文章中提到了一个解决方案：将 `DOM` 事件与执行函数分开，在 `DOM` 事件之外，每 `250ms` 循环执行一次函数。通过这样一个简单的技术，我们可以避免破坏用户的使用体验。

但是现在，我们有更好的方法去处理这个问题。下面我会结合用例介绍防抖`（Debounce）`、节流`（Throttle）`与 `requestAnimationFrame`这三种技术。

## 防抖（Debounce）

防抖`（Debouncing）`是一种将多个连续的回调合并为一次回调的技术。

![alt text](image.png)

想象你在电梯里。电梯门刚开始关闭时，突然有一个人试图闯进来，由于电梯门还没有完全关闭，它就会重新打开。这时又有一个人试图进来，电梯门又重新打开了。电梯推迟了它的操作（指关闭电梯门并移动到指定楼层），但是最大化了它的承载能力。

可以在下面这个例子上试验一下：在 `Trigger area` 按钮内移动鼠标或者点击该按钮：

<!-- <div class="cp_embed_wrapper"><iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="380" width="100%" name="cp_embed_2" scrolling="no" src="https://codepen.io/dcorb/embed/KVxGqN?height=268&amp;theme-id=0&amp;slug-hash=KVxGqN&amp;default-tab=result&amp;user=dcorb&amp;name=cp_embed_2" style="width: 100%; overflow:hidden; display:block;" title="CodePen Embed" loading="lazy" id="cp_embed_KVxGqN"></iframe></div>
 -->

::: tip 译者注：
这里原作者做了一个可视化条形图巧妙的展示了防抖的功能。

每个色块表示一次回调函数的执行，色块宽度其实代表 100ms 的时间间隔。

后文的几个例子与此例原理相似，只不过触发事件不同。在这个例子中，事件触发可以在`Trigger area`按钮内移动或者点击。以看到：原始事件每次触发都会显示当前颜色，而防抖事件只有停止触发后 400ms 才显示。

:::

你可以直观感受到一系列连续且快速的事件是如何被一个防抖事件所取代的。但是如果这些事件的间隔时间过长，防抖就不会生效。

### 立即执行（lead/immediate）

在上面的例子中，你可能会发现一个令人苦恼的现象：防抖事件会等待触发函数执行，一系列事件停止后，防抖事件才会立即执行。为什么它不会立即执行？那样的话它就跟原本的非 `debounce` 处理无异了。
直到两次快速调用之间的停顿结束，事件才会再次触发。

以下是个带`leading`标记的例子：

![alt text](image-1.png)

在 `underscore.js` 中，选项叫 `immediate` ，而不是 `leading`

你可以在下面这个例子上试验一下：

<!-- <div class="cp_embed_wrapper"><iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="268" width="100%" name="cp_embed_3" scrolling="no" src="https://codepen.io/dcorb/embed/GZWqNV?height=268&amp;theme-id=0&amp;slug-hash=GZWqNV&amp;default-tab=result&amp;user=dcorb&amp;name=cp_embed_3" style="width: 100%; overflow:hidden; display:block;" title="CodePen Embed" loading="lazy" id="cp_embed_GZWqNV"></iframe></div> -->

### 防抖实现

我第一次看到用 `javascript` 实现防抖是在 [John Hann ](http://unscriptable.com/2009/03/20/debouncing-javascript-methods/)的博客上(同时他也是防抖这一概念的提出者)。

不久之后后，`Ben Alman` 做了个 [jQuery 插件](https://benalman.com/projects/jquery-throttle-debounce-plugin/)（已经不再维护），一年后 `Jeremy Ashkenas` [把它加入了 underscore.js](https://github.com/jashkenas/underscore/commit/9e3e067f5025dbe5e93ed784f93b233882ca0ffe)。而后加入了 `Lodash` 。

这三种方法在内部实现上面稍有不同，但是他们的接口几乎一致。

在之前的一段时间内，`underscore.js` 实现 `debounce` 和 `throttle` 的方法还是源自于 `lodash`，但是在我发现 `lodash` 中[关于 debounce 实现的一个 bug 之](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)后，这两种方案的实现就分开了。

`lodash` 为它的`_.debounce` 和 `_.throttle` 添加了更多功能。之前的 `immediate` 被 `leading` 和 `trailing` 选项取代。你可以选一种，或者都选，默认只有 `trailing` 启用。

新的 `maxWait` 选项（在此时只有 `moment` 有）在本文中没有被提及，但是这个选项非常有用。事实上，`throttle` 函数正式在 `debounce` 函数的基础上又利用 `maxWait` 来实现的，具体细节你可以`lodash` 源码。

### 防抖应用实例

**调整窗口宽高例子**

当我们调整浏览器窗口大小时，会多次触发窗口 `resize` 事件。

看下面这个例子（尝试下调整你的浏览器窗口大小）：

<!-- <div class="cp_embed_wrapper"><iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="268" width="100%" name="cp_embed_5" scrolling="no" src="https://codepen.io/dcorb/embed/XXPjpd?height=268&amp;theme-id=0&amp;slug-hash=XXPjpd&amp;default-tab=result&amp;user=dcorb&amp;name=cp_embed_5" style="width: 100%; overflow:hidden; display:block;" title="CodePen Embed" loading="lazy" id="cp_embed_XXPjpd"></iframe></div> -->

就如你在代码中看到的，我们为这个 `resize` 事件设置了默认的 `trailing` 选项，因为我们只关心用户停止调整浏览器窗口时的最终值。

**通过 keypress 触发 Ajax 请求**

为什么当用户输入时，`Ajax` 请求会频繁地触发？`_.debounce` 函数会帮助我们减少重复请求，只在用户最终停止输入后才发送一次请求。

在这个例子中，我们不需要 `leading` 标记，我们想等待最后一个字符输入完。

<!-- <div class="cp_embed_wrapper"><iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="268" width="100%" name="cp_embed_6" scrolling="no" src="https://codepen.io/dcorb/embed/mVGVOL?height=268&amp;theme-id=0&amp;slug-hash=mVGVOL&amp;default-tab=result&amp;user=dcorb&amp;name=cp_embed_6" style="width: 100%; overflow:hidden; display:block;" title="CodePen Embed" loading="lazy" id="cp_embed_mVGVOL"></iframe></div> -->

类似的应用场景其实还有很多，比如表单的校验：当用户输入完成停止输入后，才去校验 `input`，展示密码太短的提示。

## 如何去使用防抖和节流以及常见坑

自己去写一个防抖和节流函数或者随便从其他文章 `cv` 一下是个很省事的做法。但是我的建议是直接使用 `underscore.js` 或者 `lodash` ，如果你仅仅需要使用`.debounce` 和 `.throttle` 方法，可以使用 `Lodash` 的自定义构建工具，生成一个 `2KB` 的压缩库。使用以下的简单命令即可：

```js
npm i -g lodash-cli
lodash include = debounce, throttle
```

一个常见的坑是不止一次调用`.debounce` 函数

```jquery
// WRONG
$(window).on('scroll', function() {
   _.debounce(doSomething, 300);
});

// RIGHT
$(window).on('scroll', _.debounce(doSomething, 200));
```

如果你需要的话，可以将 `_.debounce` 函数的返回值保存在变量中，之后可以使用 `cancel` 方法 取消这个函数的调用。

```jquery
var debounced_version = _.debounce(doSomething, 200);
$(window).on('scroll', debounced_version);

// If you need it
debounced_version.cancel();
```

## 节流（Throttle）

通过使用 `_.throttle` 函数，我们可以限制函数在指定的时间间隔内最多调用一次。

它与防抖的重要区别是，节流会保证调用函数至少在规定的时间间隔内会规律的调用。

### 节流例子

**无限滚动**

无限滚动一个常见的使用节流的例子。用户在你的无限滚动页面中向下滚动。你需要知道用户的滚动条距离最顶部还需要多远，如果用户滚动条已经接近低部，你需要加载更多数据。

在这个应用场景下，我们的`_debounce` 函数将不起作用，因为它只会在在用户停止滚动时触发一次...而我们需要的是在用户滚动条接近底部之前就请求内容（此时用户的滚动条可能还在滚动中）。

通过`_.throttle` 函数，我们可以确保在用户滚动过程中，我们可以持续的获得用户滚动条与底部的距离。

<!-- <div class="cp_embed_wrapper"><iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="268" width="100%" name="cp_embed_7" scrolling="no" src="https://codepen.io/dcorb/embed/eJLMxa?height=268&amp;theme-id=0&amp;slug-hash=eJLMxa&amp;default-tab=result&amp;user=dcorb&amp;name=cp_embed_7" style="width: 100%; overflow:hidden; display:block;" title="CodePen Embed" loading="lazy" id="cp_embed_eJLMxa"></iframe></div> -->

## requestAnimationFrame (rAF)

requestAnimationFrame 是限制函数执行频率的另一种方法

它的效果与 \_\_.throttle(dosomething,16)一致。但它有着更高的准确度，因为它是浏览器专门用来提高准确度的一个原生 API。

我们可以把它当作 throttle 函数的一个替代品，他有着以下优缺点：

**优点：**

- 动画将保持 60fps（每一帧 16 ms），但是浏览器内部会决定渲染的最佳时机
- 简洁标准的 API，后期维护成本低

**缺点：**

- 当使用`rAFs`时，开始和结束需要我们自己去定义，.debounce 和.throttle 内部的函数会自己处理
- 浏览器标签没有激活时，不会执行
- 兼容性问题：当前流行的大多数浏览器都支持，但是 [仍有部分浏览器不支持](https://caniuse.com/?search=requestAnimationFrame)
- `rAF`不支持 node 端，无法在服务器端支持文件系统事件。

根据我的经验，我会在 js 函数需要绘制或者改变元素属性时使用它，在任何包含重新计算元素位置的函数中都可以使用

在发送 ajax 请求，或者动态的添加/删除类名（这将会导致重新渲染）这两个场景时，我会考虑使用 debounce 或者 throttle 函数，因为他们可以设置更低的执行频率（比如使用 200ms 替换 16ms）。

假如你认为 rAF 会在 underscore 或者 lodash 中实现，恰恰想法，他们都没有实现，因为这个 API 是一个专门的用例（指在 16ms 内执行动画），并且它很容易被直接调用。

## rAF 实例

我将仅用下面这一个例子来展示如何使用 rAF 处理滚动事件，灵感来自 Paul Lewis 的文章[如何创建高性能 CSS 动画](https://web.dev/articles/animations-guide?hl=zh-cn)，在这篇文章中，他一步步的解释了这个实例的原理。

<!-- <div class="cp_embed_wrapper"><iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="268" width="100%" name="cp_embed_8" scrolling="no" src="https://codepen.io/dcorb/embed/pgOKKw?height=268&amp;theme-id=0&amp;slug-hash=pgOKKw&amp;default-tab=result&amp;user=dcorb&amp;name=cp_embed_8" style="width: 100%; overflow:hidden; display:block;" title="CodePen Embed" loading="lazy" id="cp_embed_pgOKKw"></iframe></div> -->

我在 headroom.js 库中见过一个更高级的[实例](https://github.com/WickyNilliams/headroom.js/blob/3282c23bc69b14f21bfbaf66704fa37b58e3241d/src/Debouncer.js)，在这个实例中，逻辑被解耦并被包裹在对象中。

## 结论

我们可以使用 debounce、throttle 和 requestAnimationFrame 去优化我们的事件处理函数。三者各不相同，又相辅相成。

总结下目前我们所学到的知识：

- debounce（防抖）:把频繁触发的事件合并到一次执行。
- throttle（节流）:保证事件在某一段时间内恒定的执行次数，比如每 200ms 检查一次滚动位置并触发 css 动画。
- requestAnimationFrame：一个 throttle 的替代物。当你的函数在重新计算渲染屏幕上的元素时，并且你想要保证你的动画的流畅性时，你就可以用它。注意：IE9 不支持。
