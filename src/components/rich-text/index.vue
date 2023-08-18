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
  import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  // import { Boot } from '@wangeditor/editor'
  import './index'

  const props = defineProps({
    content: String,
  })
  const emit = defineEmits(['update:content', 'mylink-menu-click', 'mylink-click'])
  const mode = 'default' // 或 'simple's
  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef()

  const valueHtml = ref(props.content)

  const editorConfig = { placeholder: '请输入内容...' }
  const toolbarConfig = {
    // toolbarKeys: [],
    insertKeys: {
      index: 1, // 插入的位置，基于当前的 toolbarKeys
      keys: ['mylink-menu'],
    },
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
    // 初始化监听事件
    initEventListener()
  }
  const handleChange = (editor) => {
    emit('update:content', valueHtml.value)
  }
  defineExpose({
    editorRef,
  })
</script>

<style></style>
