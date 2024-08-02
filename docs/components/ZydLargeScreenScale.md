# ZydLargeScreenScale

<ClientOnly>
<CodePreview>
<template slot="preview">
该组件为全屏模式，暂不支持展示
</template>
<template slot="code">

```vue
<template>
  <ZydLargeScreenScale width="1980" height="1080">
    <div class="content">我是内容</div>
  </ZydLargeScreenScale>
</template>

<script>
import { ZydLargeScreenScale } from 'zyd-design';

export default {
  components: {
    ZydLargeScreenScale,
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  background: #ccc;
  z-index: 0;
}
</style>
```

</template>
</CodePreview>
</ClientOnly>

## Props

| Prop name | Description                      | Type   | Values | Default |
| --------- | -------------------------------- | ------ | ------ | ------- |
| width     | 按照设计稿，设计稿多宽就设置多宽 | number | -      | 1920    |
| height    | 按照设计稿，设计稿多高就设置多高 | number | -      | 1080    |

## Slots

| Name    | Description                        | Bindings |
| ------- | ---------------------------------- | -------- |
| default | 需要包裹的主体，也就是设计稿的内容 |          |

> functional
