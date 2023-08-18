<template>
  <div class="page">
    <div class="btns">
      <ElButton>插入文本</ElButton>
      <ElButton>插入节点</ElButton>
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

  const dialogVisible = ref(false)
  const richTextRef = ref()

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
    showMessage.value = JSON.stringify(data)
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
