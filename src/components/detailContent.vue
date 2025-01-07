<template>
  <div class="container">
    <div v-if="errorMsg" class="details-wrap">{{ errorMsg }}</div>
    <div v-else class="details-wrap">
      <div
        v-for="(detail, index) in details"
        :key="detail.key"
        class="details-item-wrap"
        :class="{
          inline: detail.inline,
          title: detail.type === 'title' && index !== 0,
        }"
        :style="{
          flexDirection: detail.direction || 'row',
        }"
      >
        <template v-if="detail.type === 'title'">
          <div class="title-wrap">{{ detail.label }}</div>
        </template>

        <template v-else-if="$slots[detail.key] && !detail.label">
          <div class="slot-wrap">
            <template v-if="detail.value">
              {{ detail.format ? detail.format(detail.value) : detail.value }}
            </template>
            <slot v-else-if="$slots[detail.key]" :name="detail.key"></slot>
            <template v-else>--</template>
          </div>
        </template>

        <template v-else>
          <div
            class="label"
            :style="{
              width: detail.labelWidth || labelWidth[getSectionIndex(detail)] + 'em',
            }"
          >
            {{ detail.label }}
          </div>
          <div class="value">
            <slot v-if="$slots[detail.key]" :name="detail.key"></slot>
            <template v-else>
              {{ (detail.format ? detail.format(detail.value) : detail.value) || '--' }}
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import detailContent from './detailContent.vue';
export default {
  components: {
    detailContent,
  },
  // 接收父组件传递的参数
  // @param {Array} details 数据
  props: {
    details: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      detailsVisible: false,
      errorMsg: null,
    };
  },
  watch: {
    details: {
      handler(newVal) {
        try {
          if (!Array.isArray(newVal)) {
            this.errorMsg = '数据格式异常,details必须为数组';
            return;
          }
          for (const item of newVal) {
            if (!item.key) {
              this.errorMsg = '数据格式异常,每项必须包含key字段';
              return;
            }
          }
          this.errorMsg = null;
        } catch (error) {
          this.errorMsg = '数据格式异常,异常信息:' + error;
        }
      },
      deep: true,
    },
  },

  computed: {
    labelWidth() {
      // 根据分组结果计算每组最大标签宽度
      return this.getSections().map((section) => {
        const widthList = section
          .filter((item) => item.type !== 'title')
          .map((item) => (item.label || '').length || 0);
        return Math.max(...widthList);
      });
    },
  },
  methods: {
    /**
     * 将数据按标题分组
     * @description 遍历数组，根据type为title的项将数据分组
     */
    getSections() {
      try {
        const sections = [];
        let currentSection = [];
        if (!this.details.length) return [];

        this.details.forEach((item) => {
          if (item.type === 'title') {
            if (currentSection.length) {
              sections.push(currentSection);
            }
            currentSection = [];
          }
          currentSection.push(item);
        });

        if (currentSection.length) {
          sections.push(currentSection);
        }

        return sections;
      } catch (error) {
        this.errorMsg = '数据格式异常,异常信息:' + error;
        return [];
      }
    },

    // 获取指定项所在分组的索引
    getSectionIndex(detail) {
      const sections = this.getSections();
      return sections.findIndex((section) => section.includes(detail));
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .details-wrap {
    flex: 1;
    overflow-y: auto;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    gap: 12px;

    .title-wrap {
      width: 100%;
      position: relative;
      box-sizing: border-box;
      padding-left: 8px;
      color: #333;
      font-weight: 500;
      font-size: 16px;
      white-space: nowrap;
      margin-bottom: 4px;

      &::before {
        position: absolute;
        top: 50%;
        left: 0;
        display: block;
        width: 4px;
        height: 14px;
        background: #2355d8;
        border-radius: 2px;
        transform: translate(0, -50%);
        content: '';
      }
    }

    .details-item-wrap {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 16px;
      width: 100%;
      &.title {
        margin-top: 20px;
      }
      &.inline {
        width: calc(50% - 8px);
        box-sizing: border-box;
      }

      .label {
        color: #999;
        line-height: 18px;
      }

      .value {
        color: #333;
        flex: 1;
        line-height: 18px;
        word-break: break-all;
        width: 100%;
      }
    }

    .slot-wrap {
      width: 100%;
      margin-top: 8px;
    }
  }
}
</style>
