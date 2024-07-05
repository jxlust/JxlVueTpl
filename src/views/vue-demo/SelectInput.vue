<template>
  <div>
    <el-select @change="handleChange" v-model="selectValue" placeholder="Select" size="large" style="width: 240px">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    <el-input v-model="computedInput" @input="handleInput" />
  </div>
</template>

<script setup lang="ts">
  const selectValue = ref('1')
  const data = '1_文本'

  const options = [
    {
      value: '1',
      label: 'A',
    },
    {
      value: '2',
      label: 'B',
    },
    {
      value: '3',
      label: '清空',
    },
  ]

  const inputValue = ref(data.slice(2))

  const computedInput = computed({
    get: () => {
      if (selectValue.value === '3') {
        return '' + inputValue.value
      } else {
        return selectValue.value + '_' + inputValue.value
      }
    },
    set: (v) => {
      console.log(1, v)
      const preStr = selectValue.value + '_'
      const index = v.indexOf(preStr)
      if (index === 0) {
        inputValue.value = v.slice(preStr.length)
      } else {
        inputValue.value = v
      }
    },
  })

  const handleChange = () => {
    inputValue.value = ''
  }
  const handleInput = (v) => {}
</script>
