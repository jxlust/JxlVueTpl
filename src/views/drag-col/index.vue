<template>
  <div class="drag-page">
    <div class="left" ref="leftColRef">
      <div class="tree-wrapper">
        <el-tree
          @mousemove="handleDragStart"
          @node-drag-end="handleDragEnd"
          :data="data"
          :default-expand-all="true"
          :props="defaultProps"
          @node-click="handleNodeClick"
        />
      </div>

      <div class="left-text"> <p>leftColRefsfasfasdfa</p> </div>
    </div>
    <div class="drag-col" ref="resizeRef" @mousedown="handleMouseDown"></div>

    <ResizeBar />

    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
  import ResizeBar from './resize-bar.vue'
  interface Tree {
    label: string
    children?: Tree[]
  }

  const handleNodeClick = (data: Tree) => {
    console.log(data)
  }
  const handleDragStart = () => {}
  const handleDragEnd = () => {
    console.log('eend.')
  }

  const data: Tree[] = [
    {
      label: 'Level one 1',
      children: [
        {
          label: 'Level two 1-1',
          children: [
            {
              label: 'Level three 1-1-1',
            },
          ],
        },
      ],
    },
    {
      label: 'Level one 2',
      children: [
        {
          label: 'Level two 2-1',
          children: [
            {
              label: 'Level three 2-1-1',
            },
          ],
        },
        {
          label: 'Level two 2-2',
          children: [
            {
              label: 'Level three 2-2-1',
            },
          ],
        },
      ],
    },
    {
      label: 'Level one 3',
      children: [
        {
          label: 'Level two 3-1',
          children: [
            {
              label: 'Level three 3-1-1',
            },
          ],
        },
        {
          label: 'Level two 3-2',
          children: [
            {
              label: 'Level three 3-2-1',
            },
          ],
        },
      ],
    },
  ]

  const defaultProps = {
    children: 'children',
    label: 'label',
  }

  const leftColRef = ref()
  const resizeRef = ref()

  const handleMouseDown = (e: MouseEvent) => {
    document.onselectstart = function () {
      return false
    }
    document.ondragstart = function () {
      return false
    }

    const resizeDom = resizeRef.value
    const leftColDom = leftColRef.value

    resizeDom.style.background = 'red'
    console.log('px:', e.pageX, e.clientX, e.offsetX)
    let startX = e.pageX
    let clickOffsetX = e.offsetX
    const leftWidth = leftColDom.clientWidth
    function onDocumentMouseMove(e) {
      // console.log('mpx:', e.pageX, e.clientX)
      const diff = e.pageX - startX
      const width = leftWidth + diff - clickOffsetX
      if (width >= 244) {
        leftColDom.style.width = `${width}px`
      }
    }
    // document 鼠标拖动事件
    document.addEventListener('mousemove', onDocumentMouseMove)
    resizeDom.onmouseup = () => {
      resizeDom.style = ''
      document.removeEventListener('mousemove', onDocumentMouseMove)
      resizeDom.onmouseup = null
      resizeDom.ondragstart = null
      document.onselectstart = null
      document.ondragstart = null
    }
    document.onselect = () => {
      console.log('onselect.')
    }
    document.onselectionchange = (ev) => {
      console.log('onselectionchange')
      ev.preventDefault()
      return false
    }
    document.onselectstart = () => {
      console.log('onselectstart')
    }

    document.onmouseup = () => {
      console.log('document onmouseup...')

      resizeDom.style = ''
      document.removeEventListener('mousemove', onDocumentMouseMove)
      resizeDom.onmouseup = null
      resizeDom.ondragstart = null
      // document.onselectstart = null
      document.ondragstart = null
      // resizeDom.releasePointerCapture && resizeDom.releasePointerCapture();
      resizeDom.releaseCapture && resizeDom.releaseCapture()
    }
    document.onmouseleave = () => {
      resizeDom.style = ''
      document.removeEventListener('mousemove', onDocumentMouseMove)
      resizeDom.onmouseup = null
      resizeDom.ondragstart = null
      // document.onselectstart = null
      document.ondragstart = null
    }
    resizeDom.ondragstart = (ev) => {
      ev.preventDefault()
      return false
    }

    resizeDom.setCapture && resizeDom.setCapture() //该函数在属于当前线程的指定窗口里设置鼠标捕获
    return false
  }
</script>

<style lang="scss">
  .drag-page {
    display: flex;
    // user-select: none;
    align-items: flex-start;
    justify-content: stretch;
    height: 500px;
    justify-items: stretch;
    .left {
      width: 244px;
      min-width: 0;
      align-self: stretch;
      padding: 16px 8px;
      background-color: saddlebrown;
    }
    .left-text {
      height: 100%;
      overflow: auto;
      > p {
        height: 1000px;
      }
    }
    .drag-col {
      width: 20px;
      align-self: stretch;
      background-color: red;
      cursor: col-resize;
    }
    .right {
      flex: 1;
      align-self: stretch;
      background-color: antiquewhite;
    }
  }
</style>
