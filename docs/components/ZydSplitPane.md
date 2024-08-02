# ZydSplitPane

<ClientOnly>
<CodePreview>
<template slot="preview">
<ZydSplitPane />
</template>
<template slot="code">

```vue
<template>
  <ZydSplitPane color="#1cb866">
    <template slot="left">
      <div class="left">Left Pane</div>
    </template>
    <template slot="right">
      <div class="right">Right Pane</div>
    </template>
  </ZydSplitPane>
</template>

<script>
import { ZydSplitPane } from 'zyd-design';

export default {
  components: {
    ZydSplitPane,
  },
};
</script>

<style lang="scss" scoped>
.left {
  background: #ccc;
}
.right {
  background: #ddd;
}
</style>
```

</template>
</CodePreview>
</ClientOnly>

## Props

| Prop name | Description | Type   | Values | Default |
| --------- | ----------- | ------ | ------ | ------- |
| width     |             | number | -      | 280     |
| direction |             | string | -      | 'h'     |

## Slots

| Name  | Description | Bindings |
| ----- | ----------- | -------- |
| left  |             |          |
| right |             |          |

## Events

| Event name   | Properties | Description |
| ------------ | ---------- | ----------- |
| update:width |            |
| change       |            |

> functional
