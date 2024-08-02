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

| Prop name | Description | Type   | Values | Default   |
| --------- | ----------- | ------ | ------ | --------- |
| color     |             | string | -      | '#2355D8' |
| customSty |             | string | -      | ''        |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

> functional
