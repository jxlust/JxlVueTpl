<template>
  <div class="page">
    <div class="btns">
      <ElButton>插入文本</ElButton>
      <ElButton>插入节点</ElButton>
      <ElButton @click="setHtml">设置html</ElButton>
      <ElButton @click="getRichContent">获取内容</ElButton>

      <span>{{ showMessage }}</span>
    </div>
    <RichText
      ref="richTextRef"
      v-model:content="htmlContent"
      @mylink-menu-click="handleLinkMenuClick"
      @mylink-click="handleLinkClick"
    />

    <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
      <span>This is a {{ showMessage }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="sureClick"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { ElButton } from 'element-plus'
  import RichText from '@/components/rich-text/index.vue'
  const htmlContent = ref<string>('默认值。。。')
  const testInserText = `<p><a data-w-e-type="mylinktype" data-w-e-is-void data-w-e-is-inline data-id="111" href="http://www" target="_blank" >我是插入的链接</a><a data-w-e-type="mylinktype" data-w-e-is-void data-w-e-is-inline data-id="111" href="http://www" target="_blank" >我是插入的链接</a><a data-w-e-type="mylinktype" data-w-e-is-void data-w-e-is-inline data-id="111" href="http://www" target="_blank" >我是插入的链接</a><a data-w-e-type="mylinktype" data-w-e-is-void data-w-e-is-inline data-id="111" href="http://www" target="_blank" >我是插入的链接</a><a data-w-e-type="mylinktype" data-w-e-is-void data-w-e-is-inline data-id="111" href="http://www" target="_blank" >我是插入的链接</a><a data-w-e-type="mylinktype" data-w-e-is-void data-w-e-is-inline data-id="111" href="http://www" target="_blank" >我是插入的链接</a>默认值。。。</p>'`

  const dialogVisible = ref(false)
  const richTextRef = ref()

  const setHtml = () => {
    richTextRef.value.setRichHtml(testInserText)
  }
  const insertNode = () => {
    const node = {
      type: 'mylinktype',
      dataId: 111,
      href: 'http://www',
      content: '我是插入的链接',
      // 这个必须要一个children
      children: [{ text: '' }],
    }
    richTextRef.value.editorRef.insertNode(node)
  }
  const sureClick = () => {
    dialogVisible.value = false
    insertNode()
  }
  const handleClose = () => {}
  const handleLinkMenuClick = () => {
    dialogVisible.value = true
  }
  const showMessage = ref('')
  const handleLinkClick = (data) => {
    console.log(data)
    dialogVisible.value = true
    showMessage.value = JSON.stringify(data)
  }
  const getRichContent = () => {
    console.log(1, htmlContent.value)
    console.log(2, richTextRef.value.editorRef.getHtml())
  }
</script>

<style lang="scss" scoped>
  .page {
    text-align: left;
  }
  .btns {
    display: flex;
    align-items: center;
  }
</style>
