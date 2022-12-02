import { defineUserConfig } from "vuepress";
import { getDirname, path } from "@vuepress/utils";
import autoprefixer from "autoprefixer";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { bccCustomTheme } from "vuepress-theme-bcc-common-components/config.js";
import glob from "glob";

const __dirname = getDirname(import.meta.url);

const findAllItemChildren = (item, array, fullPath) => {
  console.log("item", item);
  if (item.split("/").length >= 2) {
    const firstItemName = item.split("/")[0];

    const splittedNames = item.split("/");
    splittedNames.shift();
    const joinedNames = splittedNames.join("/");

    // Create nested object first layer
    if (
      array &&
      array.findIndex((item) => item.text === firstItemName) === -1
    ) {
      array.push({
        text: item.split("/")[0],
        children: [findAllItemChildren(joinedNames, array, item)],
      });
    }
  } else {
    //It is a children last element
    return {
      text: path.basename(item, ".md"),
      link: `/${fullPath}`,
      activeMatch: `^/${path.basename(item, ".md")}`,
    };
  }
};

const getSideBarItems = () => {
  const filesPaths = glob.sync(`${__dirname}/../**/*.md`);
  //Get path name from the docs folder
  var paths = filesPaths.map((file) => {
    return path.relative(`${__dirname}/..`, file);
  });

  const sideBarItems = [];

  paths.map((item, index) => {
    if (item.split("/").length >= 2) {
      const result = findAllItemChildren(item, sideBarItems, item);
    } else {
      sideBarItems.push({
        text: path.basename(item, ".md"),
        link: `/${item}`,
        activeMatch: `^/${path.basename(item, ".md")}`,
      });
    }
  });
  console.log(
    `sideBarItems`,
    sideBarItems.filter((item) => item !== undefined)
  );
  return sideBarItems.filter((item) => item !== undefined);
};

export default defineUserConfig({
  lang: "en-US",
  title: "BCC Developer Documentation",
  description: "Package documentation",
  base: "/bcc-documentation/",
  theme: bccCustomTheme({
    logoDark: "bccLogoWhite.png",
    logo: "bccLogoDark.png",
    sidebarDepth: 2,
    sidebar: getSideBarItems(),
    // sidebar: sidebar.getSidebar(`${__dirname}/..`),
    // ...getConfig(`${__dirname}/..`),
    // sidebar: [
    //   {
    //     text: "Home",
    //     link: "/",
    //     activeMatch: "[/]",
    //   },
    //   {
    //     text: "Index",
    //     link: "/home.md",
    //     activeMatch: "^/home",
    //   },
    //   {
    //     text: "Test",
    //     link: "/test.md",
    //     activeMatch: "^/test",
    //     // children: [
    //     //   { text: 'Test', link: '/components/testFolder/test.md' },
    //     //   { text: 'Test 2', link: '/components/testTwo/testTwo.md' },
    //     //   { text: 'Badge', link: '/components/badge/badge.md' },
    //     // ],
    //   },
    // ],
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
