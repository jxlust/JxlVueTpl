<template>
  <div class="show-text">
    <teleport to="body">
      <transition name="fade" appear>
        <div class="fixed-msg" v-show="show"> 我是传送过来的数据 </div>
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
  const show = ref(false)
  setTimeout(() => {
    show.value = true
  }, 0)
</script>
<style>
  .fixed-msg {
    position: absolute;
    top: 0;
    right: 0;
    color: red;
  }
</style>
