const fs = require('node:fs');
const path = require('node:path');
const { name } = require('./package.json');

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

这是 ${componentName} 组件的文档。

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

  return commonTemplate(
    componentInfo,
    componentName,
    `
## 示例

<ClientOnly>
  <${componentName} />
</ClientOnly>
<details>
  <summary>查看代码</summary>

\`\`\`vue
${exampleCode}
\`\`\`

</details>
`,
  );
};
