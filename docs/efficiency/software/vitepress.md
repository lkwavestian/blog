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
