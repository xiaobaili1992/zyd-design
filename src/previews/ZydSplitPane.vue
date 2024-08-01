<template>
  <div>
    <ZydSplitPane color="#1cb866">
      <template slot="left">
        <div class="left">Left Pane</div>
      </template>
      <template slot="right">
        <div class="right">Right Pane</div>
      </template>
    </ZydSplitPane>
  </div>
</template>

<script>
import {ZydSplitPane} from '../index.js'

export default {
  components: {
    ZydSplitPane
  }
}
</script>

<style lang="scss" scoped>
.left {
  background: #ccc;
}
.right {
  background: #ddd;
}
</style>