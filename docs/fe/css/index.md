# CSS 理论知识点

> 记录一些（那啥需要的）理论知识点，其他的 [CSS 语法与技巧请点这里](/workflow/css/spec)

## 样式优先级

1. !important

> [关于!important 的几点说明](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before)

2. 行内样式
3. id 选择器
4. 属性选择器 类选择器 伪类选择器
5. 元素选择器 伪元素选择器

## 伪选择器（伪元素和伪类）

伪选择器包含**伪元素**和**伪类**，其都是添加到一个选择器末尾的关键字。

### 伪元素

伪元素即伪元素选择器，**是通过元素内部创造假的元素**，其不能匹配任何真实存在的 `html` 元素，使用双冒号（`::`）语法

> 由于旧版本的 `W3C` 规范没有做约束，所以在绝大多数的浏览器中都同时支持双冒号和单冒号的写法

::: details 常用的伪元素选择器

- [`::before`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before) 在选定元素的第一个子元素前插入内容
- [`::after`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after) 在选定元素的最后一个子元素后插入内容
  - 都默认为行内元素
  - 都需要 [`content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content) 属性配合（用于指定要插入的内容）
  - 都不能应用在替换元素上， 比如 `<img />` 或 `<br />` 元素
- [`::first-line`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-line) 为块级元素第一行指定样式
  - 只能在块元素中使用（即 `display` 属性为这些值： `block`、`inline-block`、`table-cell`、`list-item` 或 `table-caption`）
- [`::first-letter`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-letter) 为块级元素第一行的第一个字符指定样式
  - 只能在块元素中使用（同 `::first-line`）
- [`::selection`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::selection) 为文档中被用户选中或处于高亮状态的部分指定样式
  - 仅这些样式可用：`color`、`background-color`、`cursor`、`caret-color`、`outline`、`text-decoration`、`text-emphasis-color`、`text-shadow`
- [`::placeholder`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::placeholder) 为一个表单元素的占位文本指定样式

:::

### 伪类

伪类即伪类选择器，**表示元素的某种状态**，使用单冒号（`:`）语法

::: details 常用的伪类选择器

- 用户行为伪类
  - [`:hover`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:hover) 手型经过伪类，鼠标经过时触发（主要使用在 `PC` 端，移动端也可以使用但消失不敏捷，体验不太好）
  - [`:active`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:active) 激活状态伪类，元素被点击时触发（主要用于点击反馈，键盘访问无法触发）
  - [`:focus`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus) 焦点伪类，元素处于聚焦状态时触发（其只能匹配特定的元素）
    - 非 `disabled` 状态的表单元素，如 `<input>`
    - 包含 `href` 属性的 `<a>` 元素
    - `＜area>` 元素（可以生效的 `CSS` 属性有限）
    - `<summary>` 元素
    - 设置了 `tabindex` 属性的普通元素
  - [`:focus-within`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-within) 整体焦点伪类，在当前元素或其任意其子元素处于聚焦状态时触发
- `URL` 定位伪类
  - [`:link`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:link) 链接历史伪类，匹配页面上 `href` 属性没有被访问过的 `<a>` 元素
  - [`:any-link`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:any-link) 超链接伪类，匹配每一个有 `href` 属性的 `<a>`、`<area>` 或 `<link>` 元素
  - [`:target`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:target) 目标伪类，匹配锚点定位的元素（`url` 上 `hash` 值所对应的一个包含 `id` 选择器的元素）
- 输入状态伪类
  - [`:disabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:disabled) 禁用状态伪类，匹配被禁用的元素（主要是表单元素）
  - [`:read-only`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-only) 只读状态伪类，匹配输入框是否只读（只作用于 `<input>` 和 `<textarea>`）
  - [`:placeholder-shown`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:placeholder-shown) 占位符显示伪类，在 `<input>` 或 `<textarea>` 元素显示 `placeholder` 时生效
  - [`:default`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:default) 默认选项伪类，匹配处于默认状态下的表单元素
  - [`:checked`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:checked) 选中状态伪类，匹配任何处于选中状态的`<radio>`、`<checkbox>` 或 `select` 中的 `option` 元素
- 文档树结构伪类
  - [`:root`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root) 匹配文档树的根元素（`<html>`），其除了优先级更高之外其他与 `html` 选择器相同
  - [`:empty`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:empty) 匹配没有没有子元素的元素，子元素只可以是元素节点或文本（包括空格）
  - [`:first-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-child) 匹配一组兄弟元素中的第一个元素
  - [`:last-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-child) 匹配一组兄弟元素中的最后一个元素
  - [`:only-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-child) 匹配没有任何兄弟元素的元素
  - [`:nth-child()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child) 匹配指定位置序号的元素
  - [`:nth-last-child()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-child) 从后面匹配指定位置序号的元素
  - [`:first-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-of-type) 匹配当前标签类型元素的第一个
  - [`:last-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-of-type) 匹配当前标签类型元素的最后一个
  - [`:only-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-of-type) 匹配唯一的标签类型元素
  - [`:nth-of-type()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-of-type) 匹配指定索引的当前标签类型元素
  - [`:nth-last-of-type()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-of-type) 从后面匹配指定索引的当前标签类型元素
- 逻辑组合伪类
  - [`:not`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not) 反选伪类（也可以叫反选伪类），匹配不符合一组选择器的元素
- 其他伪类
  - [`:fullscreen`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:fullscreen) 匹配当前处于全屏显示模式下的元素
  - [`:dir()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:dir) 方向伪类，匹配特定文字书写方向的元素

:::

推荐阅读[张鑫旭的《CSS 选择器世界》](https://book.douban.com/subject/34846688/)

## 继承

在 `CSS` 中有一个很重要的特性就是**子元素会继承父元素对应属性计算后的值**。<br/>
`CSS` 属性很多，但**并不是所有的属性默认都是能继承父元素对应属性**的，那哪些属性存在默认继承的行为呢？一定是那些不会影响到页面布局的属性，可以分为如下几类：

1. 字体相关：`font-family`、`font-style`、`font-size`、`font-weight` 等；
2. 文本相关：`text-align`、`text-indent`、`text-decoration`、`text-shadow`、`letter-spacing`、`word-spacing`、`white-space`、`line-height`、`color` 等；
3. 列表相关：`list-style`、`list-style-image`、`list-style-type`、`list-style-position` 等；
4. 其他属性：`visibility`、`cursor` 等；

对于其他默认不继承的属性也可以通过以下几个属性值来控制继承行为：

1. `inherit`：继承父元素对应属性的计算值；
2. `initial`：应用该属性的默认值，比如 color 的默认值是 #000；
3. `unset`：如果属性是默认可以继承的，则取 inherit 的效果，否则同 initial；
4. `revert`：效果等同于 unset，兼容性差。

## 什么是文档流

在 CSS 的世界中，会把内容按照从**左到右、从上到下**的顺序进行排列显示。正常情况下会把页面分割成一行一行的显示，而每行又可能由多列组成，所以从视觉上看起来就是从上到下从左到右，而这就是 CSS 中的流式布局，又叫文档流。文档流就像水一样，能够自适应所在的容器，一般它有如下几个特性：

- 块级元素**默认会占满整行**，所以多个块级盒子之间是从上到下排列的；
- 内联元素默认会在**一行里一列一列的排布**，当一行放不下的时候，会自动切换到下一行继续按照列排布；

### 如何脱离文档流呢？

脱流文档流指节点脱流正常文档流后，在正常文档流中的其他节点将**忽略该节点并填补其原先空间**。文档一旦脱流，计算其父节点高度时不会将其高度纳入，脱流节点不占据空间。有两种方式可以让元素脱离文档流：浮动和定位。

- 使用 **浮动`float`** 会将元素脱离文档流，移动到容器左/右侧边界或者是另一个浮动元素旁边，该浮动元素之前占用的空间将被别的元素填补，另外浮动之后所占用的区域不会和别的元素之间发生重叠；
- 使用 **绝对定位`position: absolute`或者固定定位`position: fixed`** 也会使得元素脱离文档流，且空出来的位置将自动被后续节点填补。

## 盒模型

::: tip 什么是盒模型？

当对一个文档进行布局时，浏览器的渲染引擎会根据标准之一的 **`CSS` 基础框盒模型**（CSS basic box model），将所有元素表示为一个个矩形的盒子；`CSS` 决定这些盒子的大小、位置以及属性（如颜色、背景、边框尺寸等）

每个盒子（即盒模型）从外到内由这四个部分组成

- `margin` 外边距（不计入盒子的实际大小）
- `border` 边框
- `padding` 内边距
- `content` 内容

[CSS 基础框盒模型介绍 - CSS：层叠样式表 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)

:::

盒模型分为 **`W3C` 标准盒模型**和 **`IE` 盒模型**，其区别只有一个：**计算盒子实际大小（即总宽度/总高度）的方式不一样**

> 以宽度计算来举 🌰

- `W3C` 标准盒模型（默认）
  - **盒子实际宽 = `width` + `padding` + `border`**
  - 其中 **`width` 只包含 `content`**（即内容区域的宽度）
  - **通过 `box-sizing: content-box;` 来设置为 `W3C` 标准盒模型**
- `IE` 盒模型
  - **盒子实际宽 = `width`**
  - 其中 **`width` = `content` + `border` + `padding`**
  - **通过 `box-sizing: border-box;` 来设置为 `IE` 盒模型**

## 关于`BFC`

> 先了解一些前置知识：格式化上下文（Formatting Context）

::: tip 前置知识：格式化上下文（Formatting Context）
格式化上下文（Formatting Context）即 `FC`，**是 `Web` 页面中一种特殊的渲染区域，并有一套渲染规则，它决定了其元素如何排列、定位，以及和其他元素的关系和相互作用**

在 `CSS` 中，每个元素都属于一个特定的格式化上下文。有一些元素自带格式化上下文，例如根元素（`html`）、块级元素、浮动元素、绝对定位元素等。其他元素则可以通过一些 `CSS` 属性来创建自己的格式化上下文，例如 `display: inline-block`、`overflow: hidden`、`float: left` 等。
:::

> **相关资料**：
>
> - [Introduction to formatting contexts 格式化上下文简介 - CSS：层叠样式表 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flow_Layout/Intro_to_formatting_contexts)
> - [块格式化上下文 | MDN](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/Guide/CSS/Block_formatting_context)
> - [Block formatting contexts | W3C CSS2.1](https://www.w3.org/TR/CSS2/visuren.html#block-formatting)

`BFC` 即块级格式化上下文（Block Formatting Context），是 `Web` 页面中一种渲染模式，用于确定块级元素如何排列、定位和与其他元素交互，其相当于一个独立的容器，里面的元素和外部的元素相互不影响

### `BFC` 的布局规则

- `BFC` 内部的 `Box` 会在垂直方向，一个接一个的放置（**不会出现元素重叠**）
- `BFC` 中两个 `Box` 垂直方向的距离由 `margin` 决定
- **同一个 `BFC` 中两个相邻 `Box` 的垂直边距 `margin` 会发生重叠**，在不同的 `BFC` 中则不会发生重叠
- `BFC` 中每个子元素的左外边距（`margin-left`）与容器父元素的左边界相接触（`border-left`）
- `BFC` 中元素的布局不受外界的影响，也不会影响到外界的元素
  - 形成了 `BFC` 的区域**不会与浮动元素区域重叠**
  - **计算 `BFC` 的高度时，浮动元素也会参与计算**

### `BFC` 如何创建

- 根元素（`<html>`）
- 浮动元素：`float` 不为 `none`
- 绝对定位元素：`position` 为 `absolute` 或 `fixed`
- `display` 值为如下属性
  - `inline-block` 行内块元素
  - `flow-root` 块级元素盒
  - `table` 该行为类似于 `<table>` 元素
  - `table-cell` 该行为类似于 `<td>` 元素
  - `table-caption` 该行为类似于 `<caption>`
  - `table-row` 该行为类似于 `<tr>` 元素
  - `table-row-group` 该行为类似于 `<tbody>` 元素
  - `table-header-group` 该行为类似于 `<thead>` 元素
  - `table-footer-group` 该行为类似于 `<tfoot>` 元素
  - `inline-table` 内联表格
- `display` 值为 `flex` `inline-flex` `grid` `inline-grid` 的直接子元素，且它们本身都不是 `flex`、`grid`、 `table` 容器
- `contain` 值为 `layout`、`content` 或 `paint` 的元素
- `overflow` 不为 `visible` 和 `clip` 的块元素
- 多列容器：`column-count` 或 `column-width` 值不为 `auto`
- `column-span` 值为 `all`

### `BFC` 的应用场景

> BFC 解决了什么问题？

1. **解决外边距 `margin` 重叠（塌陷）问题**

在同一个 BFC 下，外边距会发生重叠现象，设置不同的`BFC`可以用来解决这个问题。

```html
<style>
  div {
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
  }
</style>
<body>
  <div></div>
  <div></div>
</body>
```

从效果上看，因为两个`div` 元素都处于同一个 `BFC` 容器下 (这里指 `body` 元素) 所以第一个 `div` 的下边距和第二个 `div` 的上边距发生了重叠，所以两个盒子之间上边距只有 `100px`，而不是 `200px`.
如果想要避免外边距的重叠，可以将其放在不同的`BFC`容器中。

```html
<style>
  .container {
    overflow: hidden;
  }
  p {
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
  }
</style>
<body>
  <div></div>
  <div></div>
</body>
```

2. **包含浮动元素，清除浮动**

我们都知道，浮动的元素会脱离普通文档流，计算高度时浮动元素不会被包含在内，来看下面一个例子：

```html
<div style="border: 1px solid #000;">
  <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```

由于容器内元素浮动，脱离了文档流，所以容器只剩下 2`px` 的边距高度。如果使触发容器的 `BFC`，那么容器将会包裹着浮动元素，元素的高度就会包含其内部的浮动元素。

```html
<div style="border: 1px solid #000;overflow: hidden">
  <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```

3. **阻止元素被浮动元素覆盖，也可以用来进行两栏布局**

先来看一个文字环绕效果：

```html
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee">
  我是一个没有设置浮动, 也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;
</div>
```

![link](./images//bfc1.png)

这时候其实第二个元素有部分被浮动元素所覆盖，(但是文本信息不会被浮动元素所覆盖) 如果想避免元素被覆盖，可触第二个元素的 `BFC` 特性，在第二个元素中加入` overflow: hidden`，就会变成:

![link](./images/bfc2.png)

这个方法可以用来实现两列自适应布局，效果不错，这时候左边的宽度固定，右边的内容自适应宽度(去掉上面右边内容的宽度)。

### 常见的格式化上下文总结

- `BFC`：块级格式化上下文（Block Formatting Context）
- `IFC`：行内格式化上下文（Inline Formatting Context）在 `IFC` 中元素会沿着基线对齐并按从左到右的顺序排列
- `TCFC`：表格单元格格式化上下文（Table Cell Formatting Context）在 `TCFC` 中表格的列宽会根据单元格的内容自动调整，而不会出现列宽不一致的情况
- `FFC`：弹性盒子格式化上下文（Flexbox Formatting Context）在 `FFC` 中弹性盒子元素可以按照自己的尺寸和顺序进行排列。
- `GFC`：网格格式化上下文（Grid Formatting Context）在 `GFC` 中网格元素可以按照网格的行和列进行排列

`FFC` 和 `GFC` 除布局之外规则与 `BFC` 块格式上下文类似，其容器中不存在浮动子元素，但排除外部浮动和阻止外边距重叠仍然有效

## 定位

## 图文样式

### lineHeight 的继承问题

以下代码，`p`标签的行高将会是多少？

```html
<style>
  body {
    font-size: 20px;
    line-height: 200%;
  }
  p {
    font-size: 16px;
  }
</style>
<body>
  <p>aaa</p>
</body>
```

答案是`40px `<br/>

在计算子元素`lineHeight`的值时，父元素值为具体数值、比例、百分比时，继承机制会有一定区别<br/>

具体为：

1. 父元素的`linHeight`值为具体数值时，子元素的`lineHeight`值就为父元素的`lineHeight`值。如果父元素的值为`20px`，子元素的值也会是`20px`
2. 父元素的`lineHeight`值为比例时，子元素会继承该比例并根据自己的`fontSize`值计算自己的`lineHeight`值。如果父元素的`lineHeight`值为`1.5`，子元素的`fontSize`值为`16px`时，子元素的`lineHeight`值就为`16px * 2 = 32px`
3. 父元素的`lineHeight`值为百分比时，子元素会继承父元素根据`fontSize`与该比例计算出来的值。如果父元素的`lineHeight`值为`200%`，父元素的`fontSize`值为`20px`时，子元素的`lineHeight`值就为`20px * 200% = 40px`

### 几个元素隐藏属性的对比

在`css`中，将元素隐藏的方式`3`种，他们的特性又各不相同

![link](./images/hide.png)

::: details 具体的区别

1. 事件绑定

`display:none` ：元素已经不在页面上，自然也无法触发在元素上面绑定的事件<br/>
`visibility: hidden` ：元素上绑定的事件也无法触发<br/>
`opacity`：虽然元素的透明度为 0，但其事件还在，所以可以触发上面的绑定事件

2. 对于空间的占用

`display:none` ：隐藏的时候不占空间，显示的时候自动占空间，自然会导致回流<br/>
`visibility: hidden`：隐藏的时候也会占据实际空间<br/>
`opacity`：只是让元素产生透明度，对空间没有影响

3. 继承相关

`visibility`具有继承性，给父元素设置`visibility:hidden`;子元素也会继承这个属性。但是如果重新给子元素设置`visibility: visible`,则子元素又会显示出来。这个和`display: none`有着质的区别

:::

## 实现垂直水平居中

#### `text-align` + `line-height`

> 只能**在行内内容在一行时使用**（换行了就 GG），同时还需要**知道高度的具体值**

```css
.parent {
  height: 150px;
  /* 行高的值要与 height 一致 */
  line-height: 150px;
  text-align: center;
}
.child {
  /* 如果子元素是块级元素需要改为行内或行内块级才能生效 */
  display: inline-block;
  vertical-align: middle;
}
```

#### `absolute + transform`

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  left: 50%;
  top: 50%;
  tansform: translate(-50%, -50%);
}
```

#### `display: table-cell`

```css
.parent {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
```

#### `flex`

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

#### `flex + margin`

```css
.parent {
  display: flex;
}
.child {
  margin: auto;
}
```

#### `grid`

```css
.parent {
  display: grid;
}
.child {
  justify-self: center;
  align-self: center;
}
```

#### `grid + margin`

```css
.parent {
  display: grid;
}
.child {
  margin: auto;
}
```

## 弹性布局：`Flex`

### `Flex`基本概念

![import](./images/flex-basic.png)

在 `flex` 容器中默认存在两条轴，水平主轴(`main axis`) 和垂直的交叉轴(`cross axis`)。水平方向是默认的主轴，当然也可以通过修改使垂直方向变为主轴，水平方向变为交叉轴。<br/>
在容器中的每个单元块被称之为 `flex item`，每个项目占据的主轴空间为 (`main size`), 占据的交叉轴的空间为 (`cross size`)。

### `Flex`容器

首先，实现 `flex` 布局需要先指定一个容器，任何一个容器都可以被指定为 `flex` 布局，这样容器内部的元素就可以使用 `flex`来进行布局。

```css
.container {
  display: flex | inline-flex; //可以有两种取值
}
```

上面的代码分别生成一个块状或行内的 `flex` 容器盒子。简单说来，如果你使用块元素如 `div`，你就可以使用 `flex`，而如果你使用行内元素如`span`，你可以使用 `inline-flex`。<br/>
需要注意的是：当时设置 `flex` 布局之后，子元素的 `float`、`clear`、`vertical-align` 的属性将会失效。
只有下面六种属性可以设置在容器上，它们分别是：

1. `flex-direction`：决定主轴的方向(即项目的排列方向)

```html
<style>
  .container {
    flex-direction: row | row-reverse | column | column-reverse;
  }
</style>
<body>
  <div class="container">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </div>
</body>
```

`row`：默认值，主轴为水平方向，起点在左端。

![import](./images/row.png)

`row-reverse`：主轴为水平方向，起点在右端

![import](./images/row-reverse.png)

`column`：主轴为垂直方向，起点在上

![import](./images/column.png)

`column-reverse`：主轴为垂直方向，起点在下

![import](./images/column-reverse.png)

2. `flex-wrap`：决定容器内项目是否可换行

```html
<style>
  .container {
    flex-wrap: nowrap | wrap | wrap-reverse;
  }
</style>
<body>
  <div class="container">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
  </div>
</body>
```

`nowrap`：默认值，表示不换行，即当主轴尺寸固定时，空间不足时，项目尺寸会随之调整,所有的项目会在同一行并不会挤到下一行

![import](./images/noWrap.png)

`wrap`：换行，项目主轴总尺寸超出容器时会换行，第一行在上方

![import](./images/wrap.png)

`wrap-reverse`：换行，第一行在下方

![import](./images/wrap-reverse.png)

`column-reverse`：主轴为垂直方向，起点在下

![import](./images/column-reverse.png)

::: tip `flex-direction` 和 `flex-wrap` 的简写属性：`flex-flow`

```css
.container {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

默认值为: `row` `nowrap`，感觉没什么卵用，老老实实分开写就好了。~~这样就不用记住这个属性了~~。

:::

3. `justify-content`：决定主轴的方向(即项目的排列方向)

```html
<style>
  .container {
    justify-content: flex-start | flex-end | center | space-between | space-around;
  }
</style>
<body>
  <div class="container">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
  </div>
</body>
```

`flex-start`：默认值，左对齐。

![import](./images/flex-start.png)

`flex-end`：右对齐。

![import](./images/flex-end.png)

`center`：居中

![import](./images/center.png)

`space-between`：两端对齐，项目之间的间隔相等，即剩余空间等分成间隙

![import](./images/space-between.png)

`space-around`：每个项目两侧的间隔相等，所以项目之间的间隔比项目与边缘的间隔大一倍

![import](./images/space-around.png)

4. `align-items`：定义了项目在交叉轴上的对齐方式

```html
<style>
  .container {
    flex-direction: row;
    align-items: flex-start | flex-end | center | baseline | stretch;
  }
</style>
<body>
  <div class="container">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
  </div>
</body>
```

> 注意：以下测试是在水平方向为主轴的前提下测试的，即 flex-direction: row

`stretch`：默认值，即如果项目未设置高度或者设为 auto，将占满整个容器的高度。

![import](./images/stretch.png)

假设容器高度设置为 `100px`，在所有项目都没有设置高度的情况下，项目的高度也为 `100px`。

`flex-start`：交叉轴的起点对齐。

假设容器高度设置为 100px，而项目分别为 20px, 40px, 60px, 80px, 100px, 则如下图显示。

![import](./images/items-start.png)

`flex-end`：交叉轴的终点对齐

![import](./images/items-end.png)

`center`：交叉轴的中点对齐

![import](./images/items-center.png)

`baseline`：项目的第一行文字的基线对齐,以文字的底部为主，仔细看图可以理解

![import](./images/items-baseLine.png)

5. `align-content`：定义了多根轴线的对齐方式，如果项目只有一根轴线，那么该属性将不起作用

```html
<style>
  .container {
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
  }
</style>
<body>
  <div class="container">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>....</div>
    <div>12</div>
  </div>
</body>
```

这个属性我们可以这样理解：
当 `flex-wrap` 设置为 `nowrap` 的时候，容器仅存在一根轴线，因为项目不会换行，就不会产生多条轴线。
当 `flex-wrap` 设置为 `wrap` 的时候，容器可能会出现多条轴线，这时候就需要去设置多条轴线之间的对齐方式了。

> 注意：以下测试是在水平方向为主轴、并且不换行的前提下测试的，即 flex-direction: row; flex-wrap: nowrap

`stretch`：默认值，看下图。

![import](./images/content-stretch.png)

从图可以看出又三条轴线(因为容器宽度有限)，当值为 `stretch` 时三条轴线会平分容器的垂直方向上的空间。
值得注意的是，虽然在每条轴线上项目的默认值也为 `stretch`，但是由于我每个项目我都设置了高度，所以它并没有撑开整个容器。

如果项目不设置高度的话就会变成下面这样：

![import](./images/content-stretch-noHeight.png)

可以看到，项目会自动分配高度，所以项目会占满整个容器。

`flex-start`：轴线全部在交叉轴上的起点对齐

![import](./images/content-start.png)

`flex-end`：轴线全部在交叉轴上的终点对齐

![import](./images/content-end.png)

`center`：轴线全部在交叉轴上的中间对齐

![import](./images/content-center.png)

`space-between`：轴线两端对齐，之间的间隔相等，即剩余空间等分成间隙

![import](./images/content-between.png)

`space-around`：每个轴线两侧的间隔相等，所以轴线之间的间隔比轴线与边缘的间隔大一倍

![import](./images/content-around.png)

到这里关于容器上的所有属性都讲完了，接下来是`Flex`的项目属性，即在 `flex item` 上设置的属性。

### `Flex`项目属性

1. `order`：定义项目在容器中的排列顺序，数值越小，排列越靠前，默认值为 `0`

```html
<style>
  .container {
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
  }
</style>
<body>
  <div class="container">
    <div>1</div>
    <div>3</div>
    <div>5</div>
    <div style="order: -2">-2</div>
    <div style="order: -1">-1</div>
  </div>
</body>
```

![import](./images/order.png)

可以看到，在 `HTML` 结构中，虽然 `-2`，`-1` 的 `item` 排在后面，但是由于它们分别设置了 `order`为`-2`和和 `-1`，他们就能够排到最前面。

2. `flex-basis`: 定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间

```css
.item {
  flex-basis: <length> | auto;
}
```

默认值：`auto`，即项目本来的大小, 这时候 `item` 的宽高取决于 `width` 或 `height` 的值

当主轴为水平方向时，项目设置了 `flex-basis`后，项目的宽度设置值会失效，`flex-basis` 需要跟 `flex-grow` 和 `flex-shrink` 配合使用才能发挥效果。

- 当 `flex-basis` 值为 `0` 时，是把该项目视为零尺寸的，表现上，该`item`会被折叠到最小值
- 当 `flex-basis` 值为 `auto` 时，则跟根据尺寸的设定值(假如为 `100px`)，则这 `100px` 不会纳入剩余空间。

3. `flex-grow`: 当有剩余空间时，定义项目的放大比例

```css
.item {
  flex-grow: <number>;
}
```

默认值为 `0`，即如果存在剩余空间，也不放大

![import](./images/flex-grow.png)

当所有的项目都以 `flex-basis` 的值进行排列后，仍有剩余空间，那么这时候 `flex-grow` 就会发挥作用了。
如果所有项目的 `flex-grow` 属性都为 `1`，则它们将等分剩余空间。(如果有的话)
如果一个项目的 `flex-grow` 属性为 `2`，其他项目都为 `1`，则前者占据的剩余空间将比其他项多一倍。

如果当所有项目以 `flex-basis` 的值排列完后发现空间不够用了，且 `flex-wrap：nowrap` 时，此时 `flex-grow`则不起作用了（因为容器本身已经没有剩余空间了），这时候就需要接下来的这个属性。

4. `flex-shrink`: 当空间不足时，定义了项目的缩小比例

```css
.item {
  flex-shrink: <number>;
}
```

默认值: `1`，即如果空间不足，该项目将缩小，负值对该属性无效。

![import](./images/flex-shrink.png)

如果容器宽度为`200px`，即使我们手动给每个项目设置了宽度`50px`,但因为有`6`个元素,总宽度为`50*6=300px`，已经超过了容器宽度，这时候

- 如果每个容器都设置了`flex-shrink:1`，每个项目都会等比例缩小
- 如果一个项目的 `flex-shrink` 值 `0`，其他项目都为 `1`，则空间不足时，前者不缩小。

::: details `flex: 1` 代表什么？

看一些组件库的源代码时，经常会遇到`flex:1`这个属性，那么这个属性到底是啥意思？

[`flex`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex) 是一个 `CSS` 简写属性，用于设置 `Flex` 项目如何增大或缩小以适应其 `Flex` 容器中可用的空间

::: tip `flex` 是 `flex-grow` `flex-shrink` `flex-basis` 属性的简写

- [flex-grow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow) 用于**设置 `flex` 项目的增长系数**
  - 负值无效
  - 初始值为 `0`
  - 省略时默认值为 `1`
- [flex-shrink](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink) 用于**设置 `flex` 项目的收缩系数**（仅在默认 `width/height` 之和大于容器时生效）
  - 负值无效
  - 初始值为 `1`
  - 省略时默认值为 `1`
- [flex-basis](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis) 用于**设置 `flex` 项目在主轴方向上的初始大小**
  - 初始值为 `auto`
  - 省略时默认值为 `0`

**`flex` 缩写语法规则**

**单值语法规则**

```css{17,18}
/* 全局属性值 */
/* 初始值 */
flex: initial; => flex: 0 1 auto
/* 从其父级继承 (flex 属性不可被继承，将设置为初始值) */
flex: inherit; => flex: 0 1 auto
/* 是关键字 initial 和 inherit 的组合(当属性可继承时为 inherit 不可继承时为 initial) */
flex: unset; => flex: 0 1 auto


/* 关键字值 */
/* 容器的宽度与高度来确定尺寸，容器有剩余空间就项目就均匀放大，容器无剩余空间就均匀缩小 弹性 */
flex: auto; => flex: 1 1 auto
/* 根据自身宽高来设置尺寸 非弹性 */
flex: none; => flex: 0 0 auto


/* 无单位数: flex-grow（标题答案）*/
flex: 1; => 1 1 0
flex: 0; => 0 1 0


/* 一个有效的 width/height 值: flex-basis */
flex: 10px; => 1 1 10px
flex: 20em; => 1 1 20em
flex: min-content; => 1 1 min-content
```

**双值语法规则**

1. **第一个值必须为一个无单位数**
2. 第二个值必须为以下之一
   1. **无单位数**：当作 `flex-shrink` 值
   2. **有效的 `width/height` 值**：当作 `flex-basis` 值

```css
/* 无单位数: flex-grow | flex-shrink */
flex: 2 2; => 2 2 0

/* 有效的 width/height 值: flex-grow | flex-basis */
flex: 2 30px; => 2 1 30px
```

**三值语法规则**

1. **第一个值必须为一个无单位数**，当作 `flex-grow` 值
2. **第二个值必须为一个无单位数**，当作 `flex-shrink` 值
3. **第三个值必须为一个有效的 `width/height` 值**，当作 `flex-basis` 值

```css
flex: 2 2 10%;
```

[`Flex` 语法和计算规则](https://github.com/maomao1996/daily-notes/issues/23)。
:::

## `link` 和 `@import` 加载样式的区别

[`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link) 是一个 `HTML` 标签，其规定了当前文档与外部资源的关系

[`@import`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@import) 是一个 `CSS` 语法规则，用于从其他样式表导入样式规则

::: tip `link` 和 `@import` 加载样式的区别

- 从属关系
  - `<link>` 是一个 `HTML` 标签，只能出现在 `<head>` 标签中
  - `@import` 是一个 `CSS` 语法规则，只能在 `<style>` 标签和 `CSS` 文件中使用
- 应用范围
  - `<link>` 标签用于链接各种类型的外部资源（这里只举三个 🌰）
    - 加载 `CSS`：`<link rel="stylesheet" href="/index.css" />`
    - 加载网站图标（`favicon`）：`<link rel="icon" href="favicon.ico" />`
    - `DNS` 预解析：`<link rel="dns-prefetch" href="https://notes.fe-mm.com">`
  - `@import` 只能用于引入 `CSS`
- 加载顺序
  - `<link>` 会在浏览器加载页面时同时加载（多个 `<link>` 会并行加载）
  - `@import` 会在浏览器解析到 `CSS` 中的 `@import` 时再加载（多个 `@import` 会串行加载）
- `DOM` 可控性
  - `<link>` 可以通过 `JavaScript` 操作 `DOM` 进行插入
  - `@import` 没有 `DOM` 接口，无法通过 `JavaScript` 操作

:::

::: warning 关于 `@import` 的加载顺序

网上很多文章都说 `@import` 引入的 `CSS` 将在页面加载完毕后被加载，其实这个说法是有问题的，比如下面这段代码，我在 `style` 标签里面使用的 `@import`，难道还要在页面加载完毕后再去加载

```html
<!DOCTYPE html>
<html>
  <head>
    <title>关于 @import 的加载顺序</title>
    <!-- 在 style 中使用 import 引入 css -->
    <style>
      @import url(./import.css);
    </style>
    <!-- 使用 link 引入 css -->
    <link href="./link.css" rel="stylesheet" />
  </head>
  <body>
    关于 @import 的加载顺序
  </body>
</html>
```

然后打开浏览器 `network` 面板去查看具体资源的加载时间

> `import.css` 排队时间

![import](./images/import.png)

> `link.css` 排队时间

![link](./images/link.png)

所以 `@import` 的加载顺序要看其写在哪里，而不能一概而论

:::
