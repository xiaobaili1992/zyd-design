<template>
  <div>
    <el-button
      class="zyd-custom-icon-button"
      size="small"
      :type="type"
      v-bind="$attrs"
      v-on="$listeners"
      v-if="!opacity"
    >
      <svg-icon v-if="iconClass != null" :iconClass="iconClass" />
      <!-- @slot 可以根据dee-svg-icon名写入iconClass进行渲染，也可以插槽自定义icon-->
      <slot name="icon"></slot>
      <!-- @slot 不加插槽名，为button文字内容 -->
      <p><slot></slot></p>
    </el-button>
    <template v-if="opacity">
      <el-tooltip
        :disabled="!opacity || tooltip == null"
        class="item"
        effect="dark"
        :content="tooltip"
        placement="top"
      >
        <el-button class="zyd-custom-icon-button" size="small" :type="type" style="opacity: 0.3">
          <svg-icon v-if="iconClass != null" :iconClass="iconClass" />
          <slot name="icon"></slot>
          <p><slot></slot></p>
        </el-button>
      </el-tooltip>
    </template>
  </div>
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
     * 按钮类型，默认为plain，即白底蓝框
     * @values primary/plain
     */
    type: {
      type: String,
      default: 'plain',
    },
    /**
     * 是否需要透明度
     * eg: 批量控制未选择时点击事件
     * @values true: 需要透明度
     * @values false: 不需要透明度
     */
    opacity: {
      type: Boolean,
      default: false,
    },
    /**
     * 按钮弹出tooltip的内容
     * 批量控制未选择时点击事件
     * tooltip在未传参或按钮被禁用时，即opacity为false时，tooltip不会显示
     */
    tooltip: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.zyd-custom-icon-button {
  height: 32px;
  box-sizing: border-box;
  padding: 8px 15px;
  ::v-deep > span {
    display: flex;
    align-items: center;
  }
}
::v-deep .el-button--primary {
  border: 1px solid #2355d8;
  background: #2355d8;
}
p {
  margin-left: 3px;
  color: #ffffff;
}
svg {
  position: relative;
  top: 0px;
  left: 5px;
  width: 14px;
  height: 14px;
  margin-right: 8px;
  fill: #ffffff;
}
::v-deep .el-button--plain {
  border: 1px solid #2355d8;
  background: #fff;

  p {
    color: #2355d8;
    margin: 1px 0 0 2px;
  }
  svg {
    fill: #2355d8;
  }
  &:hover {
    background: #fff;
  }
}
</style>
