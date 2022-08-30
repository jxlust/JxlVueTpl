import { ExtractPropTypes } from 'vue';

const name = 'at-textarea-common';
const extend = Object.assign;
// Object.assign({},{a:1})
const atTextareaProps = extend(
  {},
  {
    text: String,
  },
);

export type AtTextareaProps = ExtractPropTypes<typeof atTextareaProps>;

export default defineComponent({
  name,

  props: atTextareaProps,

  emits: ['click'],

  setup(props, { slots }) {
    console.log('slots:', slots);

    return () => {
      // const { text } = props;
      return <div></div>;
    };
  },
});
