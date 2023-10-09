<template>
  <!-- <MyAmisRender :amisjson="amisjson2"></MyAmisRender> -->
  <MyEditor />
</template>

<script setup lang="ts">
  import MyAmisRender from './compoents/MyRender'
  import MyEditor from './editor'
  const amisjson2 = {
    type: 'page',
    title: 'Hello world',
    body: [
      {
        type: 'tpl',
        tpl: '初始页面',
        wrapperComponent: '',
        inline: false,
        id: 'u:9315a7c3a187',
      },
      {
        type: 'container',
        body: [],
        style: {
          position: 'static',
          display: 'block',
        },
        size: 'none',
        wrapperBody: false,
        id: 'u:9b4d32f8e6ea',
      },
      {
        type: 'panel',
        title: '标题',
        body: [
          {
            type: 'tpl',
            tpl: '内容',
            wrapperComponent: '',
            inline: false,
            id: 'u:7e3a367dc288',
          },
        ],
        id: 'u:0ccd10a7b315',
      },
      {
        type: 'button',
        label: '按钮',
        onEvent: {
          click: {
            actions: [],
          },
        },
        id: 'u:7f24d607541a',
      },
      {
        type: 'my-renderer',
        target: '233',
        id: 'u:fcf39bc08996',
      },
      {
        type: 'my-renderer',
        target: '233',
        id: 'u:34a4504cbbc3',
      },
      {
        type: 'textarea',
        label: '多行文本',
        name: 'textarea',
        id: 'u:d86840f35473',
      },
      {
        type: 'editor',
        label: '代码编辑器',
        name: 'editor',
        id: 'u:394534ea0f7c',
      },
      {
        type: 'input-text',
        label: '文本',
        name: 'text',
        id: 'u:7a1ba00e1e5e',
      },
    ],
    id: 'u:c390b62a88cc',
  }
  const amisjson = {
    type: 'page',
    title: '表单页面',
    body: {
      type: 'form',
      mode: 'horizontal',
      api: '/saveForm',
      body: [
        {
          label: 'Name',
          type: 'input-text',
          name: 'name',
        },
        {
          label: 'Email',
          type: 'input-email',
          name: 'email',
        },
      ],
    },
  }
</script>

<style></style>
