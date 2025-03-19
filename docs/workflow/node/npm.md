# npm 常用命令

## 镜像相关

设置淘宝镜像

```sh
npm config set registry https://registry.npmmirror.com
# yarn
yarn config set registry https://registry.npmmirror.com
```

查看镜像源地址

```sh
npm config get registry
# yarn
yarn config get registry
```

- [npm、yarn、pnpm 设置最新国内镜像源 ](https://ksh7.com/posts/npm-registry/index.html)

## 初始化

```sh
# 生成一份package.json配置，会以询问的方式进行一些初始化配置。
# 参数
# --force
# --yes
# 可以通过这两个配置跳过询问环节，直接生成默认的配置。
npm init

```

## 安装依赖包

```sh
# 安装package.json中声明的所有依赖包
npm install

# 安装指定依赖包，但是不会保存在package.json中，一般不会这样用
npm install pkg

# 安装pkg依赖包，并记录在package.json的dependencies中，可以用简写-S
npm install pkg --save

# 安装pkg依赖包，并记录在package.json的devDependencies中，可以用简写-D
npm install pkg --save-dev

# 安装pkg到全局，可以用简写-g
npm install pkg --global

```

::: tip --save 和 --save-dev 的区别
`--save` 安装`pkg`依赖包，并记录在`package.json`的`dependencies`中，主要用来安装一些在开发环境、生产环境中都要使用的包，比如`Vue`这类框架或者`axios`这类库。<br>
`--save-dev` 安装`pkg`依赖包，并记录在`package.json`的`devDependencies`中，主要用来安装一些只在开发环境中使用的包，构建部署到生产环境可能会被抛弃，比如`EsLint`或者`Prettier`。<br>
:::

## 版本控制

安装依赖时，可以使用一些参数进行版本控制

```sh
- 无符号: 仅接受指定的特定版本（例如 1.2.1）。
- latest: 使用可用的最新版本。
- ^: 只会执行不更改最左边非零数字的更新。 如果写入的是 ^0.13.0，则当运行 npm - update 时，可以更新到 0.13.1、0.13.2 等，但不能更新到 0.14.0 或更高版本。 如果写入的是 ^1.13.0，则当运行 npm update 时，可以更新到 1.13.1、1.14.0 等，但不能更新到 2.0.0 或更高版本。
- ~: 如果写入的是 〜0.13.0，则当运行 npm update 时，会更新到补丁版本：即 0.13.1 可以，但 0.14.0 不可以。
- > : 接受高于指定版本的任何版本。
- > =: 接受等于或高于指定版本的任何版本。
- <=: 接受等于或低于指定版本的任何版本。
- <: 接受低于指定版本的任何版本。
- =: 接受确切的版本。
- -: 接受一定范围的版本。例如：2.1.0 - 2.6.2。
- ||: 组合集合。例如 < 2.1 || > 2.6。可以合并其中的一些符号，例如 1.0.0 || >=1.1.0 <1.2.0，即使用 1.0.0 或从 1.1.0 开始但低于 1.2.0 的版本。
```

## 查看已安装的依赖包

```sh
# 查看当前目录下安装的所有安装包及其依赖包
npm list

# 查看当前目录下安装的所有安装包，其中 --depth 参数后面的数字表示的需要列出依赖包的层级
npm list --depth 0

# 查看全局已安装的依赖包
npm list -g --depth 0

# 查看pkg这个安装包的版本
npm list pkg
npm view pkg version

# 查看pkg所有的版本
npm view pkg versions

# 查看pkg的详细信息
npm view pkg

# yarn
yarn global list --depth=0
```

## 查看依赖包的安装路径

```sh
# 当前项目
npm root

# 全局
npm root -g
# yarn
yarn global dir
```

## 升级依赖包

```sh

# 会检查云端的版本信息，对比本地安装包的版本规则，然后更新到对应规则的最新版本。
npm update

# 只升级指定的pkg
npm update pkg

# 升级全局安装的依赖包
npm update -g
```

## 卸载依赖包

```sh

# 卸载pkg，并从package.json、package-lock.json中删除掉
npm uninstall pkg

# 卸载pkg，但是不会从package.json、package-lock.json中删除，仍保留
npm uninstall pkg --no-save

```

## 清除缓存

```sh
npm cache clean -f
# OR
yarn cache clean
```

## 导航到 npm 的相关页面

### 打开文档

```sh
# 在浏览器中打开当前项目的文档
npm docs

# 在浏览器中打开指定 npm 包的文档
npm docs [package-name]
```

### 打开 GitHub repo

```sh
# 在浏览器中打开当前项目的 GitHub repo
npm repo

# 在浏览器中打开指定 npm 包的 GitHub repo
npm repo [package-name]
```

### 打开 GitHub issues

```sh
# 在浏览器中打开当前项目的 GitHub issues
npm bugs

# 在浏览器中打开指定 npm 包的 GitHub issues
npm bugs [package-name]
```

## 脚本命令相关

执行顺序：并行执行 `&`，继发执行 `&&`

例 1：`npm run script1.js & npm run script2.js`

例 2：`npm run script1.js && npm run script2.js`

获取当前正在运行的脚本名称 `process.env.npm_lifecycle_event`
