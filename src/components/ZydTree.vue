<template>
  <el-tree class="tree-line" ref="el-tree" v-bind="$attrs" v-on="$listeners">
    <template v-for="(_, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(_, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </el-tree>
</template>

<script>
export default {
  name: 'ZydTree',
  props: {},
  data() {
    return {};
  },
  mounted() {
    this.extendMethod();
  },
  methods: {
    extendMethod() {
      const refMethod = Object.entries(this.$refs['el-tree']);
      for (const [key, value] of refMethod) {
        if (!(key.includes('$') || key.includes('_'))) {
          this[key] = value;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/****树的样式修改***/
::v-deep {
  .el-tree-node {
    position: relative;
    padding-left: 16px; // 缩进量
    font-weight: normal;
  }
  > .el-tree-node {
    padding-left: 0;
  }

  .el-tree-node.is-dragging .el-tree-node__content {
    visibility: hidden; /* 隐藏拖拽节点的内容 */
  }

  .el-tree-node__children {
    padding-left: 16px; // 缩进量
  }

  .el-tree-node__content {
    padding-left: 0px !important;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 26px;
    //background: #fff;

    // height: 56px;
    > .custom-tree-node span:nth-child(1) {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 4px;

      > img {
        width: 14px;
        height: 14px;
      }
    }
  }

  // 竖线
  .el-tree-node::before {
    content: '';
    height: 100%;
    width: 1px;
    position: absolute;
    left: -5px;
    top: -26px;
    border-left: 1px solid #f0f0f0;
    z-index: 999;
    box-sizing: border-box;
  }

  // 当前层最后一个节点的竖线高度固定
  .el-tree-node:last-child::before {
    height: 38px; // 可以自己调节到合适数值
  }

  // 横线
  .el-tree-node::after {
    content: '';
    width: 20px;
    height: 1px;
    position: absolute;
    left: -5px;
    top: 12px;
    border-top: 1px solid #f0f0f0;
    box-sizing: border-box;
  }

  // 去掉最顶层的虚线，放最下面样式才不会被上面的覆盖了
  & > .el-tree-node::after {
    border-top: none;
  }

  & > .el-tree-node::before {
    border-left: none;
  }

  // 展开关闭的icon
  .el-tree-node__expand-icon {
    font-size: 16px;
    z-index: 99 !important;
    box-sizing: border-box;
    padding: 4px !important;
    // background: #fff;
    color: #666;
  }
  // 叶子节点（无子节点）
  // TODO 导致拖拽没反应基准线
  .el-tree-node__expand-icon.is-leaf {
    color: transparent;
    display: none; // 也可以去掉
  }
  .el-tree-node.is-expanded .el-tree-node__children {
    // 横线
    .el-tree-node::after {
      content: '';
      width: 20px;
      height: 1px;
      position: absolute;
      left: -5px;
      top: 12px;
      border-top: 1px solid #f0f0f0;
      box-sizing: border-box;
    }
  }
}
::v-deep .is-dragging {
  .el-tree-node:focus::before {
    content: none !important;
  }
  .el-tree-node:focus::after {
    content: none !important;
  }
}

::v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content,
::v-deep .el-tree-node__content:hover {
  // background: #fff !important;
  .over-flow {
    color: rgba(35, 85, 216, 0.9) !important;
  }
}
</style>
