<template>
  <div class="box">
    <div class="row single-test">
      <SingleSelect>
        <SingleSelectItem v-for="n in lists" :key="n.id" :value="n.value" :text="n.name" />
      </SingleSelect>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SingleSelect from '@/components/single-select/SingleSelect'
  import SingleSelectItem from '@/components/single-select/SingleSelectItem'

  type ItemType = {
    id: number
    name: string
    value: string
  }
  const lists = reactive<ItemType[]>([])

  for (let i = 0; i < 10; ++i) {
    lists.push({
      id: i,
      name: 'i am data ----' + i,
      value: `v${i}`,
    })
  }
</script>

<style lang="scss">
  .single-test {
    position: relative;
  }
</style>
