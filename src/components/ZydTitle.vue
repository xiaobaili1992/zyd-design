<template>
  <div class="zyd-title">{{ title }}</div>
</template>

<script>
export default {
  name: 'zyd-title',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.zyd-title {
  color: #333;
  font-size: 16px;
  font-weight: 500;
  padding-left: 8px;
  box-sizing: border-box;
  position: relative;
  font-weight: bold;
  &::before {
    content: '';
    display: block;
    background: #2355d8;
    width: 4px;
    height: 14px;
    border-radius: 2px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
  }
}
</style>
