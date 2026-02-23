// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import HomePage from "./components/HomePage.vue";
import GitHubSnippet from "./components/GitHubSnippet.vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "home-features-after": () => h(HomePage),
    });
  },
  enhanceApp({ app: _app, router: _router, siteData: _siteData }) {
    _app.component("GitHubSnippet", GitHubSnippet);
  },
} satisfies Theme;
