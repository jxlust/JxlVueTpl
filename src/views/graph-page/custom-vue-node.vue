<template>
  <div class="x6-node-custom-group" @keyup.enter="handleKeyTab">
    <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" :class="`x6-group-node ${formatStatusCls()}`">
      <span class="logo"></span>
      <span class="label">{{ nodeData.groupName || '' }}</span>
      <span class="status-dot"></span>
    </div>
    <div class="group-plus-dag">
      <el-popover placement="right" width="200" v-model:visible="showMenu">
        <div class="group-select-menu">
          <el-select
            size="small"
            v-model="groupValue"
            style="width: 100%"
            filterable
            remote
            clearable
            :loading="loading"
            :remote-method="remoteMethod"
            popper-class="filterableSelectPopper"
            @change="handleSelectChange"
            placeholder="请输入关键字搜索"
          >
            <el-option
              v-for="item in selectGroupList"
              :key="item.groupKey"
              :label="item.groupName"
              :value="item.groupKey"
            />
          </el-select>
        </div>
        <template #reference>
          <i class="my-plus-icon" @click="addBtnClick"></i>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script>
  // import insertCss from "insert-css";
  import { defineComponent } from 'vue'
  import {
    getDownstreamNodePosition,
    // getPortsByType,
    createNode,
    createEdge,
  } from './x6-tools.js'
  const postGroupListQueryByPage = () => {
    const list = []
    for (let i = 0; i < 10; i++) {
      list.push({
        id: i,
        groupKey: i,
        groupName: `分组${i}`,
        groupDesc: `分组${i}描述`,
      })
    }
    return {
      success: true,
      data: list,
    }
  }
  export default defineComponent({
    name: 'NodeCustomGroup',
    components: {},
    inject: ['getNode'],
    data() {
      return {
        nodeData: {},
        logoImg: '',
        showMenu: false,
        selectGroupList: [],
        groupValue: '',
        loading: false,
      }
    },
    computed: {},
    mounted() {
      const nodeEl = this.getNode()
      this.nodeData = nodeEl.getData()
      console.log(this.nodeData)
      nodeEl.on('change:data', ({ current }) => {
        console.log('vue node change:data', current)
        this.nodeData = current
        // const { progress } = current;
        // this.percentage = progress;
      })
      nodeEl.on('change:closemenu', ({ current, previous }) => {
        // console.log("closemenu", current);
        this.showMenu = false
      })

      nodeEl.on('change:showmenu', ({ current, previous }) => {
        // console.log("closemenu", current);
        this.showMenu = true
        this.remoteMethod('')
      })
    },
    methods: {
      clearSelectData() {
        this.selectGroupList = []
        this.groupValue = ''
      },
      handleSelectChange(v) {
        this.showMenu = false
        const findItem = this.selectGroupList.find((item) => item.groupKey === v)
        this.newAddNodeItem(findItem)
        // clear
        this.clearSelectData()
      },
      remoteMethod(query) {
        this.loading = true
        const params = {
          pageNum: 1,
          pageSize: 30,
          data: {
            groupName: query || '',
            status: 1,
          },
        }
        try {
          const res = postGroupListQueryByPage(params)
          if (res.success) {
            const data = res.data
            this.selectGroupList = data || []
          } else {
            this.selectGroupList = []
          }
        } catch (error) {
          console.error(error)
        }
        this.loading = false
      },

      formatStatusCls() {
        const status = this.nodeData.status
        if (status === 0) {
          return 'gray'
        } else if (status === 1) {
          return ''
        }
      },
      handleMouseEnter() {
        const node = this.getNode()
        // 获取该节点下的所有连接桩
        const ports = node.getPorts() || []
        console.log('aalll ports:', ports)
        // console.log("ports:", ports);
        ports.forEach((port) => {
          node.setPortProp(port.id, 'attrs/circle', {
            fill: '#fff',
            stroke: '#85A5FF',
          })
        })
      },
      handleMouseLeave() {
        const node = this.getNode()
        // 获取该节点下的所有连接桩
        const ports = node.getPorts() || []
        ports.forEach((port) => {
          node.setPortProp(port.id, 'attrs/circle', {
            fill: 'transparent',
            stroke: 'transparent',
          })
        })
      },
      newAddNodeItem(data) {
        const node = this.getNode()
        // const nodeEl = this.getNode();
        // this.nodeData = nodeEl.getData();
        const { graph } = node.model || {}
        if (graph) {
          // 获取下游节点的初始位置信息
          const position = getDownstreamNodePosition(node, graph)
          // 创建下游节点
          // 设置parentKey
          data.parentKey = node.data.groupKey
          const newNode = createNode(graph, position, data)
          const source = node.id
          const target = newNode.id

          // 创建该节点出发到下游节点的边
          createEdge(source, target, graph)
        }
      },
      addBtnClick() {
        this.clearSelectData()
        this.showMenu = !this.showMenu
        if (this.showMenu) {
          this.remoteMethod('')
        }
      },
      // handleAddClick() {
      //   const node = this.getNode();
      //   const { graph } = node.model || {};
      //   if (graph) {
      //     // 获取下游节点的初始位置信息
      //     const position = getDownstreamNodePosition(node, graph);
      //     // 创建下游节点
      //     const newNode = createNode(graph, position);
      //     const source = node.id;
      //     const target = newNode.id;
      //     // 创建该节点出发到下游节点的边
      //     createEdge(source, target, graph);
      //   }
      // },
      handleKeyTab() {
        const node = this.getNode()
        console.log('tab:', node)
      },
    },
  })
</script>
<style lang="scss">
  .x6-node-custom-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
  }
  .x6-group-node {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid #c2c8d5;
    border-left: 4px solid #5f95ff;
    border-radius: 4px;
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
    padding: 0 5px 0 5px;
    > img {
      width: 20px;
      height: 20px;
      object-fit: cover;
      flex-shrink: 0;
    }
    .logo {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: red;
    }
    .label {
      display: inline-block;
      flex: 1;
      min-width: 104px;
      margin-left: 8px;
      color: #666;
      font-size: 12px;
    }

    .status-dot {
      flex-shrink: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #1890ff;
      margin-right: 5px;
    }
    &.success {
      border-left: 4px solid #52c41a;

      .status-dot {
        background-color: #52c41a;
      }
    }
    &.failed {
      border-left: 4px solid #ff4d4f;

      .status-dot {
        background-color: #ff4d4f;
      }
    }

    &.gray {
      border-left: 4px solid #d3cbcb;
      .status-dot {
        background-color: #d3cbcb;
      }
    }
    // &.running .status-dot img {
    //   animation: spin 1s linear infinite;
    // }
  }
  .group-plus-dag {
    right: -12px;
    position: absolute;
    visibility: hidden;
    margin-left: 12px;
    height: 48px;
  }
  .x6-node-selected .group-plus-dag {
    visibility: visible;
  }
  .x6-node-selected .x6-group-node {
    border-color: #1890ff;
    border-radius: 2px;
    box-shadow: 0 0 0 4px #d4e8fe;
  }
  .x6-node-selected .x6-group-node.success {
    border-color: #52c41a;
    border-radius: 2px;
    box-shadow: 0 0 0 4px #ccecc0;
  }
  .x6-node-selected .x6-group-node.failed {
    border-color: #ff4d4f;
    border-radius: 2px;
    box-shadow: 0 0 0 4px #fedcdc;
  }

  .x6-node-selected .x6-group-node.gray {
    border-color: #d3cbcb;
    border-radius: 2px;
    box-shadow: 0 0 0 4px #f1e8e8;
  }

  .x6-edge:hover path:nth-child(2) {
    stroke: #1890ff;
    stroke-width: 1px;
  }

  .x6-edge-selected path:nth-child(2) {
    stroke: #1890ff;
    stroke-width: 1.5px !important;
  }

  .my-plus-icon {
    position: absolute;
    top: calc(50% - 8px);
    left: 0;
    width: 16px;
    height: 16px;
    background: url('@/assets/imgs/plus_icon1.png') no-repeat center center / 100% 100%;
    cursor: pointer;
    &:hover {
      background: url('@/assets/imgs/plus_icon2.png') no-repeat center center / 100% 100%;
    }
    &:active {
      background: url('@/assets/imgs/plus_icon3.png') no-repeat center center / 100% 100%;
    }
  }

  @keyframes running-line {
    to {
      stroke-dashoffset: -1000;
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
