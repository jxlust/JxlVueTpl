import { defineComponent, createApp, Component, render, VNode } from 'vue'
import './index.scss'
const ColorButton = defineComponent({
  props: {
    text: String,
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    const number = ref(1)
    const handleClick = () => {
      number.value++
      emit('click', number.value)
    }
    return () => (
      <div class={'color-button'}>
        <button class={'color-button__jbutton'} onClick={handleClick}>
          {props.text}
        </button>
        <span class={'color-button__number'}>{number.value}</span>
        {slots.default?.()}
        <span class={'color-button__heart'}></span>
      </div>
    )
  },
})

let isFristRender = true
const renderFunByCreateApp = (comp: Component, mountDom: Element) => {
  //way1
  const app = createApp(comp)
  const container = document.createElement('div') as HTMLDivElement
  container.className = 'my-top-wrapper'
  app.mount(container)
  mountDom.appendChild(container)
}

const renderFunByRender = (comp: VNode, mountDom: Element) => {
  //way2
  const container = document.createElement('div') as HTMLDivElement
  container.className = 'my-bottom-wrapper'
  render(comp, container)
  mountDom.appendChild(container)
}
const showText = ref('zhangsan')
export const renderColorButton = (text: string, onClick: any, mountDom: any = document.body) => {
  // const vNode = h(ColorButton,{
  //   [key]: [value]
  // },null)
  // h, createApp, render 三兄弟
  if (isFristRender) {
    const myButton = (
      <ColorButton text={text} onClick={onClick}>
        <span>我是传入到插槽的内容{showText.value}</span>
      </ColorButton>
    )
    renderFunByCreateApp(myButton, mountDom)
    renderFunByRender(myButton, mountDom)
    isFristRender = false
  }
  showText.value = 'jxl' + ((Math.random() * 10) | 0)
}
export const updateColorButtonText = (text: string) => {
  showText.value = text
}
