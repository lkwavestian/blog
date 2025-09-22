import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/fe/": [
    {
      text: "HTML / CSS",
      link: "/fe/html/",
      collapsed: false,
      items: [
        { text: "HTML 理论知识点", link: "/fe/html/" },
        { text: "CSS 理论知识点", link: "/fe/css/" },
      ],
    },
    {
      text: "JavaScript 基础知识",
      link: "/fe/javascript/types",
      collapsed: false,
      items: [
        { text: "数据类型", link: "/fe/javascript/types" },
        { text: "引用类型的拷贝", link: "/fe/javascript/clone" },
        { text: "类型转换", link: "/fe/javascript/conversions" },
        { text: "原型和原型链", link: "/fe/javascript/prototype" },
        { text: "继承", link: "/fe/javascript/inherit" },
      ],
    },
    {
      text: "ES6 常用知识点",
      link: "/fe/es6/",
    },
    {
      text: "TypeScript",
      link: "/fe/typescript/base",
      collapsed: false,
      items: [
        { text: "基础知识", link: "/fe/typescript/base" },
        { text: "进阶知识", link: "/fe/typescript/advanced" },
        { text: "扩展阅读", link: "/fe/typescript/expand" },
        { text: "工具类型", link: "/fe/typescript/utility-types" },
        { text: "编译配置", link: "/fe/typescript/tsconfig" },
        { text: "类型体操", link: "/fe/typescript/challenges" },
      ],
    },

    {
      text: "Uniapp 相关知识",
      link: "/fe/uniapp/",
    },

    {
      text: "浏览器与网络",
      link: "/fe/browser/",
      collapsed: false,
      items: [
        { text: "浏览器相关知识点", link: "/fe/browser/" },
        { text: "TCP", link: "/fe/network/tcp" },
        { text: "HTTP", link: "/fe/network/http" },
      ],
    },
    {
      text: "概念知识点",
      collapsed: false,
      link: "/fe/concept/module",
      items: [
        { text: "模块化", link: "/fe/concept/module" },
        { text: "前端页面渲染方式", link: "/fe/concept/page-rendering" },
      ],
    },
    {
      text: "编程题",
      link: "/fe/coding/",
    },
  ],
  "/analysis/": [
    {
      text: "框架",
      items: [{ text: "vue2", link: "/analysis/framework/vue2" }],
    },
    {
      text: "工具库",
      // collapsed: false,
      items: [
        { text: "only-allow", link: "/analysis/utils/only-allow" },
        { text: "clsx", link: "/analysis/utils/clsx" },
      ],
    },
  ],
  "/workflow/": [
    {
      text: "常用工具/方法",
      link: "/workflow/specification/code-specification",
      collapsed: false,
      items: [
        { text: "规范相关", link: "/workflow/specification/code-specification" },
        { text: "工具库整理", link: "/workflow/utils/library" },
        { text: "常用正则整理", link: "/workflow/utils/regexp" },
        { text: "常用方法整理", link: "/workflow/utils/function" },
      ],
    },
    {
      text: "CSS 相关",
      link: "/workflow/css/spec",
      collapsed: false,
      items: [
        { text: "CSS 语法", link: "/workflow/css/spec" },
        { text: "CSS 奇淫技巧", link: "/workflow/css/tricks" },
        { text: "Sass 常用技巧", link: "/workflow/sass/" },
      ],
    },
    {
      text: "Vue 相关",
      link: "/workflow/vue/",
    },
    {
      text: "Node 相关",
      link: "/workflow/node/npm",
      collapsed: false,
      items: [{ text: "npm 常用命令", link: "/workflow/node/npm" }],
    },
    {
      text: "终端相关",
      link: "/workflow/terminal/zsh",
      collapsed: false,
      items: [
        { text: "Zsh 配置", link: "/workflow/terminal/zsh" },
        { text: "命令行工具", link: "/workflow/terminal/toolkit" },
        { text: "Shell 命令", link: "/workflow/terminal/shell" },
      ],
    },
    {
      text: "Git 相关",
      link: "/workflow/git/",
      collapsed: false,
      items: [
        { text: "Git 相关技巧", link: "/workflow/git/" },
        { text: "Git 命令清单", link: "/workflow/git/command" },
      ],
    },
  ],
  "/efficiency/": [
    {
      text: "软件推荐与配置",
      // collapsed: false,
      items: [
        { text: "多平台软件", link: "/efficiency/software/cross-platform" },
        { text: "Mac 平台", link: "/efficiency/software/mac" },
        { text: "Windows 平台", link: "/efficiency/software/windows" },
        { text: "浏览器设置与扩展", link: "/efficiency/software/browser" },
        { text: "Visual Studio Code 配置", link: "/efficiency/software/vscode" },
        { text: "WebStorm 配置", link: "/efficiency/software/webstorm" },
        { text: "VitePress 配置", link: "/efficiency/software/vitepress" },
        { text: "Cursor 相关", link: "/efficiency/software/cursor" },
      ],
    },
    { text: "在线工具", link: "/efficiency/online-tools" },
    { text: "书签脚本", link: "/efficiency/bookmark-scripts" },
  ],
  "/pit/": [
    {
      text: "踩坑记录",
      // collapsed: false,
      items: [
        { text: "包管理器 踩坑记录", link: "/pit/packageManager" },
        { text: "PC 踩坑记录", link: "/pit/pc" },
        { text: "H5 踩坑记录", link: "/pit/h5" },
        { text: "Javascript 踩坑记录", link: "/pit/javascript" },
        { text: "Uniapp 踩坑记录", link: "/pit/uniapp" },
        { text: "运维 踩坑记录", link: "/pit/operation" },
      ],
    },
  ],
  "/notes/": [
    {
      text: "Css 日常笔记",
      items: [
        { text: "Flex相关概念与理解", link: "/notes/css/flex" },
        { text: "line-height属性详解", link: "/notes/css/line-height" },
      ],
    },
    {
      text: "Vue 日常笔记",
      items: [
        { text: "Composition API的深入理解和实践", link: "/notes/vue/compositionAPI" },
        { text: "Vue 3 中的 ref 和 reactive：区别与应用场景", link: "/notes/vue/refAndReactive" },
      ],
    },
    {
      text: "Uniapp 日常笔记",
      items: [
        { text: "生命周期相关", link: "/notes/uniapp/lifecycle" },
        { text: "返回上页并刷新", link: "/notes/uniapp/returnAndRefresh" },
        { text: "企业微信加水印的探索与踩坑", link: "/notes/uniapp/waterMarks" },
      ],
    },
    {
      text: "包管理器相关",
      items: [{ text: "修改node_modules中的依赖（打补丁）", link: "/notes/packageManagers/patch" }],
    },
  ],
  "/translate/": [
    {
      text: "翻译文章合集",
      // collapsed: false,
      items: [
        {
          text: "Debouncing and Throttling Explained Through Examples",
          link: "/translate/debounceAndThrotting",
        },
      ],
    },
  ],
};
