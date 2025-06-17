---
outline: 2
---

# npm 踩坑记录

> 记录 `npm` `yarn` `pnpm`等包管理器 相关踩坑

## npm 安装 `node-sass` 经常失败

> 虽说 `node-sass` 已经被淘汰，现在都用 [dart-sass](https://github.com/sass/dart-sass)，但你总会遇到一些老古董项目的

### 问题描述

在使用 `npm` 安装依赖时，遇到含有二进制文件的依赖包会经常失败，比如：`node-sass`、`puppeteer` 等

::: details 为什么配置了国内镜像源安装也会失败？

配置的国内镜像源只对 `npm` 包生效，而其中包含的二进制文件使用的是专门的下载地址，需要单独配置

比如 `node-sass` 需要配置 `sass_binary_site`，其[源码](https://github.com/sass/node-sass/blob/ee13eb9c62449d1e535189a063cbdd15583ebf32/lib/extensions.js#L246)如下

```js
function getBinaryUrl() {
  var site =
    getArgument("--sass-binary-site") ||
    process.env.SASS_BINARY_SITE ||
    process.env.npm_config_sass_binary_site ||
    (pkg.nodeSassConfig && pkg.nodeSassConfig.binarySite) ||
    "https://github.com/sass/node-sass/releases/download";

  return [site, "v" + pkg.version, getBinaryName()].join("/");
}
```

其默认地址是 `github`，而因为一些原因导致咱们安装失败所以也正常

:::

#### 解决方法

::: tip 前置知识：`.npmrc`
`.npmrc` 文件是 `npm` 的配置文件

当在使用 `npm` 时它会从命令行、环境变量和 `.npmrc` 文件中获取其配置

其加载优先级：命令行 > 项目 `.npmrc` > 全局 `.npmrc` > 默认

> `yarn` 的配置文件为 `.yarnrc`
>
> `pnpm` 的配置文件为 `.npmrc`

:::

> 临时解决（以 `node-sass` 为例）

```sh
npm install -D node-sass --sass_binary_site=https://npmmirror.com/mirrors/node-sass
# OR
yarn add -D node-sass --sass_binary_site=https://npmmirror.com/mirrors/node-sass
```

> 长期解决

在项目根目录新建 `.npmrc` 文件，然后配置对应的二进制下载地址

```sh
# npm 镜像地址
registry=https://registry.npmmirror.com

# 二进制文件下载地址
sass_binary_site=https://npmmirror.com/mirrors/node-sass
phantomjs_cdnurl=https://npmmirror.com/mirrors/phantomjs
electron_mirror=https://npmmirror.com/mirrors/electron
profiler_binary_host_mirror=https://npmmirror.com/mirrors/node-inspector
chromedriver_cdnurl=https://npmmirror.com/mirrors/chromedriver
```

## pnpm 执行 patch-commit 命令时报错

### 问题描述

使用 `pnpm` 给 `node_modules` 中的 `vitepress` [打补丁](https://docs.fe-qianxun.com/notes/packageManagers/patch)时， `先执行 pnpm patch vitepress@1.0.1`获取到一个临时路径 `C:\Users\ADMINI~1\AppData\Local\Temp\0f0b1bd23eb4868f36af04b464222371`

在这个临时路径修改保存之后，执行`pnpm patch-commit c:\Users\ADMINI~1\AppData\Local\Temp\0f0b1bd23eb4868f36af04b464222371`时报错`ENOENT  ENOENT: no such file or directory, open 'C:\UsersADMINI~1AppDataLocalTemp0f0b1bd23eb4868f36af04b46422237\package.json' `

![alt text](/public/pit/pnpm-patch-commit.png)

### 解决办法

解决方法是：将临时路径中的 `\` 替换为 `\\`

```sh{1-2}

pnpm patch-commit c:\Users\ADMINI~1\AppData\Local\Temp\0f0b1bd23eb4868f36af04b464222371 // [!code --]

pnpm patch-commit c:\\Users\\ADMINI~1\\AppData\\Local\\Temp\\0f0b1bd23eb4868f36af04b464222371 // [!code ++]

```

这是因为在 `windows` 环境下，在命令行中，`\` 是转义字符。路径中的 `\U` 会被解析为 转义序列（如 `\U`可能被误判为 `Unicode` 转义），导致路径被错误解析。而双反斜杠 `\\` 会被转义为 单个实际的反斜杠，从而正确表示路径分隔符。

::: tip `Windows` 路径规范
`Windows` 原生支持两种路径格式：

- 正斜杠 `/`（兼容性更好，推荐使用）：
  `pnpm patch-commit C:/Users/ADMINI~1/...`
- 反斜杠 `\`（需转义处理）。

单反斜杠路径在命令行中易触发转义冲突，而双反斜杠或正斜杠可避免该问题
:::
