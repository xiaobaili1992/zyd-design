export default {
  name: 'render-col',
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null,
    },
  },
  render(h, ctx) {
    const { props } = ctx;
    return props.render(h, props?.row?.[props?.column?.prop], props?.row, props?.index);
  },
};
