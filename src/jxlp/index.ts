import JButton from './Button'

// 按需引入
export { JButton }

const component = [JButton]

const JXLP = {
  install(App) {
    component.forEach((item) => {
      App.component(item.name, JButton)
    })
  },
}

export default JXLP
