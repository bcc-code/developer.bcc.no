# developer.bcc.no

The source for [developer.bcc.no](https://developer.bcc.no), the central portal for developers within BCC.

Here files from different docs folders are collected and displayed to developers who will or want to work with BCC-Code products

Pages are built from the `docs` folder with the [common documentation setup](https://developer.bcc.no/bcc-documentation-base/deploying-site/).

## ADL (with ADRs)

To create a new ADR (Architecture Decision Log) please create a new issue with given template. This will include all required sections with a "adr" label.

After the issue is close, a new `*.md` file in `/docs/ADL`folder will be created.

## Building

The site uses vuepress to build the pages. To build them locally, you need vuepress installed, which can be installed globally by:

```(bash)
npm install -g vuepress@next
```

Then you can build a rudimentary version the docs locally with this command
(note that this isn't the real theme and things like automatic sidebar won't work)

```(bash)
vuepress dev docs
```
