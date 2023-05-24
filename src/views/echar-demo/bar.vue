<template>
  <div ref="barCharEl" class="bar-demo"></div>
</template>

<script setup lang="ts">
  import { onMounted, Ref, ref, computed, nextTick } from 'vue'
  import type { EChartsOption } from 'echarts'
  import useChart from '@/hooks/useEcharts/useChart'
  import { RenderType, ThemeType } from '@/hooks/useEcharts/types'

  function formatterLabelText(params) {
    var newParamsName = ''
    var paramsNameNumber = params.length
    var provideNumber = 4
    var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
    if (paramsNameNumber > provideNumber) {
      for (var p = 0; p < rowNumber; p++) {
        var tempStr = ''
        var start = p * provideNumber
        var end = start + provideNumber
        if (p == rowNumber - 1) {
          tempStr = params.substring(start, paramsNameNumber)
        } else {
          tempStr = params.substring(start, end) + '\n'
        }
        newParamsName += tempStr
      }
    } else {
      newParamsName = params
    }
    return newParamsName
  }

  const option = computed<EChartsOption>(() => ({
    xAxis: {
      data: [
        '待核对电子用印',
        '待核对实体用印',
        '待系统电子用印',
        '已核对电子用印',
        '已核对实体用印',
        '已系统电子用印',
      ],
      axisTick: {
        show: false, // 不显示坐标轴刻度线
      },
      axisLine: {
        show: false, // 不显示坐标轴线
      },
      splitLine: {
        show: false, // 不显示网格线
      },
      axisLabel: {
        // rotate: 45,
        interval: 0,
        formatter: formatterLabelText,
      },
      // show: false, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
      // axisLabel: {
      //   show: false, // 不显示坐标轴上的文字
      // },
    },
    yAxis: {
      show: false, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
      axisTick: {
        show: false, // 不显示坐标轴刻度线
      },
      axisLine: {
        show: false, // 不显示坐标轴线
      },
      splitLine: {
        show: false, // 不显示网格线
      },
    },
    series: [
      {
        type: 'bar',
        barWidth: 20,
        barCategoryGap: 50,
        data: [23, 24, 18, 25, 27, 40],
        label: {
          show: true,
          position: 'top',
          valueAnimation: true,
          color: '#657088',
          fontSize: 12,
        },
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#256DFE', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#7FADFF', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  }))

  const barCharEl = ref<HTMLDivElement | null>(null)

  const { setOption, showLoading } = useChart(
    barCharEl as Ref<HTMLDivElement>,
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
