module.exports = {
  content: [
    './docs/**/*.{js,ts,vue,md}',
    './node_modules/vuepress-theme-bcc-common-components/**/*.{js,ts,vue,md}',
  ],
  plugins: [require('flowbite/plugin')],
  theme: {},
}
