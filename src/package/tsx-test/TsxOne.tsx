// 参考vant源码
// const [name, bem] = createNamespace('button');

/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
import { ExtractPropTypes } from 'vue';

const name = 'tsxone';
const extend = Object.assign;
// Object.assign({},{a:1})
const oneProps = extend(
  {},
  {
    text: String,
    type: Number,
  },
);

export type ButtonProps = ExtractPropTypes<typeof oneProps>;

export default defineComponent({
  name,

  props: oneProps,

  emits: ['click'],

  setup(props, { emit, slots }) {
    console.log('slots:', slots);
    const onClick = (event: MouseEvent) => {
      if (props.type) {
        // preventDefault(event);
      }
      emit('click', event);
    };

    return () => {
      const { text, type } = props;
      return (
        <section class={type}>
          <span>{text}</span>
          <button onClick={onClick}>click</button>
        </section>
      );
    };
  },
});
