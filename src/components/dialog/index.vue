<template>
  <div class="mask" @click="closeDialog" v-show="modelValue">
    <div class="dialog-container" @click.stop>
      <div class="dialog-header">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  type DialogProps = {
    modelValue: boolean;
    title: string;
    modelModifiers?: {
      test: boolean;
    };
    titleModifiers?: {
      uppercase: boolean;
    };
  };
  const props = defineProps<DialogProps>();
  const emit = defineEmits(['update:modelValue', 'update:title']);
  const closeDialog = () => {
    console.log('modifiers:', props.modelModifiers);
    if (props.titleModifiers?.uppercase) {
      emit('update:title', 'dialog change it...'.toUpperCase());
    } else {
      emit('update:title', 'dialog close ...');
    }
    emit('update:modelValue', false);
  };
</script>

<style lang="scss">
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
  }

  .dialog-container {
    width: 200px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    z-index: 99;
  }

  .dialog-header {
    display: flex;
    font-size: 16px;
    color: #333;
    height: 50px;
    align-items: center;
  }
</style>
