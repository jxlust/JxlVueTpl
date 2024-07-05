import { nanoid } from 'nanoid'

const NodeType = {
  INPUT: 'INPUT', // 数据输入
  FILTER: 'FILTER', // 数据过滤
  JOIN: 'JOIN', // 数据连接
  UNION: 'UNION', // 数据合并
  AGG: 'AGG', // 数据聚合
  OUTPUT: 'OUTPUT', // 数据输出
}
export const createNanoidBySize = (size = 10) => {
  return nanoid(size)
}
/**
 * 根据起点初始下游节点的位置信息
 * @param node 起始节点
 * @param graph
 * @returns
 */
export const getDownstreamNodePosition = (node, graph, dx = 300, dy = 100) => {
  // 找出画布中以该起始节点为起点的相关边的终点id集合
  const downstreamNodeIdList = []
  graph.getEdges().forEach((edge) => {
    // const originEdge = edge.toJSON()?.data;
    const originEdge = edge.toJSON()
    // console.log('originEdge:',originEdge,node)
    if (originEdge.source?.cell === node.id) {
      downstreamNodeIdList.push(originEdge.target)
    }
  })
  // 获取起点的位置信息
  const position = node.getPosition()
  let minX = Infinity
  let maxY = -Infinity
  graph.getNodes().forEach((graphNode) => {
    if (downstreamNodeIdList.indexOf(graphNode.id) > -1) {
      const nodePosition = graphNode.getPosition()
      // 找到所有节点中最左侧的节点的x坐标
      if (nodePosition.x < minX) {
        minX = nodePosition.x
      }
      // 找到所有节点中最x下方的节点的y坐标
      if (nodePosition.y > maxY) {
        maxY = nodePosition.y
      }
    }
  })

  return {
    x: minX !== Infinity ? minX : position.x + dx,
    y: maxY !== -Infinity ? maxY + dy : position.y,
  }
}

// 根据节点的类型获取ports
export const getPortsByType = (type, nodeId) => {
  let ports = []
  switch (type) {
    case NodeType.INPUT:
      ports = [
        {
          id: `${nodeId}-out`,
          group: 'out',
        },
      ]
      break
    case NodeType.OUTPUT:
      ports = [
        {
          id: `${nodeId}-in`,
          group: 'in',
        },
      ]
      break
    default:
      ports = [
        {
          id: `${nodeId}-in`,
          group: 'in',
        },
        {
          id: `${nodeId}-out`,
          group: 'out',
        },
      ]
      break
  }
  return ports
}

export const getPortsDefault = (nodeId) => {
  return [
    {
      id: `${nodeId}-in`,
      group: 'in',
    },
    {
      id: `${nodeId}-out`,
      group: 'out',
    },
  ]
}

/**
 * 创建节点并添加到画布
 * @param type 节点类型
 * @param graph
 * @param position 节点位置
 * @returns
 */
export const createNode = (graph, position, data = { groupName: '', status: 'default' }) => {
  if (!graph) {
    return {}
  }
  let newNode = {}
  const sameTypeNodes = graph.getNodes()
  // .filter((item) => item.getData()?.type === type);
  // const typeName = PROCESSING_TYPE_LIST?.find(
  //   (item) => item.type === type
  // )?.name;
  const id = createNanoidBySize()

  if (!data.groupName) {
    const typeName = '未命名'
    data.groupName = `${typeName}_${sameTypeNodes.length + 1}`
  }
  const node = {
    id,
    shape: 'node-custom-group',
    x: position?.x,
    y: position?.y,
    ports: getPortsDefault(id),
    data: {
      ...data,
    },
  }
  newNode = graph.addNode(node)
  return newNode
}

/**
 * 创建边并添加到画布
 * @param source
 * @param target
 * @param graph
 */
export const createEdge = (source, target, graph) => {
  const id = createNanoidBySize(6)
  const edge = {
    id,
    shape: 'edge-custom-group',
    // attrs: {
    //   line: {
    //     strokeDasharray: "5 5",
    //   },
    // },
    source: {
      cell: source,
      port: `${source}-out`,
    },
    target: {
      cell: target,
      port: `${target}-in`,
    },
    zIndex: 2,
    // data: {
    //   source,
    //   target,
    // },
  }
  if (graph) {
    graph.addEdge(edge)
  }
}
