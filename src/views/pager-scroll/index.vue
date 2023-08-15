<template>
  <div>
    <AsyncScrollFixed />

    {{ data }} - {{ loading }}
  </div>
</template>

<script setup lang="ts">
  import { AsyncScrollFixed } from '@/components/scroll-fixed/ScrollFixed'
  import { useSwr } from '@/hooks/useApi'

  const { data, loading } = useSwr()
</script>

<style></style>
