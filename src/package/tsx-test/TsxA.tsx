export default defineComponent({
  name: 'TsxA',
  setup(props, { slots }) {
    console.log('props:', props);
    const value = 100;
    return () => (
      <div class={'a-wrap'}>
        <h1>{slots.default ? slots.default(999999) : 'h1'}</h1>
        <h2>{slots.bar?.(value)}</h2>
      </div>
    );
  },
});
