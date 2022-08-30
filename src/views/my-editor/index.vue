<template>
  <div style="border: 1px solid #ccc" v-if="false">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>

  <div class="margin">
    <AtTextarea text="sss" />
  </div>
</template>

<script lang="ts" setup>
  import '@wangeditor/editor/dist/css/style.css'; // 引入 css

  import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import { Boot } from '@wangeditor/editor';
  import { MySelectMenu } from './MySelect';

  import AtTextarea from '@/components/at-textarea/AtTextarea';

  const selectMenuConf = {
    key: 'select-menu', // 定义 menu key ：要保证唯一、不重复（重要）
    factory() {
      return new MySelectMenu();
    },
  };

  // const module: Partial<IModuleConf> = {   // TS 语法
  //   menus: [menu1Conf, menu2Conf, menu3Conf],
  //   // 其他功能，下文讲解...
  // }
  // Boot.registerModule(module)

  Boot.registerMenu(selectMenuConf);

  const mode = 'default'; // 或 'simple'

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();

  // 内容 HTML
  const valueHtml = ref('<p>hello</p>');

  // 模拟 ajax 异步获取内容
  onMounted(() => {
    setTimeout(() => {
      valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
    }, 1500);
  });

  const toolbarConfig = {
    // toolbarKeys: [],
    insertKeys: {
      index: 1, // 插入的位置，基于当前的 toolbarKeys
      keys: ['select-menu'],
    },
  };
  const editorConfig = { placeholder: '请输入内容...' };

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });

  const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  };
</script>
