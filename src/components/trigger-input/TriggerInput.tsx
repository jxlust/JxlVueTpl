//ts-ignore
import { ExtractPropTypes, ref, watch, toRaw } from 'vue';
import Tribute from 'tributejs';
import { useExpose } from '@/hooks';
import { extend, makeArrayProp } from '@/utils';
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
export type LabelItemType = {
  name: string;
  value: string;
  code: string;
};
// Object.assign({},{a:1})
const atTextareaProps = extend(
  {},
  {
    text: String,
    placeholder: String,
    lists: makeArrayProp<LabelItemType>(),
  },
);

export type AtTextareaProps = ExtractPropTypes<typeof atTextareaProps>;

export default defineComponent({
  name,

  props: atTextareaProps,

  emits: ['change'],

  setup(props, { emit, slots }) {
    console.log('slots:', slots, emit);
    let values: LabelItemType[] = toRaw(props.lists);
    const textareaRef = ref();

    watch(
      () => props.lists,
      (newV: any) => {
        values = toRaw(newV);
        tribute && tribute.append(0, values, true);
      },
    );
    // watch(
    //   () => props.text,
    //   (newV: string) => {
    //     console.log("text watch:", newV);
    //   },
    // );

    const getDataOfEditorMultiple = () => {
      const childrenData = getHtmlOfEditorMultiple();
      const toServiceData = htmlEscape(childrenData);
      return toServiceData;
    };
    const getNodeListOfEditor = () => {
      const nodes = textareaRef.value?.childNodes;
      return nodes;
    };
    const clearEditorContent = () => {
      textareaRef.value.innerHTML = '';
    };

    const getHtmlOfEditorMultiple = () => {
      const childrenData = textareaRef.value?.innerHTML;
      return childrenData;
    };

    const tribute = new Tribute({
      trigger: '{',
      // menuContainer: dom
      selectClass: 'highlight',
      containerClass: 'trigger-container',
      itemClass: 'trigger-container__item',
      requireLeadingSpace: false,
      lookup: 'name',
      fillAttr: 'name',
      values: values,
      selectTemplate: function (item) {
        console.log('selectTemplate:', item);
        return `<span class="trigger-value" data-code="${item.original.code}" data-value="${item.original.value}" contenteditable="false">{${item.original.name}}</span>`;
      },
      // menuItemTemplate: function (item) {
      //   return `<span class="trigger-menu-item">${item.original.name}</span>`;
      // },
      noMatchTemplate: function () {
        return '<span style:"visibility: hidden;"></span>';
      },
      // searchOpts: {
      //   pre: '<span class="xxx">',
      //   post: "</span>",
      //   skip: false, // true will skip local search, useful if doing server-side search
      // },
    });
    const onTributeActiveTrue = (event: any) => {
      console.log('Menu opened!', event);
    };
    onMounted(() => {
      tribute.attach(textareaRef.value);
    });
    onBeforeUnmount(() => {
      if (tribute) {
        tribute.detach(textareaRef.value);
      }
    });

    useExpose({ getDataOfEditorMultiple, getHtmlOfEditorMultiple, getNodeListOfEditor, clearEditorContent });
    return () => {
      console.log(99999, props.text);
      const { placeholder, text } = props;
      const showPlaceholder = placeholder || '输入规则内容';
      const defaultText = text || '';
      return (
        <div
          placeholder={showPlaceholder}
          ref={textareaRef}
          class={'trigger-textarea'}
          onTribute-active-true={onTributeActiveTrue}
          v-html={defaultText}
        ></div>
      );
    };
  },
});
