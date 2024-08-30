# ZydIconButton

<ClientOnly>
<CodePreview>
<template slot="preview">
<ZydIconButton />
</template>
<template slot="code">

```vue
<template>
  <div class="button-wrap">
    <ZydIconButton>下载</ZydIconButton>
  </div>
</template>

<script>
import { ZydIconButton } from 'zyd-design';

export default {
  components: { ZydIconButton },
};
</script>
```

</template>
</CodePreview>
</ClientOnly>

## Props

| Prop name | Description                                | Type   | Values | Default             |
| --------- | ------------------------------------------ | ------ | ------ | ------------------- |
| iconClass | 图标类名，具体详见`dee-svg-icon`的配置名称 | string | -      | 'dee-download'      |
| bgColor   | 按钮的背景色                               | string | -      | '#fff'              |
| color     | 按钮字体颜色和图标的填充色                 | string | -      | '#2355d8'           |
| border    | 边框样式                                   | string | -      | '1px solid #2355d8' |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

> functional
