# BCC Developer documentation repository

Here files from different docs folders are collected and displayed to developers who will or want to work with BCC-Code products


# ADL (with ADRs)

To create a new ADR (Architecture Decision Log) please create a new issue with given template. This will include all required sections with a "adr" label. 

After the issue is close, a new `*.md` file in `/docs/ADL`folder will be created.

# Building

The site uses vuepress to build the pages. To build them locally, install vuepress:
```npm install -D vuepress@next```

Then add the build commands to package.json

```
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
```

Then you can build the docs locally with this command:

```
npm run docs:dev
```
