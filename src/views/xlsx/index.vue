<template>
  <div>
    <div class="flex">
      <el-button @click="exportClick1">导出1</el-button>
      <el-button @click="exportClick2">导出2</el-button>
      <el-button @click="exportClick3">导出3</el-button>
    </div>

    <div class="flex">
      <div class="upload-btn">
        <input @change="handleFileChange" accept=".docx" type="file" autocomplete="off" tabindex="-1" />
      </div>
    </div>

    <div class="flex">
      <div ref="docxShowRef" class="docx-preview"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // import { writeFile, utils } from 'xlsx'
  import { utils, writeFile } from 'xlsx-js-style'
  import { renderAsync, defaultOptions } from 'docx-preview'

  // XLSX.writeFile()
  const exportClick1 = () => {
    // 需要导出的数据
    const aoa = [
      ['姓名', '性别', '年龄', '注册时间'],
      ['张三', '男', 18, new Date()],
      ['李四', `<a href="http://www.baidu.com">sdf女</a>`, 22, new Date()],
    ]
    // 导出的表格名称
    const filename = '导出表格.xlsx'
    // Excel第一个sheet的名称
    const ws_name = 'Sheet1'
    const wb = utils.book_new()
    const ws = utils.aoa_to_sheet(aoa)
    // ws['A2'].l = { Target: 'http://www.baidu.com', ToolTip: 'hhhhhh' }
    ws['A2'].r = '<a href="http://www.baidu.com">hhhh</a>'
    utils.book_append_sheet(wb, ws, ws_name) // 将数据添加到工作薄
    writeFile(wb, filename) // 导出Excel
  }

  const exportClick2 = () => {
    var aoa = [
      ['主要信息', null, null, '其它信息'], // 特别注意合并的地方后面预留2个null
      ['姓名', '性别', '年龄', '注册时间'],
      ['张三', '男', 18, new Date()],
      ['李四', '女', 22, new Date()],
    ]
    var sheet = utils.aoa_to_sheet(aoa)
    sheet['!merges'] = [
      // 设置A1-C1的单元格合并
      { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
    ]

    const filename = '导出合并单元格的表格.xlsx'
    // Excel第一个sheet的名称
    const ws_name = 'Sheet1'
    const wb = utils.book_new()
    const ws = utils.aoa_to_sheet(aoa)
    // ws['!merges'] = mergeArr
    utils.book_append_sheet(wb, ws, ws_name) // 将数据添加到工作薄
    writeFile(wb, filename) // 导出Excel
  }

  const exportClick3 = () => {
    const aoa = [
      // [
      //   {
      //     v: '一月（2023年01月）',
      //     t: 's',
      //     s: {
      //       // font 字体属性
      //       font: {
      //         bold: true,
      //         sz: 14,
      //         name: '宋体',
      //       },
      //       // alignment 对齐方式
      //       alignment: {
      //         vertical: 'center', // 垂直居中
      //         horizontal: 'center', // 水平居中
      //       },
      //       // fill 颜色填充属性
      //       fill: {
      //         fgColor: { rgb: '87CEEB' },
      //       },
      //     },
      //   },
      // ],
      ['主要信息', null, null, '其它信息'], // 特别注意合并的地方后面预留2个null
      ['姓名', '性别', '年龄', '注册时间'],
      ['张三', '男', 18, new Date()],
      ['李四', '女', 22, new Date()],
    ]
    const wb = utils.book_new()
    const ws = utils.aoa_to_sheet(aoa)
    ws['!merges'] = [
      // 设置A1-C1的单元格合并
      { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
    ]

    //这个就是修改格式的代码
    ws['A1'].s = {
      font: {
        sz: 20,
        bold: true,
        color: {
          rgb: 'ff0000',
        },
      },
      fill: { fgColor: { rgb: '666666' } },
      alignment: {
        horizontal: 'center',
        vertical: 'center',
        wrap_text: true,
      },
    }

    for (let v of ['A2', 'B2', 'C2', 'D2']) {
      ws[v].s = {
        font: {
          sz: 13,
          bold: true,
          color: {
            rgb: 'FFFFAA00',
          },
        },
        fill: { fgColor: { rgb: '999999' } },
        alignment: {
          horizontal: 'center',
          vertical: 'center',
          wrap_text: true,
        },
      }
    }

    //控制单元格宽度
    ws['!cols'] = [
      {
        wpx: 70,
      },
      {
        wpx: 70,
      },
      {
        wpx: 70,
      },
      {
        wpx: 70,
      },
      {
        wpx: 150,
      },
      {
        wpx: 120,
      },
    ]
    //单元格列宽

    const filename = '导出单元格带样式的表格.xlsx'
    // Excel第一个sheet的名称
    const ws_name = 'Sheet1'
    utils.book_append_sheet(wb, ws, ws_name) // 将数据添加到工作薄
    writeFile(wb, filename) // 导出Exce
  }

  const docxShowRef = ref()
  const docxOptions = Object.assign(defaultOptions, {
    debug: true,
    experimental: true,
  })
  const renderDocxPreview = async (file) => {
    // const blob = URL.createObjectURL(file)
    console.log(2, file)
    // console.log(1, blob)
    console.log(1, docxShowRef.value)
    let ret = await renderAsync(file, docxShowRef.value, undefined, docxOptions)
    console.log('ret:', ret)
  }
  const handleFileChange = (e) => {
    const files = (e.target as HTMLInputElement).files
    if (!files) return
    console.log('files:', files)
    renderDocxPreview(files[0])
  }
</script>

<style lang="scss">
  .flex {
    display: flex;
    align-items: center;
  }
</style>
