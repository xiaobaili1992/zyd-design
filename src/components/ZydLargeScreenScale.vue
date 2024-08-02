<template>
  <div
    class="scale-view"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      position: 'fixed',
      top: '50%',
      left: '50%',
      'transform-origin': 'left top',
      transform: `scale(${scale}) translate(-50%, -50%)`,
    }"
  >
    <!-- @slot 需要包裹的主体，也就是设计稿的内容 -->
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ZydLargeScreenScale',
  props: {
    /**
     * 按照设计稿，设计稿多宽就设置多宽
     */
    width: {
      default: 1920,
      type: Number,
    },
    /**
     * 按照设计稿，设计稿多高就设置多高
     */
    height: {
      default: 1080,
      type: Number,
    },
  },
  data() {
    return {
      timer: null,
      scale: 1,
    };
  },
  mounted() {
    this.getScale();
    window.addEventListener('resize', () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getScale();
      }, 200);
    });
  },
  methods: {
    /**
     * 获取当前的缩放比例
     */
    getScale() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.scale = Math.min(width / this.width, height / this.height);
    },
  },
};
</script>
<style lang="scss" scoped>
.scale-view {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 1920px;
  height: 1080px;
  transform-origin: left top;
}
</style>
