# ZydSplitPane

<ClientOnly>
<CodePreview>
<template slot="preview">
<ZydSplitPane />
</template>
<template slot="code">

```vue
<template>
  <div class="pane-wrap">
    <ZydSplitPane color="#1cb866">
      <template slot="left">
        <div class="left">Left Pane</div>
      </template>
      <template slot="right">
        <div class="right">Right Pane</div>
      </template>
    </ZydSplitPane>
    <ZydSplitPane color="#1cb866" direction="v">
      <template slot="left">
        <div class="left">Top Pane</div>
      </template>
      <template slot="right">
        <div class="right">Bottom Pane</div>
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
.pane-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
  ::v-deep .container-v {
    height: 600px;
  }
}
.left {
  background: #ccc;
  width: 100%;
  height: 100%;
}
.right {
  background: #ddd;
  width: 100%;
  height: 100%;
}
</style>
```

</template>
</CodePreview>
</ClientOnly>

## Props

| Prop name | Description      | Type   | Values | Default |
| --------- | ---------------- | ------ | ------ | ------- |
| width     | 默认的宽度或高度 | number | -      | 280     |
| minWidth  | 最小宽度         | string | -      | '250px' |
| maxWidth  | 最大宽度或高度   | string | -      | '500px' |
| direction | 水平或垂直       | string | `h/v`  | 'h'     |

## Slots

| Name  | Description | Bindings |
| ----- | ----------- | -------- |
| left  |             |          |
| right |             |          |

## Events

| Event name   | Properties | Description              |
| ------------ | ---------- | ------------------------ |
| update:width |            | 更新宽度                 |
| change       |            | 拖动变化时候返回宽度状态 |

> functional
