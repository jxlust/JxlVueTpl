<template>
  <div class="scheduler-page performance-home">
    <div class="top-toolbar">
      <span class="back-btn"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="task-info-block">
        <span>我是测试名称名称</span>
      </div>

      <div class="right-btn-groups">
        <div class="tips-btn"> 执行日志 </div>

        <div class="tips-btn">操作提示</div>

        <div class="btn-icon" @click="zoomOutClick">
          <el-icon>
            <ZoomOut />
          </el-icon>
        </div>
        <div class="btn-icon" @click="zoomInClick">
          <el-icon>
            <ZoomIn />
          </el-icon>
          <i class="el-icon-zoom-in"></i>
        </div>
        <el-button size="mini" plain :disabled="!canUndo" @click="handleUndo">撤销</el-button>
        <el-button size="mini" plain :disabled="!canRedo" @click="handleRedo">重做</el-button>
        <el-button size="mini" type="primary">执行</el-button>
        <el-button size="mini" type="primary">保存</el-button>
      </div>
    </div>
    <div class="drawerContent">
      <div class="drawerContent-left" id="toolbarContainer">
        <div class="group-search-block">
          <el-input
            size="small"
            v-model="groupKeyWords"
            clearable
            placeholder="请输入关键字搜索 "
            @input="debouncedQueryChange"
          />
        </div>
        <div class="group-list-container">
          <div v-for="g in selectGroupList" :key="g.id" class="group-list-item">
            <div class="dnd-rect" @mousedown="startDrag('group', $event, g)"></div>
            <span class="group-name">{{ g.groupName }}</span>
          </div>
          <div class="empty-tips" v-if="selectGroupList.length === 0"> 暂无数据 </div>
        </div>
      </div>
      <div class="drawerContent-right">
        <div ref="graphContainer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import './index.scss'
  import { ZoomOut, ZoomIn } from '@element-plus/icons-vue'
  import { useDebounceFn } from '@vueuse/core'
  import CustomVueNode from './custom-vue-node.vue'
  import { Graph, Path, Platform } from '@antv/x6'
  // 插件 键盘监听事件
  import { Keyboard } from '@antv/x6-plugin-keyboard'
  // 拖拽事件
  import { Dnd } from '@antv/x6-plugin-dnd'
  // import { Stencil } from "@antv/x6-plugin-stencil";
  import { Transform } from '@antv/x6-plugin-transform'
  import { Selection } from '@antv/x6-plugin-selection'
  import { Snapline } from '@antv/x6-plugin-snapline'
  import { Clipboard } from '@antv/x6-plugin-clipboard'
  import { History } from '@antv/x6-plugin-history'
  import { register } from '@antv/x6-vue-shape'
  // import insertCss from "insert-css";
  // import { deepClone } from "@/utils/deepClone.js";
  import { createNanoidBySize } from './x6-tools.js'
  const inOutPorts = {
    groups: {
      in: {
        position: 'left',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'transparent',
            strokeWidth: 1,
            fill: 'transparent',
          },
        },
      },
      // inTop: {
      //   position: "top",
      //   attrs: {
      //     circle: {
      //       r: 4,
      //       magnet: true,
      //       stroke: "transparent",
      //       strokeWidth: 1,
      //       fill: "transparent",
      //     },
      //   },
      // },
      out: {
        position: {
          name: 'right',
          args: {
            dx: 0,
          },
        },

        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'transparent',
            strokeWidth: 1,
            fill: 'transparent',
          },
        },
      },
      // outBottom: {
      //   position: {
      //     name: "bottom",
      //   },

      //   attrs: {
      //     circle: {
      //       r: 4,
      //       magnet: true,
      //       stroke: "transparent",
      //       strokeWidth: 1,
      //       fill: "transparent",
      //     },
      //   },
      // },
    },
  }

  register({
    shape: 'node-custom-group',
    width: 212,
    height: 48,
    component: CustomVueNode,
    // 定义链接桩
    ports: inOutPorts,
    data: {
      groupName: '',
      status: 1,
    },
  })

  // 注册连线
  Graph.registerConnector(
    'curveConnector',
    (sourcePoint, targetPoint) => {
      // console.log("xxxx:", sourcePoint, targetPoint);
      const hgap = Math.abs(targetPoint.x - sourcePoint.x)
      const diffX = targetPoint.x - sourcePoint.x
      const path = new Path()
      if (diffX > 50) {
        // 是正常从左往右链接
        path.appendSegment(Path.createSegment('M', sourcePoint.x - 4, sourcePoint.y))
        path.appendSegment(
          // 因为有个+号按钮，需要向右偏移一定距离
          Path.createSegment('L', sourcePoint.x + 12, sourcePoint.y),
        )
        // 水平三阶贝塞尔曲线
        path.appendSegment(
          Path.createSegment(
            'C',
            sourcePoint.x < targetPoint.x ? sourcePoint.x + hgap / 2 : sourcePoint.x - hgap / 2,
            sourcePoint.y,
            sourcePoint.x < targetPoint.x ? targetPoint.x - hgap / 2 : targetPoint.x + hgap / 2,
            targetPoint.y,
            targetPoint.x - 6,
            targetPoint.y,
          ),
        )
        path.appendSegment(Path.createSegment('L', targetPoint.x + 2, targetPoint.y))
      } else {
        // 右边往左边链接
        // move to (sx-4,sy)
        path.appendSegment(Path.createSegment('M', sourcePoint.x - 4, sourcePoint.y))
        // 三阶贝塞尔曲线
        path.appendSegment(
          Path.createSegment(
            'C',
            sourcePoint.x - hgap * 1,
            sourcePoint.y - 12,
            targetPoint.x - hgap * 1,
            targetPoint.y - 12,
            targetPoint.x - 6,
            targetPoint.y,
          ),
        )
        path.appendSegment(Path.createSegment('L', targetPoint.x + 2, targetPoint.y))
      }
      // console.log("path:", path.serialize());
      return path.serialize()
    },
    true,
  )

  Graph.registerEdge(
    'edge-custom-group',
    {
      markup: [
        {
          tagName: 'path',
          selector: 'wrap',
          attrs: {
            fill: 'none',
            cursor: 'pointer',
            stroke: 'transparent',
            strokeLinecap: 'round',
          },
        },
        {
          tagName: 'path',
          selector: 'line',
          attrs: {
            fill: 'none',
            pointerEvents: 'none',
          },
        },
        // {
        //   tagName: "path",
        //   groupSelector: "arrow",
        //   selector: "arrow1",
        // },
      ],
      // connector: { name: "curveConnector" },
      connector: { name: 'smooth' },

      // router: {
      //   // name: "er",
      //   name: "orth",
      //   args: {
      //     // offset: 24,
      //   },
      // },

      attrs: {
        wrap: {
          connection: true,
          strokeWidth: 10,
          strokeLinejoin: 'round',
        },
        line: {
          connection: true,
          stroke: '#A2B1C3',
          strokeWidth: 1,
          // targetMarker: {
          //   name: "classic",
          //   size: 6,
          // },

          // sourceMarker: {
          //   tagName: "path",
          //   d: "M 20 -10 0 0 20 10 Z",
          // },
          // targetMarker: 'classic',

          targetMarker: {
            tagName: 'path',
            fill: '#0069EB', // 使用自定义填充色
            stroke: '#0069EB', // 使用自定义边框色
            strokeWidth: 0,
            d: 'M 0 0 L 10 -5 L 7.5 0 L 10 5 Z',
          },
        },
        // arrow: {
        //   d: "M 0 -4 6 0 0 4 z",
        //   // d: "M 0 0 L 10 -5 L 7.5 0 L 10 5 Z",
        //   fill: "#0069EB",
        //   stroke: "#0069EB",
        //   pointerEvents: "none",
        // },
        // arrow1: {
        //   // atConnectionRatio: 将边中的指定元素移动到指定比例 [0, 1] 位置处，并自动旋转元素，
        //   // 使其方向与所在位置边的斜率保持一致。教程 https://x6.antv.vision/zh/docs/api/registry/attr#atconnectionratiokeepgradient
        //   atConnectionRatio: 0.5,
        // },
      },
    },
    true,
  )

  // 整个图对象
  let graphOut = null
  let dndObj = null

  const groupKeyWords = ref('')
  const selectGroupList = ref([])
  const editGroupData = ref({})
  const canRedo = ref(false)
  const canUndo = ref(false)
  const currentElement = ref({})

  const initGroupData = ref({
    groupName: '',
    status: 1,
  })
  const graphContainer = ref(null)

  const initGraph = () => {
    const containerElement = graphContainer.value
    if (!containerElement) return null

    graphOut = new Graph({
      container: containerElement,
      autoResize: true, // 大小自适应
      grid: true,
      magnetThreshold: 'onleave',
      panning: {
        enabled: true,
        magnetThreshold: 1,
        // 鼠标画布移动
        eventTypes: ['leftMouseDown'],
      },
      // 开启自动吸附
      // connecting: {
      //   // 距离节点或者连接桩 50 px 触发自动吸附
      //   snap: true,
      //   // 是否允许连接到画布空白位置的点
      //   allowBlank: false,
      //   // 是否允许创建循环连线
      //   allowLoop: false,
      //   // 拖动边时,是否高亮显示所有可用连接桩或节点
      //   highlight: true,
      //   connector: "algo-connector",
      //   connectionPoint: "anchor",
      //   anchor: "center",
      //   validateMagnet({ magnet }) {
      //     return magnet.getAttribute("port-group") !== "top";
      //   },
      //   createEdge() {
      //     return graphOut.createEdge({
      //       shape: "custom-vue-edge",
      //       attrs: {
      //         line: {
      //           strokeDasharray: "5 5",
      //         },
      //       },
      //       zIndex: -1,
      //     });
      //   },
      // },
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        allowMulti: false,
        highlight: true,
        sourceAnchor: {
          // name: "right",// left right center
          name: 'center',
          // args: {
          //   dx: Platform.IS_SAFARI ? 4 : 8,
          // },
        },
        targetAnchor: {
          name: 'center',
          // args: {
          //   dx: Platform.IS_SAFARI ? 4 : -8,
          // },
        },
        // connectionPoint: "anchor",
        createEdge(...args) {
          // console.log(1, args);
          return graphOut.createEdge({
            shape: 'edge-custom-group',
            attrs: {
              line: {
                strokeDasharray: '5 5',
                // stroke: "#1890ff",
                // strokeDasharray: 5,
                // targetMarker: "classic",
                // style: {
                //   animation: "ant-line 30s infinite linear",
                // },
              },
            },
            zIndex: 2,
          })
        },
        // 连接桩校验
        validateConnection({ sourceMagnet, targetMagnet, sourceCell, targetCell, ...others }) {
          // 只能从输出链接桩创建连接
          // allowMulti 属性已经设置了，这里不需要再判断
          //  @deprecated 得判断两个节点是否已经链接了线，不能重复连接
          // this graphOut
          // const isEdgeLine = this.isPredecessor(targetCell, sourceCell, {
          //   distance: 1,
          // });
          // // console.log(122, isEdgeLine);
          // if (isEdgeLine) {
          //   return false;
          // }

          if (!sourceMagnet || ['in', 'inTop'].includes(sourceMagnet.getAttribute('port-group'))) {
            return false
          }
          // 只能连接到输入链接桩
          if (!targetMagnet || !['in', 'inTop'].includes(targetMagnet.getAttribute('port-group'))) {
            return false
          }
          // console.log(1111, sourceMagnet, targetMagnet);
          // console.log(22, sourceCell, targetCell);
          // console.log(33, others);
          // 重点，连线成功，需要把目标节点存储的data里面parentKey赋值
          // targetCell.data.parentKey = sourceCell.data.groupKey;

          const groupKey = sourceCell.data.groupKey
          targetCell.setData({
            parentKey: groupKey,
          })

          return true
        },
      },
      highlighting: {
        // 连接桩可以被连接时在连接桩外围围渲染一个包围框
        magnetAvailable: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#A4DEB1',
              strokeWidth: 4,
            },
          },
        },
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#31d0c6',
              strokeWidth: 4,
            },
          },
        },
      },

      modes: {
        // default: ["drag-node"],
        default: ['node-custom-group'],
      },
      background: {
        color: '#F2F7FA',
      },
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
      connector: {
        name: 'rounded',
        args: {
          radius: 4,
        },
      },
    })

    // 支持拖拽
    dndObj = new Dnd({
      target: graphOut,
      scaled: false,
      getDragNode: (node) => node.clone({ keepId: true }),
      getDropNode: (node) => node.clone({ keepId: true }),
    })

    // const customNode = graphOut.addNode({
    //   id: createRandomId(),
    //   shape: "node-custom-group",
    //   x: 0,
    //   y: 100,
    //   ports: [
    //     {
    //       id: "node-0-out",
    //       group: "out",
    //     },
    //   ],
    // });

    // setInterval(() => {
    //   const { progress } = customNode.getData();
    //   customNode.setData({
    //     progress: +progress + 1,
    //   });
    // }, 1000);

    // 添加 plugin 插件
    graphOut
      .use(
        new Transform({
          resizing: {
            enabled: true,
            minHeight: 48,
            minWidth: 212,
          },

          // rotating: true,
        }),
      )
      .use(new Keyboard()) // 键盘事件
      .use(
        new Selection({
          enabled: true,
          rubberband: true,
          rubberEdge: true,
          rubberNode: true,
          modifiers: 'shift',
          movable: true,
          // showEdgeSelectionBox: true,
          // showNodeSelectionBox: true,
          multiple: true,
          // pointerEvents: "none",
        }),
      ) // 绑定框选
      .use(
        new Snapline({
          enabled: true,
          sharp: true,
        }),
      ) // 对齐线
      .use(new Clipboard())
      .use(
        new History({
          enabled: true,
          beforeAddCommand: (event, args) => {
            // console.log(1, event, args);
            if (event === 'cell:change:*' && args.key === 'ports') {
              // ports hover变化不需要添加到history
              return false
            }
          },
        }),
      ) // 绑定撤销

    graphOut.on('history:change', () => {
      canRedo.value = graphOut.canRedo()
      canUndo.valu = graphOut.canUndo()
    })

    // 鼠标事件
    bindMouseEvent(graphOut)

    // 键盘时间
    bindKeyboardEvent(graphOut)

    // 添加子节点的逻辑...

    httpGetLayoutData()
  }

  const startDrag = (type, e, data) => {
    startDragToGraph(type, e, data)
  }

  const createCustomVueNode = (data) => {
    // const { groupKey, groupName, id } = data;
    const groupData = {
      ...data,
    }
    const rectNode = graphOut.createNode({
      id: createNanoidBySize(),
      shape: 'node-custom-group',
      ports: [
        {
          id: createNanoidBySize(6),
          group: 'in',
        },
        // {
        //   id: createNanoidBySize(6),
        //   group: "inTop",
        // },
        {
          id: createNanoidBySize(6),
          group: 'out',
        },
        // {
        //   id: createNanoidBySize(6),
        //   group: "outBottom",
        // },
      ],
      data: groupData,
    })
    return rectNode
  }

  const startDragToGraph = (type, e, data) => {
    // const nodes = graphOut.getNodes();
    // const cellCount = graphOut.getCellCount();
    // console.log("x:", nodes, cellCount);
    if (type === 'group') {
      const newNode = createCustomVueNode(data)
      // console.log("dnd", dragNode, e, type);
      dndObj.start(newNode, e)
    }
  }

  // 删除事件 节点
  const removeNode = (node) => {
    graphOut.removeNode(node)
  }

  const removeEdge = (edge) => {
    graphOut.removeEdge(edge)
  }

  // 鼠标事件
  const bindMouseEvent = (graph) => {
    // 鼠标事件
    graph.on('edge:connected', ({ edge }) => {
      edge.attr({
        line: {
          strokeDasharray: '',
        },
      })
    })

    // 鼠标 Hover 时添加按钮
    // graph.on("node:mouseenter", ({ node }) => {
    //   node.addTools({
    //     name: "button-remove",
    //     args: {
    //       x: -10,
    //       y: -10,
    //       offset: { x: 10, y: 10 },
    //     },
    //   });
    // });

    // 鼠标移开时删除按钮
    // graph.on("node:mouseleave", ({ node }) => {
    //   node.removeTools(); // 删除所有的工具
    //   // console.log(node);
    //   // node.removePorts(["port1", "port2"]);
    // });

    //鼠标双击是打开编辑抽屉
    graph.on('node:dblclick', ({ node }) => {
      // 编辑node
      currentElement.value = node

      // 打开弹框 初始化分组信息表单数据
      editGroupData.value = node.data
    })

    graph.on('edge:mouseenter', ({ cell }) => {
      cell.addTools([
        // { name: "vertices" },
        {
          name: 'button-remove',
          args: { distance: 40 },
        },
      ])
    })
    graph.on('edge:mouseleave', ({ cell }) => {
      cell.removeTools()
    })

    graph.on('node:click', ({ node }) => {
      currentElement.value = node
    })

    graph.on('edge:click', ({ edge }) => {
      currentElement.value = edge
    })
    // 空白处点击
    graph.on('blank:click', () => {
      const nodes = graphOut.getNodes()
      for (let node of nodes) {
        if (node?.shape === 'node-custom-group') {
          const menuStatus = node.prop('closemenu')
          node.prop('closemenu', !menuStatus)
        }
      }
    })
  }

  // 键盘事件
  const bindKeyboardEvent = (graph) => {
    // 键盘事件
    graph.bindKey('tab', (e) => {
      e.preventDefault()
      if (currentElement.value?.shape === 'node-custom-group') {
        const menuStatus = currentElement.value.prop('showmenu')
        currentElement.value.prop('showmenu', !menuStatus)
      }
      // const selectedCells = graph
      //   .getSelectedCells()
      //   .filter((item) => item.isNode());
      // if (selectedCells.length > 0) {
      //   // 新增子节点
      //   const topNode = selectedCells[selectedCells.length - 1];
      //   // 获取下游节点的初始位置信息
      //   const position = getDownstreamNodePosition(topNode, graph);
      //   // 创建下游节点
      //   const newNode = createNode(graph, position);
      //   const source = topNode.id;
      //   const target = newNode.id;
      //   // 创建该节点出发到下游节点的边
      //   createEdge(source, target, graph);
      // }
    })

    graph.bindKey('delete', (e) => {
      console.log(currentElement.value)
      if (currentElement.value?.shape === 'edge-custom-group') {
        // 线条
        removeEdge(currentElement.value)
      } else if (currentElement.value?.shape === 'node-custom-group') {
        // 节点
        removeNode(currentElement.value)
      }
    })

    graph.bindKey('backspace', (e) => {
      let isEdge = false
      if (currentElement.value?.shape === 'edge-custom-group') {
        // 线条
        removeEdge(currentElement.value)
      } else if (currentElement.value?.shape === 'node-custom-group') {
        // 节点
        removeNode(currentElement.value)
      }
    })
  }

  const getNodeParentCell = (curNode) => {
    if (!curNode) {
      return null
    }
    const inEdges = graphOut.getIncomingEdges(curNode)
    // 这里功能场景只是限定了只能创建父节点只有一个的情况
    if (inEdges && inEdges.length) {
      const firstEdge = inEdges[0]
      const node = graphOut.getCellById(firstEdge.source.cell)
      return node
    }
    return null
  }

  const checkIsRootNode = (node) => {
    return graphOut.isRootNode(node)
  }
  // 自适应视图
  const resetViewFn = () => {
    // const nodes = graphOut.getNodes();
    // if (nodes.length > 2) {
    //   graphOut.zoomToFit({
    //     padding: 60,
    //     allowMoving: true, // 允许移动节点以保证完全可见
    //     allowResizing: true, // 允许调整大小以保证完全可见
    //     duration: 500, // 动画持续时间（毫秒）
    //   });
    // }
    graphOut.centerContent()
  }

  // 将画布中元素缩小或者放大一定级别，让画布正好容纳所有元素，可以通过 maxScale 配置最大缩放级别
  const zoomViewAll = () => {
    graphOut.zoomToFit({ maxScale: 1 })
  }
  // 将画布缩放级别减小0.2（默认为1）
  const zoomOutClick = () => {
    graphOut.zoom(-0.2)
  }
  // 将画布缩放级别增加0.2（默认为1）
  const zoomInClick = () => {
    graphOut.zoom(0.2)
  }
  const handleUndo = () => {
    // 撤销
    graphOut.undo()
  }

  const handleRedo = () => {
    // 回做
    graphOut.redo()
  }
  const httpGetLayoutData = () => {
    const list = []
    for (let i = 0; i < 10; i++) {
      list.push({
        id: i,
        groupKey: i,
        groupName: `分组${i}`,
        groupDesc: `分组${i}描述`,
      })
    }
    selectGroupList.value = list
  }

  // 开启边的运行动画
  const excuteAnimate = () => {
    graphOut.getEdges().forEach((edge) => {
      edge.attr({
        line: {
          stroke: '#3471F9',
        },
      })
      edge.attr('line/strokeDasharray', 5)
      edge.attr('line/style/animation', 'running-line 30s infinite linear')
    })
  }
  // 显示节点状态
  const showNodeStatus = () => {
    const nodeStatusList = []
    nodeStatusList.forEach((item) => {
      const { id, status, statusMsg } = item
      const node = graphOut.getCellById(id)
      const data = node.getData()
      node.setData({
        ...data,
        status,
        statusMsg,
      })
    })
  }
  // 关闭边的动画
  const stopAnimate = () => {
    graphOut.getEdges().forEach((edge) => {
      edge.attr('line/strokeDasharray', 0)
      edge.attr('line/style/animation', '')
    })

    // 边状态列表
    const edgeStatusList = []
    edgeStatusList.forEach((item) => {
      const { id, status } = item
      const edge = graphOut.getCellById(id)
      if (status === 'success') {
        edge.attr('line/stroke', '#52c41a')
      }
      if (status === 'error') {
        edge.attr('line/stroke', '#ff4d4f')
      }
    })
    // 默认选中一个节点
    graphOut.select('node-2')
  }

  /**
   * 输入框去抖
   */
  const debouncedQueryChange = useDebounceFn((e) => {
    console.log('query:', e)
  }, 300)

  onMounted(() => {
    initGraph()
  })
  onUnmounted(() => {
    graphOut.dispose()
    graphOut = null
  })
</script>
