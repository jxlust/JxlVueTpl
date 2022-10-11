import { InjectionKey } from 'vue';
import './index.scss';

export const ROW_GAP = 10;
export const AUTO_ROWA = 1;

export type WaterBoxProvide = {
  props: any,
  updateStatus: (v: any) => void
}
export const WATER_BOX_KEY: InjectionKey<WaterBoxProvide> =
  Symbol('water-box');

export default defineComponent({
  name: 'water-box',
  emits: ['first-end'],
  setup(_, { slots, emit }) {
    console.log('childs:', slots.default?.())
    let childsAllKeys = [];
    if (slots.default && slots.default()[0].children?.length) {
      childsAllKeys = (slots.default()[0].children as any).map(item => item.id);
    }
    const loadEndKeys: any = [];
    const updateStatus = (v: any) => {
      console.log('update status:', v)
      loadEndKeys.push(v);

      if (childsAllKeys.length === loadEndKeys.length) {
        //更新完成
        console.log('更新完成。。。')
        emit('first-end')
      }
    }
    provide(WATER_BOX_KEY, {
      props: 1,
      updateStatus
    })

    return () => (
      <div class={'box water-wall'}>
        {slots.default?.()}
      </div>
    )
  }
})
