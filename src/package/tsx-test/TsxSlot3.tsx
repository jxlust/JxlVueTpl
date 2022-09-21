import TsxA from './TsxA';

export default defineComponent({
  name: 'TsxSlot1',
  setup(_, {}) {
    return () => (
      <TsxA>
        {{
          default: () => <span>use 3</span>,
          bar: (val: number) => <span>use slots 3--{val}</span>,
        }}
      </TsxA>
    );
  },
});
