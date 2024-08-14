# ZydTypeExchange

<ClientOnly>
<CodePreview>
<template slot="preview">
<ZydTypeExchange />
</template>
<template slot="code">

```vue
<template>
  <div class="box">
    <ZydTypeExchange :activeKey.sync="activeKey" />
  </div>
</template>

<script>
import { ZydTypeExchange } from 'zyd-design';
export default {
  components: { ZydTypeExchange },
  data() {
    return {
      activeKey: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
}
</style>
```

</template>
</CodePreview>
</ClientOnly>

## Props

| Prop name  | Description  | Type   | Values | Default                                                                                                                   |
| ---------- | ------------ | ------ | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| sourceData | 列表切换项   | ""     | -      | [{<br/> key: 1,<br/> label: '日',<br/>}, {<br/> key: 2,<br/> label: '月',<br/>}, {<br/> key: 3,<br/> label: '年',<br/>},] |
| activeKey  | 当前选中的项 | number | -      | 1                                                                                                                         |

## Events

| Event name       | Properties | Description    |
| ---------------- | ---------- | -------------- |
| update:activeKey |            | 更新 activeKey |
| change           |            | 更新事件       |

> functional
