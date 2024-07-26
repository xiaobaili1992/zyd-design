<template>
  <transition name="el-zoom-in-top" @after-leave="$emit('dodestroy')">
    <div
      v-show="visible"
      class="el-picker-panel el-date-range-picker el-popper"
      :class="[
        {
          'has-sidebar': $slots.sidebar || shortcuts,
        },
        popperClass,
      ]"
    >
      <div class="el-picker-panel__body-wrapper">
        <slot name="sidebar" class="el-picker-panel__sidebar"></slot>
        <div class="el-picker-panel__sidebar" v-if="shortcuts">
          <button
            type="button"
            class="el-picker-panel__shortcut"
            v-for="(shortcut, index) in shortcuts"
            @click="handleShortcutClick(shortcut)"
            :key="index"
          >
            {{ shortcut.text }}
          </button>
        </div>
        <div class="el-picker-panel__body">
          <div
            class="el-picker-panel__content el-date-range-picker__content is-left"
          >
            <div class="el-date-range-picker__header">
              <button
                type="button"
                @click="leftPrevYear()"
                class="el-picker-panel__icon-btn el-icon-d-arrow-left"
              ></button>
              <button
                type="button"
                v-if="unlinkPanels"
                @click="leftNextYear()"
                :disabled="!enableYearArrow"
                :class="{ 'is-disabled': !enableYearArrow }"
                class="el-picker-panel__icon-btn el-icon-d-arrow-right"
              ></button>
              <div>{{ leftLabel }}</div>
            </div>
            <year-table
              selection-mode="range"
              :date="leftDate"
              :min-date="minDate"
              :max-date="maxDate"
              :rangeState="rangeState"
              :disabled-date="disabledDate"
              @changerange="handleChangeRange"
              @pick="handleRangePick"
            >
            </year-table>
          </div>
          <div
            class="el-picker-panel__content el-date-range-picker__content is-right"
          >
            <div class="el-date-range-picker__header">
              <button
                type="button"
                v-if="unlinkPanels"
                @click="rightPrevYear()"
                :disabled="!enableYearArrow"
                :class="{ 'is-disabled': !enableYearArrow }"
                class="el-picker-panel__icon-btn el-icon-d-arrow-left"
              ></button>
              <button
                type="button"
                @click="rightNextYear()"
                class="el-picker-panel__icon-btn el-icon-d-arrow-right"
              ></button>
              <div>{{ rightLabel }}</div>
            </div>
            <year-table
              selection-mode="range"
              :date="rightDate"
              :min-date="minDate"
              :max-date="maxDate"
              :rangeState="rangeState"
              :disabled-date="disabledDate"
              @changerange="handleChangeRange"
              @pick="handleRangePick"
            >
            </year-table>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
import { isDate, prevYear, nextYear } from "element-ui/src/utils/date-util";
import Locale from "element-ui/src/mixins/locale";
import { toDate, modifyWithTimeString } from "element-ui/src/utils/date-util";
import yearTable from "../basic/year-table";

const calcDefaultValue = (defaultValue) => {
  var date;
  if (Array.isArray(defaultValue)) {
    return [new Date(defaultValue[0]), new Date(defaultValue[1])];
  } else if (defaultValue) {
    date = new Date(defaultValue);
    return [
      new Date(date),
      new Date(date.setFullYear(date.getFullYear() + 10)),
    ];
  } else {
    date = new Date();
    return [new Date(), new Date(date.setFullYear(date.getFullYear() + 10))];
  }
};
export default {
  mixins: [Locale],
  data() {
    return {
      popperClass: "",
      value: [],
      defaultValue: null,
      defaultTime: null,
      minDate: "",
      maxDate: "",
      leftDate: calcDefaultValue(this.defaultValue)[0],
      rightDate: calcDefaultValue(this.defaultValue)[1],
      rangeState: {
        endDate: null,
        selecting: false,
      },
      shortcuts: "",
      visible: "",
      disabledDate: "",
      format: "",
      arrowControl: false,
      unlinkPanels: false,
    };
  },
  components: {
    yearTable,
  },
  methods: {
    handleClear() {
      this.minDate = null;
      this.maxDate = null;
      this.leftDate = calcDefaultValue(this.defaultValue)[0];
      this.handleConfirm(false);
      this.$emit("pick", null);
    },
    handleChangeRange(val) {
      this.minDate = val.minDate;
      this.maxDate = val.maxDate;
      this.rangeState = val.rangeState;
    },
    handleRangePick(val, close = true) {
      const defaultTime = this.defaultTime || [];
      const minDate = modifyWithTimeString(val.minDate, defaultTime[0]);
      const maxDate = modifyWithTimeString(val.maxDate, defaultTime[1]);
      if (this.maxDate === maxDate && this.minDate === minDate) {
        return;
      }
      this.onPick && this.onPick(val);
      this.maxDate = maxDate;
      this.minDate = minDate;
      // workaround for https://github.com/ElemeFE/element/issues/7539, should remove this block when we don't have to care about Chromium 55 - 57
      setTimeout(() => {
        this.maxDate = maxDate;
        this.minDate = minDate;
      }, 10);
      if (!close) return;
      this.handleConfirm();
    },
    handleShortcutClick(shortcut) {
      if (shortcut.onClick) {
        shortcut.onClick(this);
      }
    },

    // leftPrev*, rightNext* need to take care of `unlinkPanels`
    leftPrevYear() {
      this.leftDate = prevYear(this.leftDate, 10);
      if (!this.unlinkPanels) {
        this.rightDate = prevYear(this.rightDate, 10);
      }
    },
    rightNextYear() {
      if (!this.unlinkPanels) {
        this.leftDate = nextYear(this.leftDate, 10);
      }
      this.rightDate = nextYear(this.rightDate, 10);
    },

    // leftNext*, rightPrev* are called when `unlinkPanels` is true
    leftNextYear() {
      this.leftDate = nextYear(this.leftDate, 10);
    },
    rightPrevYear() {
      this.rightDate = prevYear(this.rightDate, 10);
    },

    handleConfirm(visible = false) {
      if (this.isValidValue([this.minDate, this.maxDate])) {
        this.$emit("pick", [this.minDate, this.maxDate], visible);
      }
    },
    isValidValue(value) {
      return (
        Array.isArray(value) &&
        value &&
        value[0] &&
        value[1] &&
        isDate(value[0]) &&
        isDate(value[1]) &&
        value[0].getTime() <= value[1].getTime() &&
        (typeof this.disabledDate === "function"
          ? !this.disabledDate(value[0]) && !this.disabledDate(value[1])
          : true)
      );
    },
    resetDate() {
      this.leftDate = new Date(this.leftDate);
      this.rightDate = new Date(this.rightDate);
    },
    resetView() {
      this.minDate =
        this.value && isDate(this.value[0]) ? new Date(this.value[0]) : null;
      this.maxDate =
        this.value && isDate(this.value[0]) ? new Date(this.value[1]) : null;
    },
  },
  watch: {
    value: {
      handler(newVal) {
        if (!newVal) {
          this.minDate = null;
          this.maxDate = null;
        } else if (Array.isArray(newVal)) {
          this.minDate = newVal[0] ? toDate(newVal[0]).getFullYear() : null;
          this.maxDate = newVal[1] ? toDate(newVal[1]).getFullYear() : null;
          this.leftDate = new Date(this.minDate, 0, 1);
          this.rangeState.endDate = null;
        }
      },
      immediate: true,
    },
    date(val) {
      const date = new Date(val);
      if (
        !this.unlinkPanels ||
        date.getFullYear() + 10 > this.rightDate.getFullYear()
      ) {
        this.rightDate = new Date(date.setFullYear(date.getFullYear() + 10));
      }
    },
    defaultValue(val) {
      if (!Array.isArray(this.value) || !this.value.length) {
        const [left, right] = calcDefaultValue(val);
        this.leftDate = left;
        if (this.unlinkPanels) this.rightDate = right;
      }
    },
  },
  computed: {
    btnDisabled() {
      return !(
        this.minDate &&
        this.maxDate &&
        !this.selecting &&
        this.isValidValue([this.minDate, this.maxDate])
      );
    },
    leftLabel() {
      const startYear = Math.floor(this.leftDate.getFullYear() / 10) * 10;
      const yearTranslation = this.t("el.datepicker.year");
      return (
        startYear +
        " " +
        yearTranslation +
        " - " +
        (startYear + 9) +
        " " +
        yearTranslation
      );
    },
    rightLabel() {
      const endYear = Math.floor(this.rightDate.getFullYear() / 10) * 10;
      const yearTranslation = this.t("el.datepicker.year");
      return (
        endYear +
        " " +
        yearTranslation +
        " - " +
        (endYear + 9) +
        " " +
        yearTranslation
      );
    },
    leftYear() {
      return Math.floor(this.leftDate.getFullYear() / 10) * 10;
    },
    rightYear() {
      return Math.floor(this.rightDate.getFullYear() / 10) * 10;
    },
    enableYearArrow() {
      return this.unlinkPanels && this.rightYear > this.leftYear + 10;
    },
  },
};
</script>
<style scoped lang="scss">
$--color-primary: #2355d8;
.el-year-table::v-deep {
  td {
    padding: 8px 0;

    div {
      height: 48px;
      padding: 6px 0;
      box-sizing: border-box;
      .cell {
        height: 36px;
        line-height: 36px;
        border-radius: 18px;
      }
    }

    &.start-date div {
      border-top-left-radius: 24px;
      border-bottom-left-radius: 24px;
    }

    &.end-date div {
      border-top-right-radius: 24px;
      border-bottom-right-radius: 24px;
    }

    &.in-range div {
      background-color: #f2f6fc;
    }

    &.start-date,
    &.end-date {
      .cell {
        color: #fff;
        background-color: $--color-primary;
      }
    }

    &.today.start-date,
    &.today.end-date {
      .cell {
        color: #fff;
      }
    }
  }
}
</style>
