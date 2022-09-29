const Component1 = () => {
  return <span>{currentState.current === '1' && <span>❀</span>} 美美</span>;
};

const Component2 = () => {
  return <span>{currentState.current === '2' && <span>❀</span>} 校长</span>;
};

const Component3 = () => {
  return <span>{currentState.current === '3' && <span>❀</span>} 老师</span>;
};

export const Component = (props, content) => {
  return (
    <span>
      {props.active && <span>❀</span>} {content.slots.default?.()}
    </span>
  );
};
const currentState = reactive({
  current: '1',
});
export const useMoreEventTools = () => {
  return [
    {
      title: '组件1',
      comp: <Component1></Component1>,
      onClick: () => {
        currentState.current = '1';
        console.log(1, currentState.current);
      },
    },
    {
      title: '组件2',
      comp: <Component2></Component2>,
      onClick: () => {
        currentState.current = '2';
        console.log(2, currentState.current);
      },
    },
    {
      title: '组件3',
      comp: <Component3></Component3>,
      onClick: () => {
        currentState.current = '3';
        console.log(3, currentState.current);
      },
    },
  ];
};
