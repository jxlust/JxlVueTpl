import { BarValueImp, RenderType, ThemeType } from '@/hooks/useEcharts/types'
import useChart from '@/hooks/useEcharts/useChart'
import { EChartsOption } from 'echarts'
import { Ref } from 'vue'

export function formatterLabelText(params: string) {
  let newParamsName = ''
  const paramsNameNumber = params.length
  const provideNumber = 4
  const rowNumber = Math.ceil(paramsNameNumber / provideNumber)
  if (paramsNameNumber > provideNumber) {
    for (let p = 0; p < rowNumber; p++) {
      let tempStr = ''
      const start = p * provideNumber
      const end = start + provideNumber
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

export default defineComponent({
  name: 'BarChart',
  props: {
    data: {
      type: Object as PropType<BarValueImp>,
    },
  },
  setup(props) {
    const option = computed<EChartsOption>(() => ({
      xAxis: {
        data: props.data?.labels || [],
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          // rotate: 45,
          interval: 0,
          formatter: formatterLabelText,
          color: '#657088',
          fontSize: 12,
          lineHeight: 18,
        },
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
        // max: function (value) {
        //   return value.max - 20;
        // },
      },
      series: [
        {
          type: 'bar',
          barWidth: 20,
          barCategoryGap: 50,
          data: props.data?.values || [],
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
    watch(
      () => props.data?.values,
      () => {
        setOption(option.value)
      },
    )
    return () => <div ref={barCharEl} class={'my-barchart'}></div>
  },
})
