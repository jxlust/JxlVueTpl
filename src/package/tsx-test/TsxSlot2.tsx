import TsxA from './TsxA';

export default defineComponent({
  name: 'TsxSlot1',
  setup(_, {}) {
    const slots = {
      default: () => <span>use2</span>,
      bar: (val: number) => <span>use slots2--{val}</span>,
    };
    return () => <TsxA>{slots}</TsxA>;
  },
});
