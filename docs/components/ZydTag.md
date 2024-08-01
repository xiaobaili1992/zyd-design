# ZydTag

这是 ZydTag 组件的文档。

## 示例

<ClientOnly>
  <ZydTag />
</ClientOnly>
<details>
  <summary>查看代码</summary>

```vue
<template>
  <div>
    <ZydTag color="#1cb866">我是tag</ZydTag>
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

</details>

## Props

| Prop name | Description | Type   | Values | Default   |
| --------- | ----------- | ------ | ------ | --------- |
| color     |             | string | -      | '#2355D8' |
| customSty |             | string | -      | ''        |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

> functional
