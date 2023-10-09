<template>
  <div>
    <MyAmisRender :amisjson="amisJson3" />

    <div>
      <p>render:</p>
      <div ref="testRef"></div>
    </div>
    <!-- <MyEditor /> -->
  </div>
</template>

<script setup lang="ts">
  import MyAmisRender from './compoents/MyRender'
  import MyEditor from './editor'
  import Mybutton from './compoents/MyButton'
  import { createApp, render, h, ref } from 'vue'

  const testRef = ref()
  const vnode1 = h(Mybutton, {
    a: 100,
  })
  const app2 = createApp(Mybutton)
  console.log('22:', app2)
  setTimeout(() => {
    console.log('testRef.value:', testRef.value)
    app2.mount(testRef.value)
  }, 1000)

  console.log('vnode1:', vnode1)

  // @ts-ignore
  let amis = amisRequire('amis/embed')
  // @ts-ignore
  let amisLib = amisRequire('amis')
  // @ts-ignore
  let React = amisRequire('react')

  // 自定义组件，props 中可以拿到配置中的所有参数，比如 props.label 是 'Name'
  function CustomComponent(props) {
    let dom = React.useRef(null)
    React.useEffect(function () {
      // 从这里开始写自定义代码，dom.current 就是新创建的 dom 节点
      // 可以基于这个 dom 节点对接任意 JavaScript 框架，比如 jQuery/Vue 等
      // dom.current.innerHTML = ` <el-button @click="visible = true">Button</el-button>
      // <el-dialog :visible.sync="visible" title="Hello world">
      //   <p>Try Element</p>
      // </el-dialog> `
      // // 而 props 中能拿到这个
      // new Vue({
      //   el: dom.current,
      //   data: function () {
      //     return { visible: false }
      //   },
      // })

      const app = createApp(Mybutton)
      console.error('1', app)
      app.unmount()
      app.mount(dom.current)
      // dom.current.appendChild(container)
    })
    return React.createElement('div', {
      ref: dom,
    })
  }

  //注册自定义组件，请参考后续对工作原理的介绍
  amisLib.Renderer({
    test: /(^|\/)my-custom2/,
  })(CustomComponent)

  const amisJson3 = {
    type: 'page',
    title: '表单页面',
    body: {
      type: 'form',
      mode: 'horizontal',
      api: '/saveForm',
      body: [
        {
          label: 'Name',
          type: 'my-custom2', // 注意这个的 type 对应之前注册的 test
          name: 'custom',
        },
      ],
    },
  }
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
