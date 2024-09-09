# ZydLongTextTooltip

<ClientOnly>
<CodePreview>
<template slot="preview">
<ZydLongTextTooltip />
</template>
<template slot="code">

```vue
<template>
  <div class="box">
    <ZydLongTextTooltip
      text="我是一个超级长超级长超级长超级长超级长超级长超级长超级长超级长的内容"
    ></ZydLongTextTooltip>
    <ZydLongTextTooltip text="不超长的内容，没有tooltip"></ZydLongTextTooltip>
  </div>
</template>

<script>
import { ZydLongTextTooltip } from 'zyd-design';

export default {
  components: {
    ZydLongTextTooltip,
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 300px;
}
</style>
```

</template>
</CodePreview>
</ClientOnly>

## Props

| Prop name | Description                                                              | Type    | Values                                                                                                      | Default     |
| --------- | ------------------------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------- | ----------- |
| text      | 显示的内容                                                               | string  | -                                                                                                           | ''          |
| placement | Tooltip 的出现位置                                                       | string  | `top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end` | 'top-start' |
| disabled  | 是否需要 tooltip<br/>`@deprecated` 下个版本不再使用，将使用 visible 替换 | boolean | -                                                                                                           | false       |

> functional
