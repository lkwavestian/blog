import { h, watch, onMounted, nextTick } from "vue";
import { useData, useRoute, EnhanceAppContext, inBrowser } from "vitepress";
import DefaultTheme from "vitepress/theme";

// import { createMediumZoomProvider } from "./composables/useMediumZoom";

import MLayout from "./components/MLayout.vue";
import MNavVisitor from "./components/MNavVisitor.vue";
import MDocFooter from "./components/MDocFooter.vue";
import MAsideSponsors from "./components/MAsideSponsors.vue";
import MNavLinks from "./components/MNavLinks.vue";
import HomeUnderline from "./components/HomeUnderline.vue";
import confetti from "./components/confetti.vue";
import MouseClick from "./components/MouseClick.vue";
import MouseFollower from "./components/MouseFollower.vue";
import ArticleMetadata from "./components/ArticleMetadata.vue";

// giscusTalk 评论
import giscusTalk from "vitepress-plugin-comment-with-giscus";

// 切换路由进度条
import { NProgress } from "nprogress-v2/dist/index.js"; // 进度条组件
import "nprogress-v2/dist/index.css"; // 进度条样式

// medium-zoom 图片缩放
import mediumZoom from "medium-zoom";

import "./styles/index.scss";

import "virtual:group-icons.css";

if (typeof window !== "undefined") {
  /* 注销 PWA 服务 */
  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }

  /* 删除浏览器中的缓存 */
  if ("caches" in window) {
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          return caches.delete(key);
        })
      );
    });
  }
}

let homePageStyle: HTMLStyleElement | undefined;

export default {
  extends: DefaultTheme,
  Layout: () => {
    const props: Record<string, any> = {};
    // 获取 frontmatter
    const { frontmatter } = useData();

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass;
    }

    return h(MLayout, props, {
      /**
       * 相关插槽
       * https://vitepress.dev/guide/extending-default-theme#layout-slots
       * https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/Layout.vue
       */
      "nav-bar-title-after": () => h(MNavVisitor),
      "doc-after": () => h(MDocFooter),
      "aside-bottom": () => h(MAsideSponsors),
    });
  },
  enhanceApp({ app, router }: EnhanceAppContext) {
    // createMediumZoomProvider(app, router);
    app.component("MNavLinks", MNavLinks); // 导航链接组件
    app.component("HomeUnderline", HomeUnderline); // 首页下划线组件
    app.component("confetti", confetti); // 五彩纸屑效果
    app.component("MouseClick", MouseClick); // 鼠标点击效果
    app.component("MouseFollower", MouseFollower); // 鼠标跟随效果
    app.component("ArticleMetadata", ArticleMetadata); // 字数以及阅读时间

    app.provide("DEV", process.env.NODE_ENV === "development");

    // 切换路由进度条
    if (inBrowser) {
      NProgress.configure({ showSpinner: false });

      router.onBeforeRouteChange = () => {
        NProgress.start(); // 开始进度条
      };
      router.onAfterRouteChange = () => {
        NProgress.done(); // 停止进度条
      };
    }

    // 如果路由变化，执行 updateHomePageStyle 函数
    if (typeof window !== "undefined") {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === "/"),
        { immediate: true }
      );
    }
  },

  setup() {
    // Get frontmatter and route
    const { frontmatter } = useData();
    const route = useRoute();

    // giscus配置
    giscusTalk(
      {
        repo: "lkwavestian/blog", //仓库
        repoId: "R_kgDOLyJOgA", //仓库ID
        category: "General", // 讨论分类
        categoryId: "DIC_kwDOLyJOgM4CrOyY", //讨论分类ID
        mapping: "pathname",
        inputPosition: "bottom",
        lang: "zh-CN",
      },
      {
        frontmatter,
        route,
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );

    // 缩放图片设置
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };

    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
};

if (typeof window !== "undefined") {
  // detect browser, add to class for conditional styling
  const browser = navigator.userAgent.toLowerCase();
  if (browser.includes("chrome")) {
    document.documentElement.classList.add("browser-chrome");
  } else if (browser.includes("firefox")) {
    document.documentElement.classList.add("browser-firefox");
  } else if (browser.includes("safari")) {
    document.documentElement.classList.add("browser-safari");
  }
}

// 彩虹背景动画样式
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return;

    homePageStyle = document.createElement("style");
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`;
    document.body.appendChild(homePageStyle);
  } else {
    if (!homePageStyle) return;

    homePageStyle.remove();
    homePageStyle = undefined;
  }
}
