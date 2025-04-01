# ZydIconButton

<ClientOnly>
<CodePreview>
<template slot="preview">
<ZydIconButton />
</template>
<template slot="code">

```vue
<template>
  <div class="button-wrap">
    <ZydIconButton>下载</ZydIconButton>
    <ZydIconButton iconClass="dee-pz">配置</ZydIconButton>
  </div>
</template>

<script>
import { ZydIconButton } from 'zyd-design';

export default {
  components: { ZydIconButton },
};
</script>
```

</template>
</CodePreview>
</ClientOnly>

## Props

| Prop name | Description                                                                                                                       | Type    | Values                                    | Default        |
| --------- | --------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------- | -------------- |
| iconClass | 图标类名，具体详见`dee-svg-icon`的配置名称                                                                                        | string  | -                                         | 'dee-download' |
| type      | 按钮类型，默认为 plain，即白底蓝框                                                                                                | string  | `primary/plain`                           | 'plain'        |
| opacity   | 是否需要透明度<br/>eg: 批量控制未选择时点击事件                                                                                   | boolean | `true: 需要透明度`, `false: 不需要透明度` | false          |
| tooltip   | 按钮弹出 tooltip 的内容<br/>批量控制未选择时点击事件<br/>tooltip 在未传参或按钮被禁用时，即 opacity 为 false 时，tooltip 不会显示 | string  | -                                         | null           |

## Slots

| Name    | Description                                                            | Bindings |
| ------- | ---------------------------------------------------------------------- | -------- |
| icon    | 可以根据 dee-svg-icon 名写入 iconClass 进行渲染，也可以插槽自定义 icon |          |
| default |                                                                        |          |

> functional
