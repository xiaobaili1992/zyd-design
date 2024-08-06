<template>
  <div>
    <ZydTag color="#1cb866">我是tag</ZydTag>
    <ZydTag color="red">红色</ZydTag>
    <ZydTag color="#595959" customSty="  background: #f5f5f5;border: 1px solid rgba(140, 140, 140, 0.7);">
      自定义离线
    </ZydTag>
  </div>
</template>

<script>
import {ZydTag} from '../index.js'

export default {
  components: {
    ZydTag
  }
}
</script>