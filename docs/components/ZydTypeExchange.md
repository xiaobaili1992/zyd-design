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
    <ZydTypeExchange :sourceData="sourceData" :activeKey.sync="activeKey" />
    <ZydTypeExchange :sourceData="sourceData1" :activeKey.sync="activeKey" />
  </div>
</template>

<script>
import { ZydTypeExchange } from 'zyd-design';
export default {
  components: { ZydTypeExchange },
  data() {
    return {
      activeKey: 1,
      sourceData: [
        {
          key: 1,
          label: '日',
        },
        {
          key: 2,
          label: '月',
        },
        {
          key: 3,
          label: '年',
        },
      ],
      sourceData1: [
        {
          key: 1,
          label: '今日',
        },
        {
          key: 2,
          label: '本月',
        },
        {
          key: 3,
          label: '2024年',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}
</style>
```

</template>
</CodePreview>
</ClientOnly>

## Props

| Prop name  | Description  | Type   | Values | Default                                                                                                                                           |
| ---------- | ------------ | ------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| sourceData | 列表切换项   | ''     | -      | [<br/> {<br/> key: 1,<br/> label: '日',<br/> },<br/> {<br/> key: 2,<br/> label: '月',<br/> },<br/> {<br/> key: 3,<br/> label: '年',<br/> },<br/>] |
| activeKey  | 当前选中的项 | number | -      | 1                                                                                                                                                 |

## Events

| Event name       | Properties | Description    |
| ---------------- | ---------- | -------------- |
| update:activeKey |            | 更新 activeKey |
| change           |            | 更新事件       |

> functional
