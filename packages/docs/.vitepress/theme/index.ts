import type { App } from "vue";
import { ElementPlusContainer } from "vitepress-preview-component";
import DefaultTheme from "vitepress/theme";
import XAnything from "x-anything";

import "vitepress-preview-component/style.css";
import "x-anything/dist/index.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component("demo-preview", ElementPlusContainer);
    app.use(XAnything);
  },
};