import { defineUserConfig } from "vuepress";
import { getDirname, path } from "@vuepress/utils";
import autoprefixer from "autoprefixer";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { bccCustomTheme } from "vuepress-theme-bcc-common-components/config.js";
import glob from "glob";

const __dirname = getDirname(import.meta.url);

const findAllItemChildren = (item, array, fullPath) => {
  if (item.split("/").length >= 2) {
    const firstItemName = item.split("/")[0];

    const foundElement = array.findIndex((item) => item.text === firstItemName);

    //Differentiate if item contains nested children
    if (item.split("/").length > 2) {
      const itemWithoutFolderName = item.split("/").slice(1).join("/");
      console.log(fullPath);
      return findAllItemChildren(
        itemWithoutFolderName,
        array[foundElement].children,
        fullPath
      );
    }

    // Create nested object first layer
    if (
      array &&
      array.findIndex((item) => item.text === firstItemName) === -1
    ) {
      const splittedNames = item.split("/");
      splittedNames.shift();
      const joinedNames = splittedNames.join("/");

      return array.push({
        text: item.split("/")[0],
        children: [findAllItemChildren(joinedNames, array, fullPath)],
      });
    }
    // Push item to its children
    return array[foundElement].children.push({
      text: path.basename(item, ".md"),
      link: `/${fullPath}`,
      activeMatch: `^/${path.basename(item, ".md")}`,
    });
  }
  //It is a children last element
  console.log('%c FullPath', `color: red`, fullPath);
  return {
    text: path.basename(item, ".md"),
    link: `/${fullPath}`,
    activeMatch: `^/${path.basename(item, ".md")}`,
  };
};

const getSideBarItems = () => {
  const filesPaths = glob.sync(`${__dirname}/../**/*.md`);
  //Get path name from the docs folder
  var paths = filesPaths.map((file) => {
    return path.relative(`${__dirname}/..`, file);
  });

  const sideBarItems = [];

  paths.map((item) => {
    if (item.split("/").length >= 2) {
      findAllItemChildren(item, sideBarItems, item);
    } else {
      if (item !== "README.md") {
        sideBarItems.push({
          text: path.basename(item, ".md"),
          link: `/${item}`,
          activeMatch: `^/${path.basename(item, ".md")}`,
        });
      }
    }
  });
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
  }),
  plugins: [
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
