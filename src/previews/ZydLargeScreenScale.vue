<template>
  <ZydLargeScreenScale width="1980" height="1080">
    <div class="content">我是内容</div>
  </ZydLargeScreenScale>
</template>

<script>
import { ZydLargeScreenScale } from '../index.js';

export default {
  components: {
    ZydLargeScreenScale,
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  background: #ccc;
  z-index: 0;
}
</style>
