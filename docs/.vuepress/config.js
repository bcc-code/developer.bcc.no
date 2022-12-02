import { defineUserConfig, defaultTheme } from "vuepress";
import { getDirname, path } from "@vuepress/utils";
// import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
// import tailwindcss from 'tailwindcss'
import autoprefixer from "autoprefixer";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { bccCustomTheme } from "vuepress-theme-bcc-common-components/config.js";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  lang: "en-US",
  title: "BCC Developer Documentation",
  description: "Package documentation",
  base: "/bcc-documentation/",
  theme: bccCustomTheme({
    logoDark: "bccLogoWhite.png",
    logo: "bccLogoDark.png",
    sidebar: [
      {
        text: "Home",
        link: "/",
        activeMatch: "[/]",
      },
      {
        text: "Index",
        link: "/home.md",
        activeMatch: "^/home",
      },
      {
        text: "Test",
        link: "/test.md",
        activeMatch: "^/test",
      },
    ],
  }),
  plugins: [
    // registerComponentsPlugin({
    //   componentsDir: path.resolve(__dirname, '../components'),
    // }),
    mdEnhancePlugin({
      // adds code tabs support
      codetabs: true,
    }),
  ],
  bundlerConfig: {
    viteOptions: {
      css: {
        postcss: {
          plugins: [autoprefixer],
        },
      },
    },
  },
});
