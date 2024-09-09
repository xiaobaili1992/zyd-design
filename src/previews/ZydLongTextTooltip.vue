<template>
  <div class="box">
    <ZydLongTextTooltip
      text="我是一个超级长超级长超级长超级长超级长超级长超级长超级长超级长的内容"
    ></ZydLongTextTooltip>
    <ZydLongTextTooltip
      text="不超长的内容，没有tooltip"
    ></ZydLongTextTooltip>
  </div>
</template>

<script>
import { ZydLongTextTooltip } from '../index.js';

export default {
  components: {
    ZydLongTextTooltip,
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 300px;
}
</style>
