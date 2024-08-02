const fs = require('node:fs');
const path = require('node:path');
const { name } = require('./package.json');

const notNeedPreviewComponent = ['ZydLargeScreenScale'];

const getPath = (curPath) => {
  return path.resolve(__dirname, curPath);
};

const getFileContent = (filePath, componentName) => {
  let exampleCode = '';
  try {
    exampleCode = fs.readFileSync(filePath, 'utf8');
    exampleCode = exampleCode?.replace(/\.\.\/index(\.js)?/g, name);
  } catch (err) {
    console.error('读取文件时出错:', err);
    exampleCode = `
      <template>
        <${componentName} />
      </template>

      <script>
      export default {
        components: {
          ${componentName}
        }
      }
      </script>
    `;
  }
  return exampleCode;
};

const getFileName = (dirPath) => {
  let componentNames = [];
  try {
    const files = fs.readdirSync(dirPath);
    const vueFiles = files.filter((file) => path.extname(file) === '.vue');
    componentNames = vueFiles.map((file) => path.basename(file, '.vue'));
  } catch (err) {
    console.error('获取文件名出错:', err);
  }
  return componentNames;
};

const commonTemplate = (componentInfo, componentName, previewCase) => {
  const { props, slots, methods, events, expose, functionalTag } = componentInfo;

  return `
# ${componentName}

${previewCase}

${props}

${slots}

${methods}

${events}

${expose}

${functionalTag}
  `;
};

module.exports = (componentInfo, componentName) => {
  const dirPath = getPath('./src/previews/');
  const fileNames = getFileName(dirPath);
  if (!fileNames?.includes(componentName)) {
    return commonTemplate(componentInfo, componentName, '');
  }

  const filePath = getPath(`./src/previews/${componentName}.vue`);
  const exampleCode = getFileContent(filePath, componentName);
  const component = notNeedPreviewComponent.includes(componentName)
    ? '该组件为全屏模式，暂不支持展示'
    : `<${componentName} />`;

  return commonTemplate(
    componentInfo,
    componentName,
    `
<ClientOnly>
<CodePreview>
<template slot="preview">
${component}
</template>
<template slot="code">

\`\`\`vue
${exampleCode}
\`\`\`

</template>
</CodePreview>
</ClientOnly>
`,
  );
};
