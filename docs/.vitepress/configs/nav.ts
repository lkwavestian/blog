import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
  { text: "导航", link: "/nav", activeMatch: "^/nav" },
  {
    text: "前端物语",
    items: [
      { text: "JavaScript 基础知识", link: "/fe/javascript/types" },
      { text: "ES6 常用知识", link: "/fe/es6/" },
      { text: "TypeScript 基础知识", link: "/fe/typescript/base" },
      { text: "Vue 相关知识", link: "/fe/vue/base" },
      { text: "React 相关知识", link: "/fe/react/base" },
      {
        text: "Uniapp 相关知识",
        link: "/fe/uniapp/",
      },
      { text: "浏览器相关知识", link: "/fe/browser/" },
    ],
    activeMatch: "^/fe",
  },
  {
    text: "源码阅读",
    items: [
      { text: "框架", items: [{ text: "vue2", link: "/analysis/framework/vue2" }] },
      {
        text: "工具库",
        items: [
          { text: "only-allow", link: "/analysis/utils/only-allow" },
          { text: "clsx", link: "/analysis/utils/clsx" },
        ],
      },
    ],
  },

  {
    text: "Workflow",
    items: [
      {
        text: "常用工具/方法",
        items: [
          { text: "规范相关", link: "/workflow/specification/code-specification" },
          { text: "工具库整理", link: "/workflow/utils/library" },
          { text: "常用正则整理", link: "/workflow/utils/regexp" },
          { text: "常用方法整理", link: "/workflow/utils/function" },
        ],
      },
      {
        text: "CSS 相关",
        items: [
          { text: "CSS 语法", link: "/workflow/css/spec" },
          { text: "CSS 奇淫技巧", link: "/workflow/css/tricks" },
          { text: "Sass 常用技巧", link: "/workflow/sass/" },
        ],
      },
      {
        text: "Vue 小技巧",
        link: "/workflow/vue/",
      },
      { text: "npm 常用命令", link: "/workflow/node/npm" },
      // {
      //   text: '终端相关',
      //   items: [
      { text: "Zsh 配置", link: "/workflow/terminal/zsh" },
      { text: "命令行工具", link: "/workflow/terminal/toolkit" },
      { text: "Shell 命令", link: "/workflow/terminal/shell" },
      //   ]
      // },
      { text: "Git 相关技巧", link: "/workflow/git/" },
      { text: "Git 命令清单", link: "/workflow/git/command" },
    ],
    activeMatch: "^/workflow",
  },
  {
    text: "笔记",
    items: [
      {
        text: "日常笔记",
        items: [
          { text: "CSS ", link: "/notes/css/flex" },
          { text: "Vue ", link: "/notes/vue/compositionAPI" },
          { text: "Uniapp ", link: "/notes/uniapp/lifecycle" },
          { text: "包管理器 ", link: "/notes/packageManagers/patch" },
        ],
      },
      { text: "踩坑记录", link: "/pit/packageManager", activeMatch: "^/pit" },
      { text: "翻译文章", link: "/translate/debounceAndThrotting", activeMatch: "^/translate" },
    ],
  },
  {
    text: "提效工具",
    items: [
      {
        text: "软件推荐与配置",
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
    activeMatch: "^/efficiency",
  },
  {
    text: "千浔",
    items: [
      { text: "个人主页", link: "https://fe-qianxun.com" },
      {
        text: "我的博客",
        link: "https://github.com/lkwavestian/blog",
      },
    ],
  },
];
