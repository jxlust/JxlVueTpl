<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
  import '@wangeditor/editor/dist/css/style.css' // 引入 css
  import { onBeforeUnmount, ref, shallowRef } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import { DomEditor, IToolbarConfig, SlateTransforms } from '@wangeditor/editor'
  // import { Editor, Range, Transforms } from 'slate'

  import './index'

  type InsertFnType = (url: string, alt: string, href: string) => void

  const props = defineProps({
    content: String,
    uploadUrl: String,
    isSimple: Boolean,
  })

  const emit = defineEmits(['update:content', 'mylink-menu-click', 'mylink-click'])
  const mode = 'default' // 或 'simple's
  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef()
  const valueHtml = ref(props.content)
  watch(
    () => props.content,
    (newV) => {
      valueHtml.value = newV
    },
  )
  const uploadImageConfig = {
    // server: '/api/upload',
    // 小于该值就插入 base64 格式（而不上传），默认为 0
    base64LimitSize: 5 * 1024, // 5kb,
    // form-data fieldName ，默认值 'wangeditor-uploaded-image'
    // fieldName: 'your-custom-name',
    // 单个文件的最大体积限制，默认为 2M
    maxFileSize: 1 * 1024 * 1024, // 1M
    // 最多可上传几个文件，默认为 100
    maxNumberOfFiles: 10,
    // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
    allowedFileTypes: ['image/*'],
    // 跨域是否传递 cookie ，默认为 false
    withCredentials: true,
    // 超时时间，默认为 10 秒
    timeout: 5 * 1000, // 5 秒
    // 自定义插入图片
    // customInsert(res: any, insertFn: InsertFnType) {
    //   // 从 res 中找到 url alt href ，然后插入图片
    //   const { url, alt, href } = res
    //   insertFn(url, alt, href)
    // },
    // 自定义上传
    async customUpload(file: File, insertFn: InsertFnType) {
      // file 即选中的文件
      // 自己实现上传，并得到图片 url alt href
      // 最后插入图片
      // axios ...
      // res
      console.log(1, file)
      const res = await new Promise((resolve) => setTimeout(resolve, 1000))
      // const { url, alt, href } = res
      const url =
          'https://img0.baidu.com/it/u=3021883569,1259262591&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1695229200&t=733e02dabbf031c81178cf9a860463fc',
        alt = 'h',
        href = 'https://www.baidu.com'
      insertFn(url, alt, href)
    },
  }
  const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: uploadImageConfig,
    },
  }
  const toolbarConfig: Partial<IToolbarConfig> = {
    insertKeys: {
      index: 0, // 插入的位置，基于当前的 toolbarKeys
      keys: ['mylink-menu'],
    },
    excludeKeys: ['emotion', 'group-video', 'todo', 'insertTable'],
  }
  if (props.isSimple) {
    toolbarConfig.toolbarKeys = [
      'bold',
      {
        key: 'group-more-style',
        title: '更多',
        iconSvg:
          '<svg viewBox="0 0 1024 1024"><path d="M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path></svg>',
        menuKeys: ['through', 'underline', 'italic'],
      },
      '|',
      'color',
      'bgColor',
      'fontSize',
      'lineHeight',
      '|',
      'bulletedList',
      'numberedList',
      'clearStyle',
    ]
  }
  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
  })

  const initEventListener = () => {
    editorRef.value.on('mylink-menu-click', () => {
      emit('mylink-menu-click')
    })
    editorRef.value.on('mylink-click', (data) => {
      emit('mylink-click', data)
    })
  }
  const handleCreated = (editor) => {
    //  editor 实例
    editorRef.value = editor
    console.log('keys:', editor.getAllMenuKeys())
    // 初始化监听事件
    initEventListener()
  }
  const handleChange = (editor) => {
    emit('update:content', valueHtml.value)
    const toolbar = DomEditor.getToolbar(editor)
    // console.log(toolbar, toolbar?.getConfig().toolbarKeys)
  }
  const setRichHtml = (html: string) => {
    editorRef.value.setHtml(html)
  }

  const insertMyLinkNode = (node: any) => {
    // 链接前后插入空格，方便操作
    // editorRef.value.insertNode(node)
    // editorRef.value.insertText(' ')

    // 还原选区
    // 还原选区
    editorRef.value.restoreSelection()
    editorRef.value.insertNode(node)
    editorRef.value.insertText('hh')
    // editorRef.value.insertFragment([{ text: ' ' }])
    editorRef.value.move(1)

    // SlateTransforms.insertNodes(editorRef.value, node)
    // https://github.com/wangeditor-team/wangEditor/issues/332
    // 不能直接使用 insertText, 会造成添加的空格被添加到链接文本中，参考上面 issue，替换为 insertFragment 方式添加空格
  }
  defineExpose({
    editorRef,
    setRichHtml,
    insertMyLinkNode,
  })
</script>

<style></style>
