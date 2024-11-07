import { defineConfig } from 'vitepress'
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "x-anything",
  description: "初试自建组件库",
  base: "/x-anything/",
  appearance: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
    nav: [
      { text: "开始使用", link: "/get-started" },
      { text: "组件", link: "/components/button" },
    ],
    sidebar: [
      {
        text: "指南",
        collapsed: false,
        items: [{ text: "快速开始", link: "/get-started" }],
      },
      {
        text: "基础组件",
        collapsed: false,
        items: [
          { text: "Button 按钮", link: "components/button" },
          { text: "Collapse 折叠面板", link: "components/collapse" },
        ],
      },
      {
        text: "反馈组件",
        collapsed: false,
        items: [
          { text: "Alert 提示", link: "components/alert" },
          { text: "Loading 加载", link: "components/loading" },
          { text: "Tooltip 文字提示", link: "components/tooltip" },
          { text: "ErrorContainer 错误容器", link: "components/errorContainer" },
        ],
      },
      {
        text: "大屏组件",
        collapsed: false,
        items: [
          { text: "FullScreenContainer 全屏容器", link: "components/fullScreenContainer" },
        ],
      },
      {
        text: "hooks",
        collapsed: false,
        items: [
          { text: "useEventListener 事件监听", link: "hooks/useEventListener" },
          { text: "useClickOutside 外部点击", link: "hooks/useClickOutside" },
          { text: "useBetterReq 更好的请求", link: "hooks/useBetterReq" },
          { text: "useAggrid ag-grid 工具", link: "hooks/useAggrid" },
        ],
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/qq1031824970/x-ui" },
    ]
  },
  markdown: {
    config: (md) => {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
})
