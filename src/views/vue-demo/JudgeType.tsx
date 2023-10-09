const Component1 = (props) => {
  console.error(props.item, 1111)
  return <div {...props}>组件1</div>
}

const Component2 = () => {
  return <div>组件2</div>
}

export const RenderByType = (props, context) => {
  return props.type === 1 ? <Component1 item={999}>{context.slots.default?.()}</Component1> : <Component2></Component2>
}
