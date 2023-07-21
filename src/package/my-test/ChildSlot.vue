<template>
  <div class="child-slot">
    <GrandsonShow>
      <template v-for="key in slotsKeys" :key="key" #[key]="gscope">
        <slot :name="key" v-bind="gscope"></slot>

        <span>{{ key }}----</span>
      </template>
    </GrandsonShow>
  </div>
</template>

<script setup lang="ts">
  import GrandsonShow from './GrandsonSlot.vue'
  // 我要把父级的插槽传递到我的后代去
  const slots = useSlots()
  const slotsKeys = Object.keys(slots)
  console.log('get slots:', slots)
  for (let item in slots) {
    console.log(1, item)
  }
</script>

<style></style>
