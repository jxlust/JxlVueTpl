import TsxA from './TsxA';

export default defineComponent({
  name: 'TsxSlot1',
  setup(_, {}) {
    const renderDefault = (val: number) => <span>tsx 4 render function {val}</span>;
    // const renderBarSlots = {
    //   default: renderDefault,
    //   bar: (val: number) => <i>bar: {val}</i>,
    // };
    return () => (
      <TsxA>
        {renderDefault}
        {/* {renderBarSlots} */}
      </TsxA>
    );
  },
});
