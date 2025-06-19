---
description: "千浔的 vitepress 配置，对 vitepress 的探索与扩展"
---

# VitePress 配置

## 搜索功能（Docsearch）

`VitePress` 的内部集成有`Algolia` 的 `Algolia DocSearch` ，我们可以直接配置使用。

先看下 vitePress 官方给的配置

```ts{4-12}
export default defineConfig({

  themeConfig: {
    //Algolia搜索
    search: {
      provider: 'algolia',
      options: {
        appId: '<Application ID>',
        apiKey: '<Search-Only API Key>',
        indexName: '<INDEX_NAME>',
      },
    },
  },

})
```

配置缺少关键 Key，我们需要先[注册 Algolia 账号](https://dashboard.algolia.com/users/sign_in)。

## 样式美化

### 彩虹背景动画

在 [UnoCSS](https://unocss.dev/) 首页中，它的标题和图片背景有类似彩虹的渐变色动画

具体效果可以看下面这个 `GIF` 图：

![UnoCSS 官网图](./images//unocss.gif)

效果还是挺明显的：左侧 `UnoCSS` 文字、`Getting Started` 按钮以及右侧 `Logo` 都有彩虹渐变背景的动画效果

我们同样可以实现这种效果

在 `theme/style` 新建 `rainbow.css` 文件，在 `rainbow.css` 中 写一个名为 `rainbow` 关键帧

::: details 点我查看代码
<<< @/.vitepress/theme/styles/rainbow.scss
:::

接着使用这个关键帧

在 `theme/index.ts` 中写入代码

```ts{2-3,10-17,22-39}
/* .vitepress/theme/index.ts */ // [!code focus:3]
// 彩虹背景动画样式
let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,

  enhanceApp({app , router }) {
    // [!code focus:8]
    // 彩虹背景动画样式
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }

  },
}
// [!code focus:18]
// 彩虹背景动画样式
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}

```

这段代码的逻辑是这样的：

1. 先定义一个动画样式变量 `homePageStyle` ，类型为 `HTMLStyleElement`
2. 创建一个名为 `updateHomePageStyle` 的函数，函数的作用是根据传入的参数 `value` 来判断是否需要添加动画样式。如果 `value` 为真并且 `homePageStyle` 不存在，则创建一个新的样式元素 `homePageStyle` ，并设置样式内容为动画样式，使用我们之前创建的关键帧 `rainbow `。然后将 `homePageStyle` 添加到 `body` 元素中。如果 `value` 为假，则移除样式元素
3. 之后使用 `watch` 监听 路由是否变化，如果路由变化，则执行 `updateHomePageStyle 函数`，在当前页面是首页的情况下，给函数传 `true`，否则传 `false`

::: details 为什么不直接在全局样式中写 animation ?

**主要是性能方面的考虑**

如果直接在全局 `CSS` 中添加动画：

```css
:root {
  animation: rainbow 12s linear infinite;
}
```

那么这个动画会在所有页面都运行，即使你已经离开首页`（/）`进入其他页面。这会导致：

- ❌ 动画资源浪费（即使不需要该动画时也持续运行）

- ❌ 可能影响性能（尤其是复杂的动画或低端设备上）

我们当前代码中通过 `Vue` 的 `watch` 监听路由变化，并调用 `updateHomePageStyle(location.pathname === "/") `实现了以下效果：

- ✔️ 按需加载动画,提升性能

  只在访问首页 `/` 时才插入带有动画的 `<style>` 标签，当用户浏览其他页面时，动态移除动画样式，这样可以避免不必要的资源消耗，提升性能

- ✔️ 精确控制动画生命周期

  通过手动控制动画样式的添加与移除，可以确保动画状态始终与当前页面匹配，避免出现“页面已切换但动画仍在运行”的不一致行为

💡 **类似场景举例**

这种做法常见于以下场景：

- 首页背景动画
- 页面加载特效
- 某些页面独有的交互动画
- `A/B` 测试中的特定样式注入

:::

### 引用颜色更改

在 Markdown 中，我们常用的引用符号是 `>`，关于引用的样式我们我们可以稍微改动一下

在 `theme/style` 新建 `blockquote.css` 文件，并且复制下面代码，粘贴到 `blockquote.css` 中

```css
/* .vitepress/theme/style/blockquote.css */
.vp-doc blockquote {
  border-radius: 10px;
  padding: 18px 20px 20px 15px;
  position: relative;
  background-color: var(--vp-c-gray-soft);
  border-left: 6px solid var(--vp-c-green-2);
}
```

然后在 `index.css` 中引入生效

```css
/* .vitepress/theme/style/index.css */
@import "./blockquote.css";
```

输入：

```md
> 更新时间：2024 年
```

输出：

> 更新时间：2024 年

### 容器颜色

`vitePress` 中 `tip`、`warning`、`danger` 等容器的样式不太好看，这里我们参考[Vuepress/hope 主题的容器颜色](https://theme-hope.vuejs.press/zh/guide/markdown/stylize/hint.html#%E6%BC%94%E7%A4%BA)去实现一套我们自己的方案

在 `theme/style` 新建 `custom-block.css` 文件，复制下面代码，粘贴到 `custom-block.css` 中

::: details 点我查看代码

<<< @/.vitepress/theme/styles/custom-block.scss

:::

---

更改之前效果：

![customBlockBefore](./images/customBlockBefore.png)

更改之后效果：

![customBlockAfter](./images/customBlockAfter.png)

更改之后加了左边框、图标，看着好看多了

### 导航毛玻璃

在 `theme/style` 文件夹，然后新建 `blur.css` 并填入如下代码

```css
/* .vitepress\theme\style\blur.css */
:root {
  /* 首页下滑后导航透明 */
  .VPNavBar:not(.has-sidebar):not(.home.top) {
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(10px);
  }

  /* 搜索框透明 */
  .DocSearch-Button {
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(10px);
  }

  /* Feature透明 */
  .VPFeature {
    border: none;
    box-shadow: 0 10px 30px 0 rgb(0 0 0 / 15%);
    background-color: transparent;
  }

  /* 文档页侧边栏顶部透明 */
  .curtain {
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(10px);
  }

  @media (min-width: 960px) {
    /* 文档页导航中间透明 */
    .VPNavBar:not(.home.top) .content-body {
      background-color: rgba(255, 255, 255, 0);
      backdrop-filter: blur(10px);
    }
  }

  /* 移动端大纲栏透明 */
  .VPLocalNav {
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(10px);
  }
}
```

最后引入 `index.css` 中 即可看到效果

```css
/* style/index.css */
@import "./blur.css";
```

---

更改之前效果：

![blurBefore](./images/blurBefore.gif)

更改之后效果：

![blurAfter](./images/blurAfter.gif)

相比较更改之前导航栏纯白的背景，更改之后的导航栏有一个毛玻璃的效果，体验感会更好

### 记号笔

在某些整段的文字中，我们可以用记号笔，划出重点。这里的记号笔效果参考了[尤大的个人主页](https://evanyou.me/)

在 `theme/style` 新建 `marker.css` 文件，将下面代码，复制粘贴到 `marker.css` 中

```css [marker.css]
/* .vitepress/theme/style/marker.css */

/* 尤雨溪主页记号笔效果 不喜欢可自行调整 */
.marker {
  white-space: nowrap;
  position: relative;
}

.marker:after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 66%;
  left: 0em;
  right: 0em;
  bottom: 0;
  transition: top 200ms cubic-bezier(0, 0.8, 0.13, 1);
  background-color: rgba(79, 192, 141, 0.5);
}

.marker:hover:after {
  top: 0%;
}
```

然后在 `index.css` 中引入生效

```css
/* .vitepress/theme/style/index.css */
@import "./marker.css";
```

输入：

```md
<sapn class="marker">这里是尤雨溪的主页样式，鼠标放在我上面看效果</sapn>
```

输出：

<sapn class="marker">这里是尤雨溪的主页样式，鼠标放在我上面看效果</sapn>

---

### 代码块

将代码块改成 Mac 风格，三个小圆点

在 `.vitepress/theme/style` 目录新建一个 `vp-code.css` 文件，复制下面代码，粘贴到 `vp-code.css` 保存

```css
/* .vitepress/theme/style/vp-code.css */

/* 代码块：增加留空边距 增加阴影 */
.vp-doc div[class*="language-"] {
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%);
  padding-top: 20px;
}

/* 代码块：添加macOS风格的小圆点 */
.vp-doc div[class*="language-"]::before {
  content: "";
  display: block;
  position: absolute;
  top: 12px;
  left: 12px;
  width: 12px;
  height: 12px;
  background-color: #ff5f56;
  border-radius: 50%;
  box-shadow: 20px 0 0 #ffbd2e, 40px 0 0 #27c93f;
  z-index: 1;
}

/* 代码块：下移行号 隐藏右侧竖线 */
.vp-doc .line-numbers-wrapper {
  padding-top: 40px;
  border-right: none;
}

/* 代码块：重建行号右侧竖线 */
.vp-doc .line-numbers-wrapper::after {
  content: "";
  position: absolute;
  top: 40px;
  right: 0;
  border-right: 1px solid var(--vp-code-block-divider-color);
  height: calc(100% - 60px);
}

.vp-doc div[class*="language-"].line-numbers-mode {
  margin-bottom: 20px;
}
```

然后在 `index.css` 中引入生效

```css
/* .vitepress/theme/style/index.css */
@import "./vp-code.css";
```

更改之前效果：

![](./images//vpCodeBefore.png)

更改之后效果:

![](./images//vpCodeAfter.png)

更改之后加了边框阴影和顶部左侧的小圆点，更好看了

---

### 代码组

在更改代码块的基础上，更改代码组样式

在 `.vitepress/theme/style` 目录新建一个 `vp-code-group.css` 文件，复制下面代码，粘贴到 `vp-code-group.css` 保存

```css
/* .vitepress/theme/style/vp-code-group.css */

/* 代码组：tab间距 */
.vp-code-group .tabs {
  padding-top: 20px;
}

/* 代码组：添加样式及阴影 */
.vp-code-group {
  color: var(--vp-c-black-soft);
  border-radius: 8px;
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%);
}

/* 代码组：添加macOS风格的小圆点 */
.vp-code-group .tabs::before {
  content: " ";
  position: absolute;
  top: 12px;
  left: 12px;
  height: 12px;
  width: 12px;
  background: #fc625d;
  border-radius: 50%;
  box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
}

/* 代码组：修正倒角、阴影、边距 */
.vp-code-group div[class*="language-"].vp-adaptive-theme.line-numbers-mode {
  border-radius: 8px;
  box-shadow: none;
  padding-top: 0px;
}

/* 代码组：隐藏小圆点 */
.vp-code-group div[class*="language-"].vp-adaptive-theme.line-numbers-mode::before {
  display: none;
}

/* 代码组：修正行号位置 */
.vp-code-group .line-numbers-mode .line-numbers-wrapper {
  padding-top: 20px;
}

/* 代码组：修正行号右侧竖线位置 */
.vp-code-group .line-numbers-mode .line-numbers-wrapper::after {
  top: 24px;
  height: calc(100% - 45px);
}

/* 代码组（无行号）：修正倒角、阴影、边距 */
.vp-code-group div[class*="language-"].vp-adaptive-theme {
  border-radius: 8px;
  box-shadow: none;
  padding-top: 0px;
}

/* 代码组（无行号）：隐藏小圆点 */
.vp-code-group div[class*="language-"].vp-adaptive-theme::before {
  display: none;
}
```

然后在 `index.css` 中引入生效

```css
/* .vitepress/theme/style/index.css */
@import "./vp-code-group.css";
```

## 插件

### 图片缩放

主要是使用 [medium-zoom](https://github.com/francoischalifour/medium-zoom) ，参考了[vitepress 的 issues 中找到了方法#854](https://github.com/vuejs/vitepress/issues/854)

::: code-group

```sh [pnpm]
pnpm add -D medium-zoom
```

```sh [yarn]
yarn add -D medium-zoom
```

```sh [npm]
npm install medium-zoom
```

```sh [bun]
bun add -D medium-zoom
```

:::

在 `.vitepress/theme/index.ts` 添加如下代码，并保存

```ts{4-6,11-24}
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

export default {
  extends: DefaultTheme,

  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },

}
```

点击图片后，还是能看到导航栏，加一个遮挡样式

在 `theme/style` 新建 `medium-zoom.scss` 加入如下代码:

```css
/* .vitepress/theme/style/medium-zoom.scss */
:root {
  --medium-zoom-z-index: 100;
  --medium-zoom-c-bg: var(--vp-c-bg);
}

.medium-zoom-overlay {
  /* override element style set by medium-zoom script */
  z-index: var(--medium-zoom-z-index);
  background-color: var(--medium-zoom-c-bg) !important;
}

.medium-zoom-overlay ~ img {
  z-index: calc(var(--medium-zoom-z-index) + 1);
}
```

### 代码组图标

使用的插件是 [@yuyinws/vitepress-plugin-group-icons](https://github.com/yuyinws/vitepress-plugin-group-icons)

参照教程安装：https://vpgi.vercel.app/

::: code-group

```sh [pnpm]
pnpm add -D vitepress-plugin-group-icons
```

```sh [yarn]
yarn add -D vitepress-plugin-group-icons
```

```sh [npm]
npm install vitepress-plugin-group-icons
```

```sh [bun]
bun add -D vitepress-plugin-group-icons
```

:::

然后在 `config.mts` 中配置

```ts{3,8-10,13-17}
// .vitepress/config.mts
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons' // [!code focus]

export default defineConfig({

  markdown: {
    config(md) { // [!code focus:3]
      md.use(groupIconMdPlugin) //代码组图标
    },
  },

  vite: { // [!code focus:5]
    plugins: [
      groupIconVitePlugin() //代码组图标
    ],
  },

})
```

最后还需要再 `index.ts` 中引入样式

```ts{4}
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

import 'virtual:group-icons.css' //代码组样式 // [!code focus]

export default {
  extends: DefaultTheme,
}
```

使用时，请确保代码后有对应的文字触发，如 `sh [pnpm]` 表示这一段代码块是 `pnpm` 的代码块

````md{2,6,10}
::: code-group
```sh [pnpm]
pnpm -v
```

```sh [yarn]
yarn -v
```

```sh [bun]
bun -v
```
:::
````

::: code-group

```sh [pnpm]
pnpm -v
```

```sh [yarn]
yarn -v
```

```sh [bun]
bun -v
```

:::

此插件已经涵盖了所有的常用图标，但是有一个问题：如果我们想给代码为 `js` 的块添加图标，必须写文件名，如：

````md{2,6,10}
::: code-group
```ts [a.ts]
console.log("I'm TypeScript");
```

```js [b.js]
console.log("I'm JavaScript");
```

```md [c.md]
Markdown 图标演示
```

```css [d.css]
h1 {
  background: red;
}
```
:::
````

这是因为在插件的内部逻辑中，`ts`、`js`等图标是根据文件类型去判断添加的。我理想的效果是只需要写文件类型就行了，就比如`js [js]`

那么该如何自定义呢， 我们需要在`config.mts` 中配置:

```ts{3,15-36}
// .vitepress/config.mts
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons' // [!code focus]

export default defineConfig({

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin) //代码组图标
    },
  },

  vite: {
    plugins: [
      groupIconVitePlugin({ // [!code focus:22]
       customIcon: {
          mts: "vscode-icons:file-type-typescript",
          cts: "vscode-icons:file-type-typescript",
          ts: "vscode-icons:file-type-typescript",
          tsx: "vscode-icons:file-type-typescript",
          mjs: "vscode-icons:file-type-js",
          cjs: "vscode-icons:file-type-js",
          json: "vscode-icons:file-type-json",
          js: "vscode-icons:file-type-js",
          jsx: "vscode-icons:file-type-js",
          md: "vscode-icons:file-type-markdown",
          py: "vscode-icons:file-type-python",
          ico: "vscode-icons:file-type-favicon",
          html: "vscode-icons:file-type-html",
          css: "vscode-icons:file-type-css",
          scss: "vscode-icons:file-type-scss",
          yml: "vscode-icons:file-type-light-yaml",
          yaml: "vscode-icons:file-type-light-yaml",
          php: "vscode-icons:file-type-php",
        },
      })
    ],
  },

})
```

最后总体看下使用插件增加代码组图标，更改前后的效果

更改前

![](./images//groupIconBefore.png)

更改后

![](./images//groupIconAfter.png)

---

### 切换路由进度条

当切换页面，顶部会显示进度条，使用的是 [@Skyleen77/nprogress-v2](https://github.com/Skyleen77/nprogress-v2)，使用方法还是挺简单的

先安装 `nprogress-v2`

::: code-group

```sh [pnpm]
pnpm add -D nprogress-v2
```

```sh [yarn]
yarn add -D nprogress-v2
```

```sh [npm]
npm install nprogress-v2
```

```sh [bun]
bun add -D nprogress-v2
```

:::

然后再 `.vitepress/theme/index.ts` 中配置，即可生效

```ts{3-4,7-10,13}
// .vitepress/theme/index.ts

import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式

if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      router.onAfterRouteChanged = () => {
         busuanzi.fetch()
         NProgress.done() // 停止进度条
      }
}
```
