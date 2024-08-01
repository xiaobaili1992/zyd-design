# {{ displayName }}

{{ description }}

## 示例

<ClientOnly>
  <{{ displayName }}Demo />
</ClientOnly>

## Props

{{#if props}}
| Prop name | Description | Type | Values | Default |
| --------- | ----------- | ---- | ------ | ------- |
{{#props}}
| {{ name }} | {{ description }} | {{ type }} | {{ values }} | {{ defaultValue }} |
{{/props}}
{{/if}}