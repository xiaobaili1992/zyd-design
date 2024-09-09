<template>
  <div class="pane-wrap">
    <ZydSplitPane color="#1cb866">
      <template slot="left">
        <div class="left">Left Pane</div>
      </template>
      <template slot="right">
        <div class="right">Right Pane</div>
      </template>
    </ZydSplitPane>
    <ZydSplitPane color="#1cb866" direction="v">
      <template slot="left">
        <div class="left">Top Pane</div>
      </template>
      <template slot="right">
        <div class="right">Bottom Pane</div>
      </template>
    </ZydSplitPane>
  </div>
</template>

<script>
import { ZydSplitPane } from '../index.js';

export default {
  components: {
    ZydSplitPane,
  },
};
</script>

<style lang="scss" scoped>
.pane-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
  ::v-deep .container-v {
    height: 600px;
  }
}
.left {
  background: #ccc;
  width: 100%;
  height: 100%;
}
.right {
  background: #ddd;
  width: 100%;
  height: 100%;
}
</style>
