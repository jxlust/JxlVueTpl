import './index.scss'

export const ROW_GAP = 10
export const AUTO_ROWA = 1

export default defineComponent({
  name: 'WaterBox',
  setup(_, { slots }) {
    return () => <div class={'box water-wall'}>{slots.default?.()}</div>
  },
})
