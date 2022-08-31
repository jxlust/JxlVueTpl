//ts-ignore
import { ExtractPropTypes, ref } from 'vue';
import Tribute from 'tributejs';
import './index.scss';

// 转义HTML
const htmlEscape = (html: string) => {
  //match, pos, originalText
  return html.replace(/[<>"&]/g, function (match) {
    switch (match) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '"':
        return '&quot;';
      default:
        return match;
    }
  });
};

const name = 'at-textarea';
const extend = Object.assign;
// Object.assign({},{a:1})
const atTextareaProps = extend(
  {},
  {
    text: String,
    placeholder: String,
  },
);

export type AtTextareaProps = ExtractPropTypes<typeof atTextareaProps>;

export default defineComponent({
  name,

  props: atTextareaProps,

  emits: ['onTributeActiveTrue'],

  setup(props, { emit, slots }) {
    console.log('slots:', slots, emit);

    const textareaRef = ref();
    // const contentValue = ref('sdfa <span contenteditable="false">@Fluffy Croutons</span>&nbsp;safjla');
    const defaultValue = `sdfa <span contenteditable="false">@Fluffy Croutons</span>&nbsp;safjla`;

    const getDataOfEditorMultiple = () => {
      const childrenData = textareaRef.value?.innerHTML;
      console.log('childrenData', childrenData);
      const toServiceData = htmlEscape(childrenData);
      console.log('toServiceData', toServiceData);
    };

    const tribute = new Tribute({
      trigger: '@',
      // menuContainer:
      selectClass: 'highlight',
      containerClass: 'attextarea-container',
      itemClass: 'attextarea-menu__item',
      // fillAttr: 'value',
      // lookup: 'name',
      requireLeadingSpace: false,

      values: [
        { name: 'Howard Johnson', occupation: 'Panda Wrangler', age: 27 },
        { name: 'Fluffy Croutons', occupation: 'Crouton Fluffer', age: 32 },
      ],
      selectTemplate: function (item) {
        console.log('st:', item);
        return `<span contenteditable="false">@${item.original.name}</span>`;
      },
      menuItemTemplate: function (item) {
        console.log('mt:', item);
        return `<span class="attextarea-menu-item">${item.original.name}</span>`;
      },
      noMatchTemplate: function () {
        return '<span style:"visibility: hidden;"></span>';
      },
      searchOpts: {
        pre: '<span class="jxl">',
        post: '</span>',
        skip: false, // true will skip local search, useful if doing server-side search
      },
    });
    const onTributeActiveTrue = (event: any) => {
      console.log('Menu opened!', event);
      getDataOfEditorMultiple();
    };
    onMounted(() => {
      tribute.attach(textareaRef.value);
    });
    onBeforeUnmount(() => {
      if (tribute) {
        tribute.detach(textareaRef.value);
      }
    });
    return () => {
      const { placeholder } = props;
      const showPlaceholder = placeholder || '输入内容@某人';
      return (
        <div
          placeholder={showPlaceholder}
          ref={textareaRef}
          class={'attextarea'}
          onTribute-active-true={onTributeActiveTrue}
          v-html={defaultValue}
        ></div>
      );
    };
  },
});
