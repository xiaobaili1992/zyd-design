# ZydSplitPane

这是 ZydSplitPane 组件的文档。

## 示例

<ClientOnly>
  <ZydSplitPane />
</ClientOnly>
<details>
  <summary>查看代码</summary>

```vue
<template>
  <div>
    <ZydSplitPane color="#1cb866">
      <template slot="left">
        <div class="left">Left Pane</div>
      </template>
      <template slot="right">
        <div class="right">Right Pane</div>
      </template>
    </ZydSplitPane>
  </div>
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

</details>

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
