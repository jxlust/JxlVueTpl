import { createVNode, render } from 'vue'

//对象组件
const Message1 = {
  setup(props) {
    console.log('props:', props)
    const text = ref('1')
    const onInput = (e: Event) => {
      const target = e.target as HTMLInputElement
      text.value = target.value
      //这里会自动更新页面数据
    }
    return () => (
      <div>
        <span>{text.value}</span>
        <span>弹框1</span>
        <input type="text" onInput={onInput} />
      </div>
    )
  },
}

//函数组件
const text2 = ref('我是个function')
const Message2 = (props, content) => {
  console.log('message2 props:', props, content)
  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    text2.value = target.value
    //这里居然不会触发更新
    //把数据提升到全局就生效了
  }
  return (
    <div>
      <span>{text2.value}</span>
      <span>弹框2</span>
      <input type="text" onInput={onInput} />
    </div>
  )
}

//vue3
const Message3 = defineComponent({
  props: {
    title: String,
  },
  emits: ['change'],
  setup(props, { slots }) {
    const text = ref('3')
    const onInput = (e: Event) => {
      const target = e.target as HTMLInputElement
      text.value = target.value
      //这里居然不会触发更新
      //把数据提升到全局就生效了
    }
    return () => (
      <div>
        <span>title:{props.title}</span>
        <span>{text.value}</span>
        {slots.default?.()}
        <span>弹框3</span>
        <input type="text" onInput={onInput} />
      </div>
    )
  },
})

//vue3 render
export const Message4 = {
  title: '',
  setup(props) {
    const number = ref(0)
    number.value++
    const render = () => {
      return (
        <span>
          {props.title}- {number.value}
        </span>
      )
    }
    ;(getCurrentInstance() as any).render = render
    return {
      number,
    }
  },
}

export const openDialog1 = () => {
  const vm = createVNode(Message1)
  // 创建容器，也可以用已经存在的
  const container = document.createElement('div') as HTMLDivElement
  //render通过patch 变成dom
  render(vm, container)
  // 弹窗挂到任何你想去的地方
  document.body.appendChild(container)
}

export const openDialog2 = () => {
  const vm = createVNode(<Message2 data="123" />)
  const container = document.createElement('div') as HTMLDivElement
  render(vm, container)
  document.body.appendChild(container)
}

export const openDialog3 = () => {
  const vm = createVNode(<Message3 title="123">插槽内容</Message3>)
  const container = document.createElement('div') as HTMLDivElement
  render(vm, container)
  document.body.appendChild(container)
}
