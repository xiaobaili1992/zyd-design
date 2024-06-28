<!-- 
<ZydTabChange
  :tabList="tabList"
  //默认选中tab
  :activeName="逆变器日报"
  //不使用插槽则使用函数监控active变化
  @activeChange="activeChange($event)"
>
  //根据tabList的name值，切换对应的内容
  <template #daily>123</template>
</ZydTabChange> 

-->

<template>
  <el-tabs v-model="active">
    <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label" :name="item.name">
      <slot :name="item.name" v-if="active === item.name"></slot>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'zydtab',
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
    //默认tab
    activeName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      active: this.activeName || (this.tabList.length > 0 ? this.tabList[0].name : ''),
    };
  },
  watch: {
    //不使用插槽，根据activeName变化，触发activeChange事件
    active(val) {
      this.$emit('activeChange', val);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .el-tabs__header {
    width: 100%;
    padding: 0 16px !important;
  }
  .el-tabs__item.is-active {
      font-weight:600 !important;
      color: #2355d8 !important;
    }

    .el-tabs__item {
      height: 53px;
      line-height: 53px;
      padding: 0 24px 0 0 !important;
      color: #666 !important;
      font-weight: normal !important;
    }

    .el-tabs__nav-wrap::after {
      height: 1px !important;
    }
}
</style>
