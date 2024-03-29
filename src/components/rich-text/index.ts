import {
  Boot,
  IButtonMenu,
  DomEditor,
  IDomEditor,
  IModuleConf,
  SlateElement,
  SlateDescendant,
} from '@wangeditor/editor'
import { h, VNode } from 'snabbdom'

class MyLinkMenu implements IButtonMenu {
  title: string
  iconSvg?: string | undefined
  hotkey?: string | undefined
  alwaysEnable?: boolean | undefined
  tag: string
  width?: number | undefined

  constructor() {
    this.title = '自定义链接' // 自定义菜单标题
    this.iconSvg =
      '<svg viewBox="0 0 1024 1024"><path d="M440.224 635.776a51.84 51.84 0 0 1-36.768-15.232c-95.136-95.136-95.136-249.92 0-345.056l192-192C641.536 37.408 702.816 12.032 768 12.032s126.432 25.376 172.544 71.456c95.136 95.136 95.136 249.92 0 345.056l-87.776 87.776a51.968 51.968 0 1 1-73.536-73.536l87.776-87.776a140.16 140.16 0 0 0 0-197.984c-26.432-26.432-61.6-40.992-99.008-40.992s-72.544 14.56-99.008 40.992l-192 192a140.16 140.16 0 0 0 0 197.984 51.968 51.968 0 0 1-36.768 88.768z"></path><path d="M256 1012a242.4 242.4 0 0 1-172.544-71.456c-95.136-95.136-95.136-249.92 0-345.056l87.776-87.776a51.968 51.968 0 1 1 73.536 73.536l-87.776 87.776a140.16 140.16 0 0 0 0 197.984c26.432 26.432 61.6 40.992 99.008 40.992s72.544-14.56 99.008-40.992l192-192a140.16 140.16 0 0 0 0-197.984 51.968 51.968 0 1 1 73.536-73.536c95.136 95.136 95.136 249.92 0 345.056l-192 192A242.4 242.4 0 0 1 256 1012z"></path></svg>' // 可选
    this.tag = 'button'
  }

  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(editor: IDomEditor): string | boolean {
    return ''
  }

  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(editor: IDomEditor): boolean {
    return false
  }

  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(editor: IDomEditor): boolean {
    return false
  }

  // 点击菜单时触发的函数
  exec(editor: IDomEditor, value: string | boolean) {
    if (this.isDisabled(editor)) return
    editor.emit('mylink-menu-click')
  }
}

const myLinkMenuConf = {
  key: 'mylink-menu',
  factory() {
    return new MyLinkMenu()
  },
}

/**
 * 定义一个插件，重写 isInline 和 isVoid API
 * @param editor
 * @returns
 */
export function withVoidMyLinkCheck<T extends IDomEditor>(editor: T) {
  const { isVoid, isInline } = editor
  const newEditor = editor

  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'mylinktype') return true // 针对 type: attachment ，设置为 inline
    return isInline(elem)
  }

  newEditor.isVoid = (elem) => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'mylinktype') return true // 针对 type: attachment ，设置为 void
    return isVoid(elem)
  }
  return newEditor // 返回 newEditor
}

/**
 * 渲染自定义链接元素到编辑器
 * @param elem 元素，即上文的 myResume
 * @param children 元素子节点，void 元素可忽略
 * @param editor 编辑器实例
 * @returns vnode 节点（通过 snabbdom.js 的 h 函数生成）
 */
export function renderMyLinkDom(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
  // 获取“附件”的数据，参考上文 myResume 数据结构
  const { dataId = '', href = '', content = '' }: any = elem

  const attrs: any = {}
  if (dataId) {
    attrs.dataId = dataId
  }
  if (href) {
    attrs.href = href
  }

  // 附件元素 vnode
  const attachVnode = h(
    // HTML tag
    'a',
    // HTML 属性、样式、事件
    {
      props: { contentEditable: false }, // HTML 属性，驼峰式写法
      attrs: attrs,
      // style: { display: 'inline-block', marginLeft: '3px', /* 其他... */ }, // style ，驼峰式写法
      on: {
        click(e) {
          e.preventDefault()
          e.stopPropagation()
          editor.emit('mylink-click', elem)
          console.log('clicked', content)
        },
      },
    },
    // 子节点
    [content],
  )

  return attachVnode
}

/**
 * 渲染了自定义类型到编辑器，但是获取getHtml还是获取不到，需要定义 elemToHtml 函数
 * 生成链接元素的 HTML
 * @param elem 元素，即上文的 myResume
 * @param childrenHtml 子节点的 HTML 代码，void 元素可忽略
 * @returns 元素的 HTML 字符串
 */
function myLinkTypeToHtml(elem: SlateElement, childrenHtml: string): string {
  // dataId: 111,
  // href: 'http://www',
  // content: '我是插入的链接',
  // 获取元素的数据
  const { dataId = '', href = '', content = '' }: any = elem

  // 生成 HTML 代码
  const html = `<a data-w-e-type="mylinktype" data-w-e-is-void data-w-e-is-inline data-id="${dataId}" ${
    href && `href="${href}"`
  } target="_blank" >${content}</a>`

  return html
}

/**
 * 解析 HTML 字符串，生成元素
 * @param domElem HTML 对应的 DOM Element
 * @param children 子节点
 * @param editor editor 实例
 * @returns 元素，如上文的 myResume
 */
function parseMylinkTypeHtml(
  domElem: HTMLAnchorElement,
  children: SlateDescendant[],
  editor: IDomEditor,
): SlateElement {
  // 从 DOM element 中获取自定义链接的信息
  const dataId = domElem.getAttribute('data-id') || ''
  const href = domElem.getAttribute('href') || ''
  const content = domElem?.innerText || ''
  // 生成链接元素（按照此前约定的数据结构）
  const myResume = {
    type: 'mylinktype',
    href,
    dataId,
    content,
    children: [{ text: '' }], // void node 必须有 children ，其中有一个空字符串，重要！！！
  }

  return myResume
}

// 自定义元素类型配置
const renderElemConf: any = {
  // 新元素type
  type: 'mylinktype',
  renderElem: renderMyLinkDom,
}
// 元素转成html 提供给getHtml方法获取
const elemToHtmlConf = {
  type: 'mylinktype', // 新元素的 type ，重要！！！
  elemToHtml: myLinkTypeToHtml,
}
// 解析自定义元素配置 解析到编辑器
const parseHtmlConf = {
  selector: 'a[data-w-e-type="mylinktype"]', // CSS 选择器，匹配特定的 HTML 标签
  parseElemHtml: parseMylinkTypeHtml,
}
// 所有自定义模块
const allModules: Partial<IModuleConf> = {
  menus: [myLinkMenuConf],
  editorPlugin: withVoidMyLinkCheck,
  renderElems: [renderElemConf],
  elemsToHtml: [elemToHtmlConf],
  parseElemsHtml: [parseHtmlConf],
}

// 注册模块
Boot.registerModule(allModules)
