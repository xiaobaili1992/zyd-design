<template>
  <table
    @click="handleYearTableClick"
    @mousemove="handleMouseMove"
    class="el-year-table"
  >
    <tbody>
      <tr v-for="(row, key) in rows" :key="key">
        <td :class="getCellStyle(cell)" v-for="(cell, key) in row" :key="key">
          <div>
            <a class="cell">
              {{ cell.text }}
            </a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script type="text/babel">
import {
  isDate,
  range,
  getDayCountOfYear,
  nextDate,
} from "element-ui/src/utils/date-util";
import { hasClass } from "element-ui/src/utils/dom";
import {
  arrayFindIndex,
  coerceTruthyValueToArray,
} from "element-ui/src/utils/util";

const datesInYear = (year) => {
  const numOfDays = getDayCountOfYear(year);
  const firstDay = new Date(year, 0);
  return range(numOfDays).map((n) => nextDate(firstDay, n));
};

// eslint-disable-next-line no-unused-vars
const clearDate = (date) => {
  return new Date(date.getFullYear(), 0);
};

// eslint-disable-next-line no-unused-vars
const getYearTimestamp = function (time) {
  if (typeof time === "number" || typeof time === "string") {
    return clearDate(new Date(time, 0)).getTime();
  } else if (time instanceof Date) {
    return clearDate(time).getTime();
  } else {
    return NaN;
  }
};

export default {
  props: {
    disabledDate: {},
    value: {},
    selectionMode: {
      default: "year",
    },
    minDate: {},
    maxDate: {},
    defaultValue: {
      validator(val) {
        // null or valid Date Object
        return (
          val === null ||
          isDate(val) ||
          (Array.isArray(val) && val.every(isDate))
        );
      },
    },
    date: {},
    rangeState: {
      default() {
        return {
          endDate: null,
          selecting: false,
        };
      },
    },
  },
  data() {
    return {
      tableRows: [[], [], []],
      lastRow: null,
      lastColumn: null,
    };
  },
  methods: {
    cellMatchesDate(cell, date) {
      const value = new Date(date);
      return Number(cell.text) === value.getFullYear();
    },
    getCellStyle(cell) {
      const style = {};
      const today = new Date();
      const year = cell.text;
      const defaultValue = this.defaultValue
        ? Array.isArray(this.defaultValue)
          ? this.defaultValue
          : [this.defaultValue]
        : [];
      style.disabled =
        typeof this.disabledDate === "function"
          ? datesInYear(year).every(this.disabledDate)
          : false;
      style.current =
        arrayFindIndex(
          coerceTruthyValueToArray(this.value),
          (date) => date.getFullYear() === year
        ) >= 0;
      style.today = today.getFullYear() === year;
      style.default = defaultValue.some((date) =>
        this.cellMatchesDate(cell, date)
      );
      if (cell.inRange) {
        style["in-range"] = true;

        if (cell.start) {
          style["start-date"] = true;
        }

        if (cell.end) {
          style["end-date"] = true;
        }
      }
      return style;
    },
    getYearOfCell(year) {
      return new Date(year, 0);
    },
    markRange(minDate, maxDate) {
      minDate = getYearTimestamp(minDate);
      maxDate = getYearTimestamp(maxDate) || minDate;
      [minDate, maxDate] = [
        Math.min(minDate, maxDate),
        Math.max(minDate, maxDate),
      ];
      let increasingYear = this.startYear; // 递增年
      const rows = this.rows;
      for (let i = 0, k = rows.length; i < k; i++) {
        const row = rows[i];
        for (let j = 0, l = row.length; j < l; j++) {
          if (i === 2 && j === 2) {
            return;
          }
          const cell = row[j];
          const time = getYearTimestamp(increasingYear);
          cell.inRange = minDate && time >= minDate && time <= maxDate;
          cell.start = minDate && time === minDate;
          cell.end = maxDate && time === maxDate;
          increasingYear++;
        }
      }
    },
    handleMouseMove(event) {
      if (!this.rangeState.selecting) return;

      let target = event.target;
      if (target.tagName === "A") {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === "DIV") {
        target = target.parentNode;
      }
      if (target.tagName !== "TD") return;
      if (hasClass(target.parentNode, "disabled")) return;
      const row = target.parentNode.rowIndex;
      const column = target.cellIndex;
      if (row !== this.lastRow || column !== this.lastColumn) {
        this.lastRow = row;
        this.lastColumn = column;
        this.$emit("changerange", {
          minDate: this.minDate,
          maxDate: this.maxDate,
          rangeState: {
            selecting: true,
            endDate: this.getYearOfCell(target.textContent || target.innerText),
          },
          el: target,
        });
      }
    },
    handleYearTableClick(event) {
      let target = event.target;
      if (target.tagName === "A") {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === "DIV") {
        target = target.parentNode;
      }
      if (target.tagName !== "TD") return;
      if (hasClass(target, "disabled")) return;
      const year = target.textContent || target.innerText;
      const newDate = this.getYearOfCell(year);
      if (this.selectionMode === "range") {
        if (!this.rangeState.selecting) {
          this.$emit("pick", { minDate: newDate, maxDate: null });
          // eslint-disable-next-line vue/no-mutating-props
          this.rangeState.selecting = true;
          // eslint-disable-next-line vue/no-mutating-props
          this.rangeState.endDate = null;
        } else {
          if (newDate >= this.minDate) {
            this.$emit("pick", { minDate: this.minDate, maxDate: newDate });
          } else {
            this.$emit("pick", { minDate: newDate, maxDate: this.minDate });
          }
          // eslint-disable-next-line vue/no-mutating-props
          this.rangeState.selecting = false;
        }
      } else {
        this.$emit("pick", year);
      }
    },
  },
  watch: {
    "rangeState.endDate"(newVal) {
      this.markRange(this.minDate, newVal);
    },

    minDate(newVal, oldVal) {
      if (getYearTimestamp(newVal) !== getYearTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    },

    maxDate(newVal, oldVal) {
      if (getYearTimestamp(newVal) !== getYearTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    },
  },
  computed: {
    rows() {
      const rows = this.tableRows;
      let increasingYear = this.startYear; // 递增年
      const now = getYearTimestamp(new Date());

      for (let i = 0; i < 3; i++) {
        const row = rows[i];
        for (let j = 0; j < 4; j++) {
          if (i === 2 && j === 2) {
            break;
          }
          let cell = row[j];
          if (!cell) {
            cell = {
              row: i,
              column: j,
              type: "normal",
              inRange: false,
              start: false,
              end: false,
            };
          }

          cell.type = "normal";

          const time = getYearTimestamp(increasingYear);
          cell.inRange =
            time >= getYearTimestamp(this.minDate) &&
            time <= getYearTimestamp(this.maxDate);
          cell.start = this.minDate && time === getYearTimestamp(this.minDate);
          cell.end = this.maxDate && time === getYearTimestamp(this.maxDate);

          const isToday = time === now;
          if (isToday) {
            cell.type = "today";
          }

          cell.text = increasingYear;

          increasingYear++;

          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.$set(row, j, cell);
        }
      }
      return rows;
    },
    startYear() {
      return Math.floor(this.date.getFullYear() / 10) * 10;
    },
  },
};
</script>
