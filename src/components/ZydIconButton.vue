<template>
  <el-button
    class="zyd-custom-icon-button"
    size="small"
    v-bind="$attrs"
    :style="`--color:${color};--bg-color: ${bgColor};border: ${border}`"
    v-on="$listeners"
  >
    <svg-icon
      :iconClass="iconClass"
      :style="`width: 14px; height: 14px;fill: ${color};margin-bottom: -2px;`"
    />
    <slot />
  </el-button>
</template>

<script>
import { SvgIcon } from 'dee-svg-icon';
export default {
  name: 'ZydIconButton',
  components: { SvgIcon },
  props: {
    /**
     * 图标类名，具体详见`dee-svg-icon`的配置名称
     **/
    iconClass: {
      type: String,
      default: 'dee-download',
    },
    /**
     * 按钮的背景色
     **/
    bgColor: {
      type: String,
      default: '#fff',
    },
    /**
     * 按钮字体颜色和图标的填充色
     **/
    color: {
      type: String,
      default: '#2355d8',
    },
    /**
     * 边框样式
     */
    border: {
      type: String,
      default: '1px solid #2355d8',
    },
  },
};
</script>

<style lang="scss" scoped>
.zyd-custom-icon-button {
  color: var(--color);
  background: var(--bg-color);
  height: 32px;
  box-sizing: border-box;
  padding: 8px 12px;
}
</style>
