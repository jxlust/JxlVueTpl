/**
 * tsx 组件 demo
 */
import { defineComponent, PropType, reactive, onMounted, onUnmounted } from 'vue';
// import logoImg from '@/assets/logo.png'
interface VisualEditorBlockData {
  text?: string;
}
interface MyMsg {
  text?: string;
  id: number;
}
import TextOver from '@/components/text/TextOver.vue';
import './index.scss';
export default defineComponent({
  name: 'CompRender',
  props: {
    msgObj: {
      type: Object as PropType<VisualEditorBlockData>,
      default: () => ({}),
    },
  },
  setup(props) {
    console.log('props:', props);
    const msgList = reactive<Array<MyMsg>>([]);
    const contentText = ref(
      '其实本文适用的范围不仅仅局限于前端，而是适用于所有使用了 git 作为版本控制的项目。其实本文适用的范围不仅仅局限于前端，而是适用于所有使用了 git 作为版本控制的项目。例如安卓、ios、Java 等等。只是本文选择了前端项目作为示例。',
    );
    const loadData = () => {
      msgList.push(
        {
          text: 'test1',
          id: 1,
        },
        {
          text: 'test2',
          id: 2,
        },
      );
    };
    onMounted(() => {});
    onUnmounted(() => {});
    const messageDom = () => {
      loadData();
      if (msgList.length > 0) {
        return (
          <ul class="message-block">
            {msgList.map((item: MyMsg) => (
              <li>{item.text}</li>
            ))}
          </ul>
        );
      } else {
        return '无数据';
      }
    };
    const logoImg = new URL('../../assets/logo.png', import.meta.url).href;

    return () => (
      <div class="tsx-block">
        <TextOver text={contentText.value}></TextOver>
        {messageDom()}
        <img src={logoImg} />
      </div>
    );
  },
});
