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

### 容器颜色

### 导航毛玻璃

### 隐藏横条

```

```
