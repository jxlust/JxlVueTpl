<template>
  <div class="scheduler-page performance-home flex-grid">
    <div class="flex-grid-left" ref="stencilRef"> </div>
    <div class="flex-grid-right" ref="graphRef"> </div>
  </div>
</template>
<script lang="ts" setup>
  import './index.scss'

  import { ZoomOut, ZoomIn } from '@element-plus/icons-vue'
  import { useDebounceFn } from '@vueuse/core'
  import { Graph, Path, Shape, Platform } from '@antv/x6'
  // 插件 键盘监听事件
  import { Keyboard } from '@antv/x6-plugin-keyboard'
  // 拖拽事件
  import { Dnd } from '@antv/x6-plugin-dnd'
  import { Stencil } from '@antv/x6-plugin-stencil'
  import { Transform } from '@antv/x6-plugin-transform'
  import { Selection } from '@antv/x6-plugin-selection'
  import { Snapline } from '@antv/x6-plugin-snapline'
  import { Clipboard } from '@antv/x6-plugin-clipboard'
  import { History } from '@antv/x6-plugin-history'
  import { register } from '@antv/x6-vue-shape'

  // #region 初始化图形
  const ports = {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
    },
    items: [
      {
        group: 'top',
      },
      {
        group: 'right',
      },
      {
        group: 'bottom',
      },
      {
        group: 'left',
      },
    ],
  }

  // 注册一些自定义节点
  Graph.registerNode(
    'custom-rect',
    {
      inherit: 'rect',
      width: 66,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          fontSize: 12,
          fill: '#262626',
        },
      },
      ports: { ...ports },
    },
    true,
  )

  Graph.registerNode(
    'custom-polygon',
    {
      inherit: 'polygon',
      width: 66,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          fontSize: 12,
          fill: '#262626',
        },
      },
      ports: {
        ...ports,
        items: [
          {
            group: 'top',
          },
          {
            group: 'bottom',
          },
        ],
      },
    },
    true,
  )

  Graph.registerNode(
    'custom-circle',
    {
      inherit: 'circle',
      width: 45,
      height: 45,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          fontSize: 12,
          fill: '#262626',
        },
      },
      ports: { ...ports },
    },
    true,
  )

  Graph.registerNode(
    'custom-image',
    {
      inherit: 'rect',
      width: 52,
      height: 52,
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#5F95FF',
          fill: '#5F95FF',
        },
        image: {
          width: 26,
          height: 26,
          refX: 13,
          refY: 16,
        },
        label: {
          refX: 3,
          refY: 2,
          textAnchor: 'left',
          textVerticalAnchor: 'top',
          fontSize: 12,
          fill: '#fff',
        },
      },
      ports: { ...ports },
    },
    true,
  )

  const graphRef = ref<HTMLDivElement>()
  const stencilRef = ref<HTMLDivElement>()
  let graph: Graph | null = null

  const initGraph = () => {
    // 初始化画布
    graph = new Graph({
      container: graphRef.value,
      grid: true,
      mousewheel: {
        // 是否开启滚轮缩放交互
        enabled: true,
        // 滚动缩放因子 默认 1.2
        factor: 1.2,
        maxScale: 1.5,
        minScale: 0.5,
        // 是否将鼠标位置作为中心缩放、默认为true
        zoomAtMousePosition: true,
        // 按下什么键 才会缩放
        modifiers: ['ctrl', 'meta'],
        // 判断什么情况下 滚轮事件被处理
        // guard: false,
      },
      connecting: {
        router: 'manhattan',
        connector: {
          name: 'rounded',
          args: {
            radius: 8,
          },
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        snap: {
          radius: 20,
        },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 2,
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8,
                },
              },
            },
            zIndex: 0,
          })
        },
        validateConnection({ targetMagnet }) {
          return !!targetMagnet
        },
      },
      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#5F95FF',
              stroke: '#5F95FF',
            },
          },
        },
      },
    })

    // 支持拖拽
    // const dndObj = new Dnd({
    //   target: graph,
    //   scaled: false,
    //   getDragNode: (node) => node.clone({ keepId: true }),
    //   getDropNode: (node) => node.clone({ keepId: true }),
    // })

    // #region 使用插件
    graph
      .use(
        new Transform({
          resizing: true,
          rotating: true,
        }),
      )
      .use(
        new Selection({
          rubberband: true,
          showNodeSelectionBox: true,
        }),
      )
      .use(new Snapline())
      .use(new Keyboard())
      .use(new Clipboard())
      .use(new History())

    graph && initStencil(graph)
    initGraphEvent(graph)
  }

  const initStencil = (graphObj: Graph) => {
    const stencil = new Stencil({
      title: '流程图',
      target: graphObj,
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      collapsable: true,
      groups: [
        {
          title: '基础流程图',
          name: 'group1',
        },
        {
          title: '系统设计图',
          name: 'group2',
          graphHeight: 250,
          layoutOptions: {
            rowHeight: 70,
          },
        },
      ],
      layoutOptions: {
        columns: 2,
        columnWidth: 80,
        rowHeight: 55,
      },
    })

    stencilRef.value && stencilRef.value.appendChild(stencil.container)

    addNodeToStencil(graphObj, stencil)
  }

  const addNodeToStencil = (graph, stencil) => {
    const r1 = graph.createNode({
      shape: 'custom-rect',
      label: '开始',
      attrs: {
        body: {
          rx: 20,
          ry: 26,
        },
      },
    })
    const r2 = graph.createNode({
      shape: 'custom-rect',
      label: '过程',
    })
    const r3 = graph.createNode({
      shape: 'custom-rect',
      attrs: {
        body: {
          rx: 6,
          ry: 6,
        },
      },
      label: '可选过程',
    })
    const r4 = graph.createNode({
      shape: 'custom-polygon',
      attrs: {
        body: {
          refPoints: '0,10 10,0 20,10 10,20',
        },
      },
      label: '决策',
    })
    const r5 = graph.createNode({
      shape: 'custom-polygon',
      attrs: {
        body: {
          refPoints: '10,0 40,0 30,20 0,20',
        },
      },
      label: '数据',
    })
    const r6 = graph.createNode({
      shape: 'custom-circle',
      label: '连接',
    })
    stencil.load([r1, r2, r3, r4, r5, r6], 'group1')

    const imageShapes = [
      {
        label: 'Client',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg',
      },
      {
        label: 'Http',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg',
      },
      {
        label: 'Api',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg',
      },
      {
        label: 'Sql',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg',
      },
      {
        label: 'Clound',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg',
      },
      {
        label: 'Mq',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg',
      },
    ]
    const imageNodes = imageShapes.map((item) =>
      graph.createNode({
        shape: 'custom-image',
        label: item.label,
        attrs: {
          image: {
            'xlink:href': item.image,
          },
        },
      }),
    )
    stencil.load(imageNodes, 'group2')
  }

  const initGraphEvent = (graph) => {
    // #region 快捷键与事件
    graph.bindKey(['meta+c', 'ctrl+c'], () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.copy(cells)
      }
      return false
    })
    graph.bindKey(['meta+x', 'ctrl+x'], () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.cut(cells)
      }
      return false
    })
    graph.bindKey(['meta+v', 'ctrl+v'], () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 })
        graph.cleanSelection()
        graph.select(cells)
      }
      return false
    })

    // undo redo
    graph.bindKey(['meta+z', 'ctrl+z'], () => {
      if (graph.canUndo()) {
        graph.undo()
      }
      return false
    })
    graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
      if (graph.canRedo()) {
        graph.redo()
      }
      return false
    })

    // select all
    graph.bindKey(['meta+a', 'ctrl+a'], () => {
      const nodes = graph.getNodes()
      if (nodes) {
        graph.select(nodes)
      }
    })

    // delete
    graph.bindKey('backspace', () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.removeCells(cells)
      }
    })

    // zoom
    graph.bindKey(['ctrl+1', 'meta+1'], () => {
      const zoom = graph.zoom()
      if (zoom < 1.5) {
        graph.zoom(0.1)
      }
    })
    graph.bindKey(['ctrl+2', 'meta+2'], () => {
      const zoom = graph.zoom()
      if (zoom > 0.5) {
        graph.zoom(-0.1)
      }
    })

    // 控制连接桩显示/隐藏
    // const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
    //   for (let i = 0, len = ports.length; i < len; i += 1) {
    //     ports[i].style.visibility = show ? 'visible' : 'hidden'
    //   }
    // }

    graph.on('node:mouseenter', ({ node }) => {
      const ports = node.getPorts() || []
      console.log(node)
      console.log(ports)

      ports.forEach((port) => {
        node.setPortProp(port.id, 'attrs/circle/style', {
          visibility: 'visible',
        })
      })
      // showPorts(ports, true)
    })
    graph.on('node:mouseleave', ({ node }) => {
      const ports = node.getPorts() || []
      // showPorts(ports, false)
      ports.forEach((port) => {
        node.setPortProp(port.id, 'attrs/circle/style', {
          visibility: 'hidden',
        })
      })
    })
  }
  onMounted(() => {
    initGraph()
  })
</script>
<style lang="scss"></style>
