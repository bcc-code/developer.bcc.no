---
title: BCC Developer Portal Setup
description: Technical documentation for package usage
---

# Welcome BCC developers!

Setup the package for local development:

1. yarn init
2. yarn add -D vuepress@next
3. Add scripts to inited package json
4. add/install packages:

- "stylus": "^0.59.0",
- "vuepress-plugin-md-enhance": "^2.0.0-beta.130", (For tabs support)\*
- "vuepress-theme-bcc-common-components": "^1.0.30",
- "vuepress-theme-hope": "^2.0.0-beta.130"\*
- "tailwindcss": "^3.2.4",

::: tip
*Take care of the package version. It automatically installs the VuePress 1 stable version.

Packages versions may vary, so feel free to install the newest version.
:::

5. Create config file. Localization: .vuepress/config.js

Basic config setup:
```js
defineUserConfig({
  lang: "en-US", 
  title: "BCC Developer Documentation", 
  description: "Package documentation", 
  base: "/bcc-code.github.io/", //Base of the repository name.
  //It is important to have the same as the repo name.
  //Otherwise it may be problematic to deploy it.

  //BCC custom theme
  theme: bccCustomTheme({ 
    logoDark: "bccLogoWhite.png",
    logo: "bccLogoDark.png",
    sidebar: getSideBarItems(__dirname), 
    //Important
    //Get the method from the theme package

    icons: findPathIcons(__dirname), 
    //Important
    //Get the method from the theme package
    //Above methods allows to get the local md/svg files paths.

    
    navbar: [
      {
        text: "Setup",
        link: "/Setup.md",
      },
    ],
    //Custom navbar navigation. Customizable.
    repo: "Kurczak1233/bcc-code.github.io",
    // if your docs are in a different repo from your main project:
    docsRepo: "Kurczak1233/bcc-code.github.io",
    // if your docs are not at the root of the repo:
    docsDir: "docs",
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: "master",
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: "Edit this page on github",
    prev: true, //Show prev page in footer
    next: true, //Show next page in footer
  }),
  plugins: [
    mdEnhancePlugin({
      // adds code tabs support
      codetabs: true,
    }),
  ],
});
```
6. Get the public folder and change favicon and the logo.
7. Setup the custom sidebar links icons. Localization: .vuepress/public/routesIcons/*
Pay attention to the naming, otherwise, the routes will not be detected. To overwrite the route icons, just name it as a route name.
The icons are applyable only to the first layer of sidebar routes.
8. Write documentation

