---
outline: 2
---

# 运维 踩坑记录

## `vue`项目部署后页面跳转正常，但是页面一刷新就报`404`

`vue`项目本身运行正常，部署到服务器之后，页面跳转是正常的，但是跳转后一旦刷新页面，就会出现`404`错误，项目路由模式为`history`模式。

#### 问题原因

当前几乎所有的项目都是前后端分离，对前端的部署来说，其实就是将构建之后的产物上传至目标服务器的`web`容器指定的静态目录下。出现`404`错误意味着资源不存在。

对`vue`来说，由于它是单页面应用，所有的路由切换都是通过动态重写当前页面来完成的。不管我们的页面有多少个路由页面，构建物都只会产出一个`index.html`文件。

看下我们的`nginx`的配置：

```sh
server {
  listen  80;
  server_name  www.xxx.com;

  location / {
    index  /data/dist/index.html;
  }
}
```

这段代码的意思是：当我们在地址栏输入` www.xxx.com` 时，如果域名后没有任何路由，这时会打开我们 dist 目录下的` index.html` 文件，然后根据我们在前端项目里的配置会自动跳转到 `www.xxx.com/login`。

之后若我们尝试在 `website.com/login `页执行刷新操作，`nginx location` 是没有相关配置的，所以就会出现 `404` 的情况。

产生问题的根本原因其实是因为：我们的路由是通过`JS`来执行视图切换的，当我们进入到子路由再刷新页面时，`web`容器没有相对应的页面，就会报`404`错误。

#### 解决方法

原因分析清楚了，解决的方法也就呼之欲出：我们只需要配置下`nginx`，把任何页面都重定向到`index.html`中，将路由解析的工作交给前端来处理

```sh
server {
  listen  80;
  server_name  www.xxx.com;

  location / {
    index  /data/dist/index.html;
    try_files $uri $uri/ /index.html;
  }
}
```

::: warning
这样做之后，当访问到不存在的路由时，服务器就不再返回站内`404`错误页面，因为对所有的路径都会返回`index/html`文件，这个时候前端需要写一个默认顶层的`404`页面来代替站内的`404`页面

```js
const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@views/404.vue'),
  },
]
```

:::

::: details 为什么`hash`模式下没有问题？
`hash` 模式我们都知道是用符号`#`表示的，如 `website.com/#/login`, `hash `的值为 `#/login`

它的特点在于：`hash` 虽然出现在 `URL` 中，但不会被包括在 `HTTP` 请求中，对服务端完全没有影响，因此改变 `hash` 不会重新加载页面

`hash` 模式下，仅 `hash` 符号之前的内容会被包含在请求中，如 `website.com/#/login` 只有 `website.com` 会被包含在请求中 ，因此对于服务端来说，即使没有配置`location`，也不会返回`404`错误
:::

## `vue`部署服务器之后访问部分路由白屏

`vue`项目本身运行正常，部署到服务器之后，访问部分路由会报白屏，项目路由模式为`history`模式

#### 问题原因

如果在项目配置文件里，把里面的 `publicPath` （使用 `Vue CLI` ） 或者 `base` （使用 `Vite` ） 配置成相对路径 `./` ，但是路由配置了二级或以上，那么就会出现这个问题。

原因是打包后的 `JS` 、 `CSS` 等静态资源都是存放在项目根目录下，一级路由的 `./` 就是根目录，所以访问正常；而二级路由的 `./` 则不是根目录了，是从当前目录载入的 ，这就导致无法正确载入 `JS` 文件，从而导致了白屏。

::: tip
假设项目域名是 `https://example.com` ，一级路由是 `https://example.com/home`,二级路由是 `https://example.com/foo/bar`。

假设打包后的 JS 文件等静态资产存放于 `https://example.com/assets/` 文件夹下，访问一级路由时， `./` 访问到的 `JS` 文件是 `https://example.com/assets/home.js` ，所以一级路由可以正常访问到。

访问二级路由时， `./` 访问到的 `JS` 文件是 `https://example.com/foo/assets/bar.js` ，但实际上文件是存放在 `https://example.com/assets/bar.js` ，访问到的 URL 资源不存在，所以白屏了。
:::

#### 解决方法

如果的项目开启了 `History` 模式，并且配置有二级或者二级以上的路由时，不要使用 `./` 这样的相对路径。

正确的方式应该是修改 `publicPath` （使用 `Vue CLI` ） 或者 `base` （使用 `Vite` ），如果是部署在域名根目录则写 `/` ，如果是子目录，则按照子目录的格式，将其以 `/` 开头，以 `/` 结尾的形式配置（ `e.g. /hello-world/` ）
