<template>
  <div class="zyd-operate-btn">
    <span v-for="(item, index) in topThreeConfig" :key="item.key">
      <el-popover
        :disabled="!item.tooltip || (item.tooltip.disabled != undefined && item.tooltip.disabled)"
        v-bind="item.tooltip || {}">
        <slot :name="item.key"></slot>
        <el-button type="text"  v-bind="item.attrs || {}" @click="(e) => commonFn(item, 'click', e)" slot="reference">{{ item.label }}</el-button>
      </el-popover>
      <el-divider
        class="zyd-operate-vertical-line"
        direction="vertical"
        v-if="index !== topThreeConfig.length - 1"
      />
    </span>
    <el-divider
      class="zyd-operate-vertical-line"
      direction="vertical"
      v-if="remainConfig.length > 0"
    />
    <el-tooltip
      v-if="remainConfig.length > 0"
      placement="bottom"
      effect="light"
      popper-class="operate-tooltip"
    >
      <template #content>
        <div v-for="(item, index) in remainConfig" :key="item.key">
          <el-button type="text" @click="(e) => commonFn(item, 'click', e)">
            {{ item.label }}
          </el-button>
          <div class="zyd-operate-line" v-if="index !== remainConfig.length - 1"></div>
        </div>
      </template>
      <el-button type="text">
        <i class="el-icon-more" style="color: #ccc; font-size: 12px" />
      </el-button>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  name: 'ZydOperateBtn',
  props: {
    operateBtnConfig: {
      type: Array,
      default: () => {
        return [];
      },
    },
    partitionNum: {
      type: Number,
      default: 3,
    },
    dataSource: {
      type: Object,
      default: () => {
        return {};
      },
    }
  },
  data() {
    const showOperateBtnConfig = this.getShowOperateBtnConfig();
    return {
      topThreeConfig: showOperateBtnConfig?.slice(0, this.partitionNum),
      remainConfig: showOperateBtnConfig?.slice(this.partitionNum),
    };
  },
  mounted() {},
  methods: {
    commonFn(item, type, e) {
      item?.events?.[type]?.(this.dataSource, e);
    },
    getShowOperateBtnConfig() {
      return (
        this.operateBtnConfig.filter((item) => {
          return typeof item.show === 'undefined' || item.show;
        }) || []
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.zyd-operate-btn {
  .zyd-operate-vertical-line {
    background-color: #f0f0f0 !important;
  }
}
</style>
<style lang="scss">
.operate-tooltip {
  border-color: #fff !important;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  padding: 2px 10px;
  .popper__arrow {
    border-bottom-color: #fff !important;
  }
  .el-button {
    font-family:
      PingFangSC,
      PingFang SC;
    font-size: 14px;
    color: #666666;
  }
  .zyd-operate-line {
    width: 100%;
    height: 1px;
    background: #f0f0f0;
  }
}
</style>
