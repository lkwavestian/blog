---
description: 千浔的编程规范（命名规范与项目结构、Git 提交规范、Prettier 配置等）
---

# 编程规范

> 记录自己所总结和遵守的编程规范（即个人风格指南）

## 命名规范与项目结构

### 命名规范

命名规范是编程规范中最重要的一部分，它直接影响到代码的可读性和可维护性

::: tip 常用的命名形式

- `camelCase` 小驼峰式命名法（首字母小写）
- `PascalCase` 大驼峰式命名法（首字母大写）
- `snake_case` 下划线命名法
- `kebab-case` 短横线命名法
- `UPPER_CASE` 大写命名法

:::

### 文件命名规范

::: info
除组件命名外，均使用短横线命名法
:::

- 项目名称使用短横线命名法。🌰 `qianxun-notes`
- `html / css / md / js / ts / jsx / tsx` 文件使用短横线命名法
- `React / Vue` 组件文件使用大写驼峰式命名法。🌰 `Dialog.vue` / `Dialog.tsx`
- 静态资源文件使用短横线命名法。🌰 `logo-white.png`

### 代码命名规范

#### `JavaScript` 命名规范

- 常量使用大写命名法。🌰 `const MAX_COUNT = 1996`
  - 正则常量命名使用后缀 `_RE`。🌰 `const PHONE_RE = /^1[3-9]\d{9}$/`
- 变量使用小驼峰式命名法。🌰 `const maxCount = 1996`
- `class` 类名使用大驼峰式命名法。🌰 `class User {}`
- 构造函数使用大驼峰式命名法。🌰 `function User() {}`
- 函数使用小驼峰式命名法。🌰 `function getUserInfo() {}`
- 对象 `key` 使用小驼峰式命名法。🌰 `const user = { userName: 'qianxun' }`
- 路由 `path` 使用短横线命名法。🌰 `path: '/user-info'`

#### `CSS` 命名规范

- 类名使用短横线命名法。🌰 `.user-info`
- `ID` 使用小驼峰式命名法。🌰 `#userInfo`
- 自定义变量使用短横线命名法。🌰 `--main-color: #fff`

### 项目结构

> 约定优于配置

```sh
.
├── .vscode                           # VSCode 配置文件
├── public                            # 网站资源文件（favicon.ico index.html 等）
├── scripts                           # 脚本相关
├── src
│   ├── apis                          # api 接口
│   ├── assets                        # 静态资源
│   ├── components                    # 全局组件
│   ├── config                        # 项目配置文件
│   ├── constants                     # 常量
│   ├── hooks                         # 通用 hooks
│   ├── layout                        # 页面整体布局
│   ├── lib                           # 第三方或无业务依赖代码
│   ├── locales                       # i18n
│   ├── pages                         # 页面相关文件
│   │   ├── Home                      # 大驼峰规范 => 组件即是一个构造函数
│   │   │   ├── components            # 页面相关的子组件
│   │   │   ├── index.module.scss     # 根据应用的 CSS Scope 方案命名
│   │   │   └── index.tsx             # index 作为默认路径，视为根节点
│   │   └── App.tsx                   # 页面入口
│   ├── router                        # 页面路由
│   ├── store                         # 状态管理
│   ├── styles                        # 全局/基础样式
│   ├── types                         # TypeScript 类型声明
│   ├── utils                         # 工具函数
│   └── main.tsx                      # 应用启动入口
├── README.md                         # 当前项目的文档
├── package.json                      # 项目信息
└── tsconfig.json                     # TypeScript 配置文件
```

## `Git` 提交规范

> `git commit message` 的格式

```sh
<type>(<scope>): <subject>

<body>

<footer>
```

- `type`（必填）：`commit` 的类型
- `scope`（选填）：`commit` 的影响范围
- `subject`（必填）：`commit` 信息的简短描述（50 字以内）
- `body`（选填）：`commit` 信息的具体描述
- `footer`（选填）：重大变化（`Breaking Change`）和需要关闭的`Issue`

**正则校验规则**：

```js
/**
 * 基于 vue 项目中的 verify-commit-msg.js 修改
 * https://github.com/vuejs/vue/blob/main/scripts/verify-commit-msg.js
 */
const commitRE =
  /^((revert|wip|draft): )?(feat|fix|docs|style|refactor|perf|types|test|build|ci|chore)(\(.+\))?: .{1,50}/
```

#### `commit` 常用的 `type`

|       type       | 含义                                   |
| :--------------: | :------------------------------------- |
|      _feat_      | 新功能                                 |
|      _fix_       | 修复 bug                               |
|      _docs_      | 文档类改动                             |
|     _style_      | 代码格式改动，同理适用于业务样式调整   |
|    _refactor_    | 重构（即不是新增功能，也不是修复 bug） |
|      _perf_      | 性能优化相关                           |
|     _types_      | `TypeScript` 类型相关的改动            |
|      _test_      | 单元测试、e2e 测试                     |
|     _build_      | 构建工具或者依赖项的改动               |
|       _ci_       | 修改项目持续集成流程                   |
|     _chore_      | 其他类型的提交                         |
|     _revert_     | 恢复或还原相关提交                     |
| _wip_ \| _draft_ | 托管平台对应的草稿标识                 |

- [Conventional Commits | GitHub](https://github.com/conventional-commits/conventionalcommits.org)
- [Angular convention | Github](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)

## `Prettier`

> 使用 [Prettier](https://prettier.io) 对代码进行格式化，从而实现一致的编码风格

```js
/**
 * Prettier 配置项
 * https://prettier.io/docs/en/options.html
 */
module.exports = {
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用双引号
  singleQuote: false,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // es5有效的地方保留逗号
  trailingComma: 'es5',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf',
}
```

::: tip

为了方便使用，已发布到 [npm](https://www.npmjs.com/package/@fe-qianxun/prettier)

```sh
# 安装
pnpm add -D @fe-qianxun/prettier

# 引入配置
npm pkg set prettier='@fe-qianxun/prettier'
# OR
echo "module.exports = require('@fe-qianxun/prettier')" > .prettierrc.cjs
```

:::

- [VSCode 配置 Prettier 插件](/efficiency/software/vscode#推荐配置)
- [@fe-qianxun/prettier | GitHub](https://github.com/lkwavestian/fe-qianxun/tree/main/packages/prettier)
- [Options | Prettier](https://prettier.io/docs/en/options.html)
