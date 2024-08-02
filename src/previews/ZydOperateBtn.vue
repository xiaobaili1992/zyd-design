<template>
  <ZydOperateBtn :operateBtnConfig="operateBtnConfig" :partitionNum="3" :dataSource="record">
    <template #operate1>
      <div>我是续约1的popover</div>
    </template>
  </ZydOperateBtn>
</template>

<script>
import { ZydOperateBtn } from '../index.js';

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
