# ZydPage

## Props

| Prop name        | Description | Type   | Values | Default                                                                                                                                       |
| ---------------- | ----------- | ------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| searchConfig     |             | array  | -      | []                                                                                                                                            |
| tableConfig      |             | object | -      | {<br/> dataSource: [],<br/> columns: [],<br/> attr: {},<br/>}                                                                                 |
| paginationConfig |             | object | -      | {<br/> total: 0,<br/> pageSize: 10,<br/> currentPage: 1,<br/> sizeChange: () =&gt; {},<br/> currentChange: () =&gt; {},<br/> attrs: {},<br/>} |

## Slots

| Name          | Description | Bindings   |
| ------------- | ----------- | ---------- |
| customContent |             |            |
| operateLeft   |             |            |
| operateRight  |             |            |
| bodyCell      |             | <br/><br/> |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| onSearch   |            |
| onReset    |            |

> functional
