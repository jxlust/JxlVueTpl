const Component1 = (props) => {
  return <div {...props}>组件1</div>;
};

const Component2 = () => {
  return <div>组件2</div>;
};

export const RenderByType = (props, context) => {
  return props.type === 1 ? <Component1>{context.slots.default?.()}</Component1> : <Component2></Component2>;
};
