<template>
  <div class="container-h" v-if="direction == 'h'">
    <div
      class="left"
      :style="{ width: leftWidth + 'px', maxWidth, minWidth: leftWidth == 0 ? 0 : minWidth }"
    >
      <slot name="left" />
    </div>
    <div class="divider-h" @mousedown="startDrag" v-if="leftWidth != 0"></div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
  <div class="container-v" v-else>
    <div
      class="top"
      :style="{
        height: topHeight + 'px',
        minHeight: topHeight == 0 ? 0 : minWidth,
        maxHeight: maxWidth,
      }"
    >
      <slot name="left" />
    </div>
    <div class="divider-v" @mousedown="startDrag"></div>
    <div class="bottom">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZydSplitPane',
  props: {
    /**
     *  默认的宽度或高度
     */
    width: {
      default: 280,
    },
    /**
     * 最小宽度
     */
    minWidth: {
      default: '250px',
    },
    /**
     *  最大宽度或高度
     */
    maxWidth: {
      default: '500px',
    },
    /**
     *  水平或垂直
     * @values h/v
     */
    direction: {
      type: String,
      default: 'h',
    },
  },
  watch: {
    width(v) {
      if (this.direction == 'h') {
        this.leftWidth = v;
      } else {
        this.startLeftWidth = v;
      }
    },
  },
  data() {
    return {
      leftWidth: this.width, // 左边区域的宽度
      topHeight: this.width, // 顶部区域的高度
      startX: 0, // 水平拖动开始时的鼠标位置
      startY: 0, // 垂直拖动开始时的鼠标位置
      startLeftWidth: 0, // 水平拖动开始时的左边区域宽度
      startTopHeight: 0, // 垂直拖动开始的顶部区域高度
      dragging: false,
    };
  },
  mounted() {
    // 监听鼠标移动和松开事件
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.endDrag);
  },
  beforeDestroy() {
    // 移除事件监听
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.endDrag);
  },
  methods: {
    // 开始水平或垂直拖动
    startDrag(e) {
      this.dragging = true;
      if (this.direction == 'h') {
        this.startX = e.clientX;
        this.startLeftWidth = this.leftWidth;
      } else {
        this.startY = e.clientY;
        this.startTopHeight = this.topHeight;
      }
    },
    // 拖动中
    onDrag(e) {
      if (this.dragging) {
        if (this.direction == 'h') {
          let delta = e.clientX - this.startX;
          // 更新左右区域的宽度
          this.leftWidth = this.startLeftWidth + delta;
          /**
           * 更新宽度
           */
          this.$emit('update:width', this.leftWidth);
          /**
           * 拖动变化时候返回宽度状态
           */
          this.$emit('change', this.leftWidth);
        } else {
          // 计算垂直拖动的距离
          let delta = e.clientY - this.startY;
          // 更新上下区域的高度
          this.topHeight = this.startTopHeight + delta;
        }
      }
    },
    // 结束拖动
    endDrag() {
      this.dragging = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-h {
  display: flex;
  width: 100%;
  height: 100%;
  .left {
    height: 100%;
    min-width: 300px;
  }

  .right {
    height: 100%;
    flex: 1;
  }
  .divider-h {
    width: 2px;
    cursor: col-resize;
    box-sizing: border-box;
    &:hover {
      border-left: 1px dashed skyblue;
    }
  }
}
.container-v {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
  }
  .bottom {
    width: 100%;
    flex: 1;
  }
  .divider-v {
    height: 2px;
    width: 100%;
    cursor: row-resize;
    box-sizing: border-box;
    &:hover {
      border-top: 1px dashed skyblue;
    }
  }
}
</style>
