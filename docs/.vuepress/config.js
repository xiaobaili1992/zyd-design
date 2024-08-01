const path = require('node:path'); 

module.exports = {
  title: '中曜达组件库文档',
  description: '这是一个使用 VuePress 和 vue-docgen-cli 生成的组件库文档',
  themeConfig: {
    sidebarDepth: 1,
    sidebar: [
      {
        title: '组件',
        collapsable: false,
        children: [
          // '/components/ZydLargeScreenScale',
          // '/components/ZydLongTextTooltip',
          // '/components/ZydOperateBtn',
          // '/components/ZydPage',
          '/components/ZydSplitPane',
          '/components/ZydTag',
          // '/components/ZydTree',
          // '/components/ZydTypeExchange',
        ]
      },
    ]
  },
  plugins: [
    [
      '@vuepress/plugin-register-components',
      {
        componentsDir: path.resolve(__dirname, '../../src/previews'),
      },
    ],
  ],
}