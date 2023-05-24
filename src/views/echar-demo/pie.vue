<template>
  <div ref="pieCharEl" class="pie-demo"></div>
</template>

<script setup lang="ts">
  import { onMounted, Ref, ref, computed, nextTick } from 'vue'
  import type { EChartsOption } from 'echarts'
  import useChart from '@/hooks/useEcharts/useChart'
  import { RenderType, ThemeType } from '@/hooks/useEcharts/types'

  const option = computed<EChartsOption>(() => ({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 0,
      top: 20,
      right: 20,
      bottom: 20,
    },
    series: [
      {
        name: '用印平台',
        type: 'pie',
        radius: ['30%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '机要核对电子章' },
          { value: 735, name: '非机要核对电子章' },
          { value: 580, name: '机要核对实体章' },
          { value: 484, name: '通用流程' },
          { value: 300, name: '纸质签批' },
        ],
      },
    ],
  }))

  const pieCharEl = ref<HTMLDivElement | null>(null)

  const { setOption, showLoading } = useChart(
    pieCharEl as Ref<HTMLDivElement>,
    true,
    true,
    RenderType.CanvasRenderer,
    ThemeType.Default,
  )

  onMounted(() => {
    nextTick(() => {
      // 显示loading
      showLoading()
      // 假装有网络请求 ...
      // 渲染图表
      setTimeout(() => {
        setOption(option.value)
      }, 1000)
    })
  })
</script>

<style></style>
