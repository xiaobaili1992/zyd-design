const generateTemplate = require('./generateTemplate');

module.exports = {
  componentsRoot: 'src/components', // 组件根目录
  components: '**/[A-Z]*.vue', // 匹配组件的模式
  outDir: 'docs/components', // 输出目录
  getDocFileName: (componentPath) => {
    const componentName = componentPath.split('/').pop().replace('.vue', '');
    return componentName;
  },
  templates: {
    component: (componentInfo, config) => generateTemplate(componentInfo, config.displayName),
  },
  // templates: {
  //   component: './templates/component.md'
  // }
};
