<template>
  <div class="zyd-page">
    <div class="page-content">
      <div class="page-search" v-if="searchConfig.length > 0">
        <el-form :inline="true">
          <el-form-item label="" v-for="item in searchConfig" :key="item.key">
            <el-input
              class="el-input"
              :style="item.style || {}"
              v-if="item.type === 'input'"
              v-model="searchValues[item.key]"
              v-bind="item.attrs || {}"
              @blur="(value) => commonFn(item, 'blur', value)"
              @focus="(value) => commonFn(item, 'focus', value)"
              @change="(value) => commonFn(item, 'change', value)"
              @input="(value) => commonFn(item, 'input', value)"
              @clear="(value) => commonFn(item, 'clear', value)"
            >
              <svg-icon slot="prefix" iconClass="dee-search" class="input-icon" />
            </el-input>
            <el-select
              class="el-select"
              :style="item.style || {}"
              v-if="item.type === 'select'"
              v-model="searchValues[item.key]"
              v-bind="item.attrs || {}"
              @change="(value) => commonFn(item, 'change', value)"
              @visible-change="(value) => commonFn(item, 'visible-change', value)"
              @remove-tag="(value) => commonFn(item, 'remove-tag', value)"
              @clear="(value) => commonFn(item, 'clear', value)"
              @blur="(value) => commonFn(item, 'blur', value)"
              @focus="(value) => commonFn(item, 'focus', value)"
            >
              <el-option
                v-for="(subItem, index) in item.options"
                :key="index"
                :label="subItem.label"
                :value="subItem.value"
              ></el-option>
            </el-select>
            <el-date-picker
              class="el-date-picker"
              :style="item.style || {}"
              v-if="item.type === 'datePicker'"
              v-model="searchValues[item.key]"
              :type="item.pickerType || 'date'"
              v-bind="item.attrs || {}"
              @blur="(value) => commonFn(item, 'blur', value)"
              @focus="(value) => commonFn(item, 'focus', value)"
              @change="(value) => commonFn(item, 'change', value)"
            ></el-date-picker>
            <el-time-picker
              class="el-time-picker"
              :style="item.style || {}"
              v-if="item.type === 'timePicker'"
              v-model="searchValues[item.key]"
              v-bind="item.attrs || {}"
              @blur="(value) => commonFn(item, 'blur', value)"
              @focus="(value) => commonFn(item, 'focus', value)"
              @change="(value) => commonFn(item, 'change', value)"
            ></el-time-picker>
            <el-cascader
              class="el-cascader"
              :style="item.style || {}"
              v-if="item.type === 'cascader'"
              :options="item.options"
              v-model="searchValues[item.key]"
              v-bind="item.attrs || {}"
              @change="(value) => commonFn(item, 'change', value)"
              @visible-change="(value) => commonFn(item, 'visible-change', value)"
              @expand-change="(value) => commonFn(item, 'expand-change', value)"
              @remove-tag="(value) => commonFn(item, 'remove-tag', value)"
              @blur="(value) => commonFn(item, 'blur', value)"
              @focus="(value) => commonFn(item, 'focus', value)"
            ></el-cascader>
          </el-form-item>
        </el-form>
        <el-button class="el-button-search" type="primary" @click="onSearch">查询</el-button>
        <el-button class="el-button-reset" @click="onReset">重置</el-button>
      </div>
      <div class="page-custom-content" v-if="$slots.customContent">
        <slot name="customContent"></slot>
      </div>
      <div class="page-operate" v-if="$slots.operateLeft || $slots.operateRight">
        <div class="operate-left">
          <slot name="operateLeft"></slot>
        </div>
        <div class="operate-right">
          <slot name="operateRight"></slot>
        </div>
      </div>
      <div class="table-pagination-container">
        <div class="table-container">
          <div class="table-content">
            <el-table
              class="el-table"
              height="100%"
              ref="myTable"
              style="width: 100%"
              max-width="100%"
              :data="tableConfig.dataSource || []"
              :default-sort="tableConfig.defaultSort || {}"
              v-loading="tableConfig.loading"
              v-bind="tableConfig.attrs || {}"
              @select="
                (value, value2, value3, value4) =>
                  tableCommonFn(tableConfig.events, 'select', value, value2, value3, value4)
              "
              @select-all="
                (value, value2, value3, value4) =>
                  tableCommonFn(tableConfig.events, 'select-all', value, value2, value3, value4)
              "
              @selection-change="
                (value, value2, value3, value4) =>
                  tableCommonFn(
                    tableConfig.events,
                    'selection-change',
                    value,
                    value2,
                    value3,
                    value4,
                  )
              "
              @cell-mouse-enter="
                (value, value2, value3, value4) =>
                  tableCommonFn(
                    tableConfig.events,
                    'cell-mouse-enter',
                    value,
                    value2,
                    value3,
                    value4,
                  )
              "
              @cell-mouse-leave="
                (value, value2, value3, value4) =>
                  tableCommonFn(
                    tableConfig.events,
                    'cell-mouse-leave',
                    value,
                    value2,
                    value3,
                    value4,
                  )
              "
              @cell-click="
                (value, value2, value3, value4) =>
                  tableCommonFn(tableConfig.events, 'cell-click', value, value2, value3, value4)
              "
              @cell-dblclick="
                (value, value2, value3, value4) =>
                  tableCommonFn(tableConfig.events, 'cell-dblclick', value, value2, value3, value4)
              "
              @row-click="
                (value, value2, value3, value4) =>
                  tableCommonFn(tableConfig.events, 'row-click', value, value2, value3, value4)
              "
              @row-contextmenu="
                (value, value2, value3, value4) =>
                  tableCommonFn(
                    tableConfig.events,
                    'row-contextmenu',
                    value,
                    value2,
                    value3,
                    value4,
                  )
              "
              @row-dblclick="
                (value, value2, value3, value4) =>
                  tableCommonFn(tableConfig.events, 'row-dblclick', value, value2, value3, value4)
              "
              @header-click="
                (value, value2, value3, value4) =>
                  tableCommonFn(tableConfig.events, 'header-click', value, value2, value3, value4)
              "
              @header-contextmenu="
                (value, value2, value3, value4) =>
                  tableCommonFn(
                    tableConfig.events,
                    'header-contextmenu',
                    value,
                    value2,
                    value3,
                    value4,
                  )
              "
              @sort-change="
                (value, value2, value3, value4) =>
                  tableCommonFn(tableConfig.events, 'sort-change', value, value2, value3, value4)
              "
              @filter-change="
                (value, value2, value3, value4) =>
                  tableCommonFn(tableConfig.events, 'filter-change', value, value2, value3, value4)
              "
              @current-change="
                (value, value2, value3, value4) =>
                  tableCommonFn(tableConfig.events, 'current-change', value, value2, value3, value4)
              "
              @header-dragend="
                (value, value2, value3, value4) =>
                  tableCommonFn(tableConfig.events, 'header-dragend', value, value2, value3, value4)
              "
              @expand-change="
                (value, value2, value3, value4) =>
                  tableCommonFn(tableConfig.events, 'expand-change', value, value2, value3, value4)
              "
            >
              <template #empty v-if="tableConfig.dataSource.length === 0 && !tableConfig.loading">
                <el-empty
                  image="https://dee-static.oss-cn-beijing.aliyuncs.com/dee-web/empty-data.png"
                />
              </template>

                <el-table-column 
                  v-if="tableConfig.selection==true"
                  type="selection" width="55"       
                  :selectable="selectableRow">
                </el-table-column>
                <el-table-column
                v-for="item in tableConfig.columns || []"
                :prop="item.prop"
                :label="item.label"
                :key="item.key"
                :sortable="item.sortable"
                :width="item.width"
                :fixed="item.fixed"
                v-bind="item.attrs || {}"
              >
                <template slot="header" v-if="item.headerRender">
                  <RenderCol :render="item.headerRender" />
                </template>
                <template slot-scope="scope">
                  <RenderCol
                    v-if="item.render"
                    :column="item"
                    :row="scope.row"
                    :render="item.render"
                    :index="scope.$index"
                  />
                  <slot v-else name="bodyCell" :column="item" :record="scope.row">
                    <template>
                      <el-tooltip
                        v-if="item.tooltip && scope.row[item.key]"
                        class="item"
                        effect="dark"
                        :content="renderColumnContent(item, scope.row)"
                        :placement="item.tooltip"
                      >
                        <div :class="item.ellipsis ? 'table-cell' : ''">
                          {{ renderColumnContent(item, scope.row) }}
                        </div>
                      </el-tooltip>
                      <div v-else :class="item.ellipsis ? 'table-cell' : ''">
                        {{ renderColumnContent(item, scope.row) }}
                      </div>
                    </template>
                  </slot>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div
          class="pagination-content"
          v-if="Object.keys(paginationConfig).length > 0 && tableConfig.dataSource.length > 0"
        >
          <span class="total-span">共{{ paginationConfig.total || 0 }}条</span>
          <el-pagination
            background
            :total="paginationConfig.total || 0"
            :pageSize="paginationConfig.pageSize || 10"
            :currentPage="paginationConfig.currentPage || 1"
            :pageSizes="[10, 15, 30, 50, 100, 500]"
            layout="slot, sizes, prev, pager, next, jumper"
            v-bind="paginationConfig.attrs || {}"
            @size-change="(value) => commonFn(paginationConfig, 'size-change', value)"
            @current-change="(value) => commonFn(paginationConfig, 'current-change', value)"
            @prev-click="(value) => commonFn(paginationConfig, 'prev-click', value)"
            @next-click="(value) => commonFn(paginationConfig, 'next-click', value)"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import RenderCol from '../utils/RenderCol'


export default {
  name: 'ZydPage',
  components: { RenderCol },
  props: {
    searchConfig: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableConfig: {
      type: Object,
      default: () => {
        return {
          dataSource: [],
          columns: [],
          attr: {},
        };
      },
    },
    paginationConfig: {
      type: Object,
      default: () => {
        return {
          total: 0,
          pageSize: 10,
          currentPage: 1,
          sizeChange: () => {},
          currentChange: () => {},
          attrs: {},
        };
      },
    },
  },
  data() {
    const searchValues = this.setSearchValue();
    return {
      dayjs,
      defaultSearchValues: { ...searchValues },
      searchValues,
    };
  },
  mounted() {},
  methods: {
    selectableRow(row) {
      return row?.selectable != false;
    },
    commonFn(item, type, value) {
      item?.events?.[type]?.(value);
    },
    tableCommonFn(events, type, value, value2, value3, value4) {
      events?.[type]?.(value, value2, value3, value4);
    },
    setSearchValue() {
      const obj = {};
      this.searchConfig?.forEach((item) => {
        obj[item.key] = item.defaultValue;
      });
      return obj;
    },
    renderColumnContent(item, record) {
      const value = record[item.key];
      const { date, format } = item || {};
      if (value) {
        if (date) {
          return dayjs(value).format(format || 'YYYY-MM-DD');
        }
        return value;
      }
      return value === 0 ? value : '--';
    },
    onSearch() {
      this.$emit('onSearch', this.searchValues);
    },
    onReset() {
      this.searchValues = this.defaultSearchValues;
      this.$emit('onReset', this.searchValues);
    },
  },
};
</script>

<style lang="scss" scoped>
.zyd-page {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 16px;

  .page-content {
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 16px;
    background: #fff;
    border-radius: 8px;

    .page-search {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;

      .input-icon {
        position: relative;
        top: 3px;
        left: 5px;
        width: 14px;
        height: 14px;
        fill: #bfbfbf;
      }
      .el-input,
      .el-select,
      .el-date-picker,
      .el-time-picker {
        display: flex;
        align-content: center;
        width: 240px;
      }

      .el-button-search,
      .el-button-reset {
        box-sizing: border-box;
        padding: 8px 15px;
      }

      .el-button-search {
        margin-left: 14px;
      }

      .el-button-reset {
        margin-left: 8px;
      }

      ::v-deep {
        .el-form {
          .el-form-item {
            margin: 0 12px 16px 0;
          }
        }
      }
    }

    .page-custom-content {
      margin-bottom: 16px;
    }

    .page-operate {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 16px;
    }

    .table-pagination-container {
      display: flex;
      flex: 1;
      flex-direction: column;

      .table-container {
        position: relative;
        flex: 1;

        .table-content {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          .table-cell {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          ::v-deep .el-table-column--selection{
            .cell{
              padding-left: 14px;
            }
          }
          ::v-deep {
            .el-table::before,
            .el-table__fixed::before,
            .el-table__fixed-right::before {
              height: 0;
            }
            .el-table__row {
              .el-table__cell {
                padding: 15px 0;
              }
              // &:last-child {
              //   .el-table__cell {
              //     border: none;
              //   }
              // }
            }
            .el-table__header {
              th {
                padding: 9px 0 10px 0;
                color: #333;
                background: #f7f7f7 !important;
                div {
                  font-family:
                    PingFangSC,
                    PingFang SC;
                  font-weight: bold;
                  font-size: 14px;
                  color: #333333;
                }
              }
            }
            .el-table__row--striped {
              td {
                background: #f7fcff !important;
              }
            }
            .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell,
            .el-table__body tr.hover-row > td.el-table__cell {
              background: rgba(35, 85, 216, 0.06) !important;
            }
          }
        }
      }

      .pagination-content {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        padding-top: 16px;
        // border-top: 1px solid #ebeef5;

        .total-span {
          color: #333;
          font-size: 14px;
          font-family: PingFangSC, 'PingFang SC';
        }
      }
    }
  }
}
</style>
