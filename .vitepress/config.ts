import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Telegram File Stream Bot",
  description: "Generate direct streaming links for Telegram files",
  appearance: false,
  vite: {
    plugins: [tailwindcss()],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/getting-started/" },
      { text: "Configuration", link: "/configuration/" },
      { text: "Support", link: "/support/" },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/getting-started/" },
          { text: "Prerequisites", link: "/getting-started/prerequisites" },
          { text: "Installation", link: "/getting-started/installation" },
          { text: "Deployment", link: "/getting-started/deployment" },
        ],
      },
      {
        text: "Configuration",
        items: [
          { text: "Environment Variables", link: "/configuration/" },
          { text: "Config Generator", link: "/configuration/generator" },
        ],
      },
      {
        text: "Advanced",
        items: [
          { text: "Multi-Bot Setup", link: "/advanced/multi-bot" },
          { text: "Stream Tuning", link: "/advanced/stream-tuning" },
          { text: "Troubleshooting", link: "/advanced/troubleshooting" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/EverythingSuckz/TG-FileStreamBot",
      },
      { icon: "telegram", link: "https://t.me/AlteredVoid" },
    ],

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/EverythingSuckz/fsb-docs/edit/main/:path",
      text: "Edit this page",
    },

    lastUpdated: {
      text: "Last updated",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    },
  },
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "meta",
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
    // OpenGraph
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "Telegram File Stream Bot" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Generate instant download URLs for any Telegram file. High-performance Go backend with multi-bot load balancing.",
      },
    ],
    [
      "meta",
      { property: "og:image", content: "https://filestream.bot/og.png" },
    ],
    ["meta", { property: "og:url", content: "https://filestream.bot" }],
    // Twitter Card
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: "Telegram File Stream Bot" }],
    [
      "meta",
      {
        name: "twitter:description",
        content: "Generate instant download URLs for any Telegram file.",
      },
    ],
    [
      "meta",
      { name: "twitter:image", content: "https://filestream.bot/og.png" },
    ],
  ],
  cleanUrls: true,
  markdown: {
    math: true,
  }
});
