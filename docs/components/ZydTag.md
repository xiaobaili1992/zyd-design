# ZydTag

<ClientOnly>
<CodePreview>
<template slot="preview">
<ZydTag />
</template>
<template slot="code">

```vue
<template>
  <div>
    <ZydTag color="#1cb866">我是tag</ZydTag>
    <ZydTag color="red">红色</ZydTag>
    <ZydTag
      color="#595959"
      customSty="  background: #f5f5f5;border: 1px solid rgba(140, 140, 140, 0.7);"
    >
      自定义离线
    </ZydTag>
  </div>
</template>

<script>
import { ZydTag } from 'zyd-design';

export default {
  components: {
    ZydTag,
  },
};
</script>
```

</template>
</CodePreview>
</ClientOnly>

## Props

| Prop name | Description                                                               | Type   | Values | Default   |
| --------- | ------------------------------------------------------------------------- | ------ | ------ | --------- |
| color     | 颜色，可以十六进制(6 位 16 进制和 3 位 16 进制)、RGB、RGBA 和颜色名称表示 | string | -      | '#2355D8' |
| customSty | 自定义样式                                                                | string | -      | ''        |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

> functional
