<template>
  <div class="zyd-details">
    <el-drawer
      v-if="type === 'drawer'"
      v-bind="$attrs"
      :visible.sync="detailsVisible"
      @close="close"
      destroy-on-close
    >
      <div class="drawer-content">
        <div class="drawer-content-wrap">
          <div class="drawer-content-wrap-inner">
            <detail-content :details="details">
              <template v-for="(_, name) in $slots" #[name]>
                <slot :name="name"></slot>
              </template>
            </detail-content>
          </div>
        </div>
        <div class="drawer-footer">
          <template v-if="$slots.footer">
            <slot name="footer" />
          </template>
          <div v-else class="footer-inner">
            <el-button @click="close">{{ $t ? $t('关闭') : '关闭' }}</el-button>
          </div>
        </div>
      </div>
    </el-drawer>
    <el-dialog
      v-else-if="type === 'dialog'"
      v-bind="$attrs"
      :visible.sync="detailsVisible"
      @close="close"
      destroy-on-close
    >
      <detail-content :details="details">
        <template v-for="(_, name) in $slots" #[name]>
          <slot :name="name"></slot>
        </template>
      </detail-content>
      <!-- 底部按钮区域 -->
      <!-- 默认展示关闭按钮 -->
      <!-- 如果父组件传递了 footer 插槽，则展示父组件的插槽内容 -->
      <template #footer>
        <template v-if="$slots.footer">
          <slot name="footer" />
        </template>
        <div v-else class="footer-inner">
          <el-button @click="close">{{ $t ? $t('关闭') : '关闭' }}</el-button>
        </div>
      </template>
    </el-dialog>
    <detail-content v-else :details="details" />
  </div>
</template>
<script>
import detailContent from './detailContent.vue';
export default {
  components: {
    detailContent,
  },
  // 除el-drawer/el-dialog参数外，扩展参数
  // @param {Boolean} visible 弹窗显示
  // @param {String} type 类型（drawer、dialog、default），默认为drawer，default为只有内容，没有弹窗
  // @param {Array} details 数据
  // {
  //   label: '名称',//可选，无label时，整行展示，type属性为title时，label为标题
  //   key: 'name',//必选
  //   value: '1111',//可选，无value时，可根据key值做插槽名，slot传入，slot优先级高于value
  //   labelWidth: '100',//可选，label宽度,默认取标题分割该部分最长label的宽度
  //   inline: true,//可选，是否一行展示两条数据，连续两个元素inline为true时，会置于一行展示
  //   type: 'title',//可选，是否为标题，优先级最高，type属性为title时，label为标题
  //   direction: 'row',//可选，flex布局方向，默认row，当为column时，label和value会置于两行
  //   format: (value) => value,//可选，value的格式化函数
  // }
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'drawer',
      validator(value) {
        return ['default', 'drawer', 'dialog'].includes(value);
      },
    },
    details: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      detailsVisible: false,
    };
  },
  watch: {
    visible: {
      handler(newVal) {
        this.detailsVisible = newVal;
      },
      immediate: true,
    },
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog {
  .el-dialog__body {
    padding: 24px !important;
  }
  .el-dialog__footer {
    padding: 16px 24px !important;
    border-top: 1px solid #e6e6e6;
  }
}
::v-deep .el-drawer {
  .drawer-content {
    height: 100%;
    overflow-y: auto;
    // margin: 24px;
    background: #fff;
    //box-shadow: 2px 2px 4px 4px rgba(182, 182, 182, 0.08);
    //border-radius: 8px;
    // padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;

    &-wrap {
      flex: 1;
      position: relative;

      &-inner {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
        padding: 24px;
        box-sizing: border-box;
      }
    }

    .drawer-footer {
      padding: 16px 24px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      border-top: 1px solid #f0f0f0;
    }
  }
}
</style>
