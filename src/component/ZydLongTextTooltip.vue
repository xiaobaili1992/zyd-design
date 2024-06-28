<template>
  <div class="long-text-tooltip-wrap">
    <el-tooltip
      ref="tlp"
      :content="text"
      effect="dark"
      :disabled="!tooltipFlag"
      :placement="placement"
      theme="light"
      v-if="!disabled"
    >
      <p class="over-flow" style="cursor: pointer" @mouseenter="visibilityChange($event)">
        {{ text }}
      </p>
    </el-tooltip>
    <p v-else class="over-flow">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'ZydLongTextTooltip',
  props: {
    text: { default: '' }, // 字符内容
    placement: { type: String, default: 'top-start' },
    className: { type: String, default: 'text' }, // class
    disabled: {
      default: false,
    },
  },
  data() {
    return {
      tooltipFlag: false,
    };
  },
  methods: {
    // tooltip的可控
    visibilityChange(event) {
      const ev = event.target;
      const ev_weight = ev.scrollWidth; // 文本的实际宽度
      const content_weight = this.$refs.tlp.$el.parentNode.clientWidth; // 文本容器宽度(父节点)
      if (ev_weight > content_weight) {
        // 文本宽度 > 实际内容宽度  =》内容溢出
        this.tooltipFlag = true;
      } else {
        // 否则为不溢出
        this.tooltipFlag = false;
      }
    },
  },
};
</script>

<style scoped>
.long-text-tooltip-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 24px;
}

.over-flow {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
}

p {
  width: 100%;
  margin: 0;
}
</style>
