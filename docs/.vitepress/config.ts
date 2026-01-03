import { basename } from "node:path";
import { defineConfig } from "vitepress";
import { La51Plugin } from "vitepress-plugin-51la";
import MarkdownPreview from "vite-plugin-markdown-preview";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";

import { head, nav, sidebar, algolia } from "./configs";

const APP_BASE_PATH = basename(process.env.APP_BASE_PATH || "");
console.log("APP_BASE_PATH", APP_BASE_PATH);

export default defineConfig({
  outDir: "../dist",
  // base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : "/",

  lang: "zh-CN",
  title: "千浔物语",
  description: "千浔的成长之路，包含前端常用知识、源码阅读笔记、各种奇淫技巧、日常提效工具等",
  head,

  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: false,

  /* markdown 配置 */
  markdown: {
    config(md) {
      // 代码组图标
      md.use(groupIconMdPlugin);

      // 在 h1 下增加字数以及阅读时间
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options);
        if (tokens[idx].tag === "h1") htmlResult += `<ArticleMetadata />`;
        return htmlResult;
      };
    },
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    logo: "/logo.png",

    nav,
    sidebar,

    /* 右侧大纲配置 */
    outline: {
      level: "deep",
      label: "目录",
    },

    socialLinks: [{ icon: "github", link: "https://github.com/lkwavestian" }],

    footer: {
      message: "如有转载或 CV 的请标注本站原文地址",
      copyright: "Copyright © 2019-present qianxun",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    /* Algolia DocSearch 配置 */
    algolia,

    /* 是否在 markdown 中的外部链接旁显示外部链接图标 */
    externalLinkIcon: true,

    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },

    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",

    /*** 自定义配置 ***/
    visitor: {
      badgeId: "lkwavestian.docs",
    },
  },

  /* 生成站点地图 */
  sitemap: {
    hostname: "https://docs.fe-qianxun.com",
  },

  vite: {
    plugins: [
      MarkdownPreview(),
      La51Plugin({ id: "3LNfUkScYzEz6k4D", ck: "3LNfUkScYzEz6k4D" }),
      groupIconVitePlugin({
        customIcon: {
          /*    mts: "vscode-icons:file-type-typescript",
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
          php: "vscode-icons:file-type-php", */
        },
      }), // 代码组图标
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
});
