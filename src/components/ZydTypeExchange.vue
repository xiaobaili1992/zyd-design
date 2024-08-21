<template>
  <div class="type-exchange-wrap">
    <div
      :class="activeKey == item.key ? 'type-item type-item-active' : 'type-item'"
      v-for="item in sourceData"
      :key="item.key"
      @click="handleClick(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZydTypeExchange',
  props: {
    /**
     * 列表切换项
     */
    sourceData: {
      type: '',
      default: [
        {
          key: 1,
          label: '日',
        },
        {
          key: 2,
          label: '月',
        },
        {
          key: 3,
          label: '年',
        },
      ],
    },
    /**
     * 当前选中的项
     */
    activeKey: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    handleClick(item) {
      if (item.key == this.activeKey) return;
      /**
       * 更新activeKey
       */
      this.$emit('update:activeKey', item.key);
      /**
       * 更新事件
       */
      this.$emit('change', item);
    },
  },
};
</script>

<style lang="scss" scoped>
.type-exchange-wrap {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 3px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  .type-item {
    min-width: 40px;
    height: 24px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    color: #999;
    font-size: 14px;
    cursor: pointer;
    padding: 0 4px;
    box-sizing: border-box;
  }
  .type-item-active {
    background: #2355d8;
    color: #fff;
  }
}
</style>
