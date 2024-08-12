<template>
  <div>
    <el-button
      class="zyd-icon-button"
      ref="zyd-icon-button"
      :type="type"
      v-bind="$attrs"
      v-on="$listeners"
      v-if="!opacity"
    >
      <svg-icon v-if="iconClass != null" :iconClass="iconClass" />
      <!-- @slot 可以根据dee-svg-icon名写入iconClass进行渲染，也可以插槽自定义icon-->
      <slot></slot>
      <p>{{ content }}</p>
    </el-button>
    <template v-if="opacity">
      <el-tooltip
        :disabled="!opacity || tooltip == null"
        class="item"
        effect="dark"
        :content="tooltip"
        placement="top"
      >
        <el-button
          class="zyd-icon-button"
          style="opacity: 0.3"
          :type="type"
          ref="zyd-icon-button"
          v-bind="$attrs"
          v-on="$listeners"
        >
          <svg-icon v-if="iconClass != null" :iconClass="iconClass" />
          <slot></slot>
          <p>{{ content }}</p>
        </el-button>
      </el-tooltip>
    </template>
  </div>
</template>
<script>
export default {
  name: 'ZydIconButton',
  props: {
    /**
     * 按钮的文本内容
     * @values 创建/批量控制/……
     */
    content: {
      type: String,
      default: '',
    },
    /**
     * 按钮类型，默认为primary，即蓝底白字
     * @values primary/plain
     */
    type: {
      type: String,
      default: 'primary',
    },
    /**
     * 采用dee-svg-icon的图标，默认为null，没有图标
     */
    iconClass: {
      type: String,
      default: null,
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
  },

  data() {
    return {};
  },
  mounted() {
    this.extendMethod();
  },
  methods: {
    extendMethod() {
      const refMethod = Object.entries(this.$refs['zyd-icon-button']);
      for (const [key, value] of refMethod) {
        if (!(key.includes('$') || key.includes('_'))) {
          this[key] = value;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.zyd-icon-button {
  box-sizing: border-box;
  height: 33px;
  ::v-deep > span {
    display: flex;
    align-items: center;
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
