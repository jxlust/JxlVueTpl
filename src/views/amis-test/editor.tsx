// import 'amis/lib/themes/ang.css'
// import 'amis/lib/themes/cxd.css'
// import 'amis/lib/themes/dark.css'
// import 'amis/lib/themes/default.css'
// import 'amis/lib/helper.css'
// import 'amis/sdk/sdk.css'
// import 'amis-editor/dist/style.css'
// import 'amis/sdk/sdk.js'

import { BasePlugin } from 'amis-editor'
import { Editor } from 'amis-editor'
import { ReactInVue } from 'vuera'

class MyRendererPlugin extends BasePlugin {
  rendererName = 'my-renderer'

  // 暂时只支持这个，配置后会开启代码编辑器
  $schema = '/schemas/UnkownSchema.json'

  // 用来配置名称和描述
  name = '自定义渲染器'
  description = '这只是个示例'

  // tag，决定会在哪个 tab 下面显示的
  tags = ['自定义', '表单项']

  // 图标
  icon = 'fa fa-user'

  // 用来生成预览图的
  previewSchema = {
    type: 'my-renderer',
    target: 'demo',
  }

  // 拖入组件里面时的初始数据
  scaffold = {
    type: 'my-renderer',
    target: '233',
  }

  // 右侧面板相关
  panelTitle = '自定义组件'
  panelControls = [
    {
      type: 'tabs',
      tabsMode: 'line',
      className: 'm-t-n-xs',
      contentClassName: 'no-border p-l-none p-r-none',
      tabs: [
        {
          title: '常规',
          controls: [
            {
              name: 'target',
              label: 'Target',
              type: 'text',
            },
          ],
        },

        {
          title: '外观',
          controls: [],
        },
      ],
    },
  ]
}
const myPlugins = [MyRendererPlugin]

export default defineComponent({
  name: 'MyEditor',
  setup() {
    const MyVueEditor = ReactInVue(Editor)
    return () => <MyVueEditor />
  },
})
