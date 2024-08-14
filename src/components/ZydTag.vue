<template>
  <div class="zyd-tag" :style="`--color:${color};--bg: ${rgbBackground};${customSty}`">
    <slot />
  </div>
</template>

<script>
import color from "../utils/color"
export default {
  name: 'ZydTag',
  props: {
    /** 
     * 颜色，可以十六进制(6位16进制和3位16进制)、RGB、RGBA和颜色名称表示
     **/
    color: {
      type: String,
      default: '#2355D8',
    },
  /**
   * 自定义样式
   **/
    customSty: {
      type: String,
      default: '',
    },
  },
  computed: {
    rgbBackground() {
      let temp = this.color;
      if(Object.prototype.hasOwnProperty.call(color, temp)){
        temp = color[temp];
      }
      if (temp.includes('#')) {
        const colorValue = temp.slice(1); // 移除'#'
        let rgb = {
          r: parseInt(colorValue.slice(0, 2), 16),
          g: parseInt(colorValue.slice(2, 4), 16),
          b: parseInt(colorValue.slice(4, 6), 16),
        };
        if (colorValue.length == 3) {
          rgb = {
            r: parseInt(colorValue.slice(0, 1).repeat(2), 16),
            g: parseInt(colorValue.slice(1, 2).repeat(2), 16),
            b: parseInt(colorValue.slice(2, 3).repeat(2), 16),
          };
        }
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.06)`;
      } else {
        const matches = temp.match(/(\d+)/g);
        if (matches) {
          const opacity = (parseFloat(matches[3]) || 1) * 0.06;
          return `rgba(${matches[0]}, ${matches[1]}, ${matches[2]}, ${opacity.toFixed(2)})`;
        }
        return temp;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.zyd-tag {
  $color: var(--color);

  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 4px 8px;
  color: $color;
  font-size: 14px;
  font-family: PingFangSC, 'PingFang SC';
  line-height: 18px;
  background: var(--bg);
  border: 1px solid $color;
  border-radius: 4px;
}
</style>
