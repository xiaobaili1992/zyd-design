# ZydOperateBtn

<ClientOnly>
<CodePreview>
<template slot="preview">
<ZydOperateBtn />
</template>
<template slot="code">

```vue
<template>
  <ZydOperateBtn :operateBtnConfig="operateBtnConfig" :partitionNum="3" :dataSource="record">
    <template #operate1>
      <div>我是续约1的popover</div>
    </template>
  </ZydOperateBtn>
</template>

<script>
import { ZydOperateBtn } from 'zyd-design';

const operateBtnConfig = [
  {
    label: '续约1',
    key: 'operate1',
    attrs: {}, // element-ui button按钮的属性
    tooltip: true,
    events: {
      // element-ui button按钮的方法
      click(daSource, e) {
        console.error('daSource, e', daSource, e);
      },
    },
  },
  {
    label: '续约2',
    key: 'operate2',
    attrs: {},
    events: {},
  },
  {
    label: '续约3',
    key: 'operate3',
    show: false, // 默认为true，不展示用false
    attrs: {},
    events: {},
  },
  {
    label: '续约4',
    key: 'operate4',
    attrs: {},
    events: {
      click(daSource, e) {
        console.error('daSource, e', daSource, e);
      },
    },
  },
  {
    label: '续约5',
    key: 'operate5',
    attrs: {},
    events: {},
  },
];

export default {
  components: {
    ZydOperateBtn,
  },
  data() {
    return {
      operateBtnConfig,
      record: {
        id: 1,
        name: '张三',
      },
    };
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

| Prop name        | Description                                      | Type   | Values | Default |
| ---------------- | ------------------------------------------------ | ------ | ------ | ------- |
| operateBtnConfig | 操作按钮配置                                     | array  | -      | []      |
| partitionNum     | 分割数                                           | number | -      | 3       |
| dataSource       | 传入的数据，鼠标点击操作按钮会传出，不做任何处理 | object | -      | {}      |

## Slots

| Name     | Description                                             | Bindings |
| -------- | ------------------------------------------------------- | -------- |
| item.key | popover 内容，根据 topThreeConfig 配置的 key 值做插槽名 |          |

> functional
