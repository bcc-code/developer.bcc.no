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
- "vuepress-plugin-md-enhance": "^2.0.0-beta.130", (For tabs support)
- "vuepress-theme-bcc-common-components": "^1.0.30",
- "vuepress-theme-hope": "^2.0.0-beta.130"
- "@vuepress/plugin-register-components": "^2.0.0-beta.53", *(It may be redundant)
*(REMEMBER THAT THOSE HAVE TO BE USING VuePress 2.0!)
5. Create config file
6. Get the public folder and change favicon and the logo.
7. Write documentation