<template>
  <div class="box">
    <ZydTypeExchange :sourceData="sourceData" :activeKey.sync="activeKey" />
    <ZydTypeExchange :sourceData="sourceData1" :activeKey.sync="activeKey" />
  </div>
</template>

<script>
import { ZydTypeExchange } from '../index.js';
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
