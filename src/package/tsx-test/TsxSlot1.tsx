import TsxA from './TsxA';

export default defineComponent({
  name: 'TsxSlot1',
  setup(_, {}) {
    const slots = {
      bar: (val: number) => <span>use slots1--{val}</span>,
    };
    return () => <TsxA v-slots={slots} />;
  },
});
