/**
 * tsx 组件 demo
 */
import { defineComponent, PropType, reactive, onMounted, onUnmounted } from 'vue';
interface VisualEditorBlockData {
  text?: string;
}
interface MyMsg {
  text?: string;
  id: number;
}
import TextOver from '@/components/text/TextOver.vue';
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
    onMounted(() => {});
    onUnmounted(() => {});
    const messageDom = () => {
      if (msgList.length > 0) {
        return (
          <div class="message-block">
            {msgList.map((item: MyMsg) => (
              <li>{item.text}</li>
            ))}
          </div>
        );
      }
    };
    return () => (
      <div class="pd-nav">
        <TextOver text="我是hello HelloWorld"></TextOver>
        {messageDom()}
      </div>
    );
  },
});
