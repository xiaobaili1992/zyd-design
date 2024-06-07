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
      transform: `scale(${scale}) translate(-50%, -50%)`
    }"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "scaleView",
  props: {
    width: {
      default: 1920
    },
    height: {
      default: 1080
    }
  },
  data() {
    return {
      timer: null,
      scale: 1
    }
  },
  mounted() {
    this.getScale()
    window.addEventListener("resize", () => {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.getScale()
      }, 200)
    })
  },
  methods: {
    getScale() {
      const width = window.innerWidth
      const height = window.innerHeight
      this.scale = Math.min(width / this.width, height / this.height)
    }
  }
}
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
