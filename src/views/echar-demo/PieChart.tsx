import { PieValueImp, RenderType, ThemeType } from '@/hooks/useEcharts/types'
import useChart from '@/hooks/useEcharts/useChart'
import { EChartsOption } from 'echarts'
import { Ref } from 'vue'

export default defineComponent({
  name: 'PieChart',
  props: {
    title: String,
    totalTips: {
      type: String,
      default: () => '累计处理',
    },
    data: {
      type: Array as PropType<PieValueImp[]>,
    },
    colors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    const orderSum = computed(() => {
      if (props.data?.length) {
        return props.data.reduce((pre, cur) => pre + cur.value, 0)
      } else {
        return 0
      }
    })
    const option = computed<EChartsOption>(() => ({
      title: {
        zlevel: 0,
        text: ['{value|' + orderSum.value + '}', `{name|${props.totalTips}}`].join('\n'),
        top: '42%',
        left: '69%',
        textAlign: 'center',
        textStyle: {
          rich: {
            value: {
              color: '#020F22',
              fontSize: 24,
              lineHeight: 20,
              fontWeight: 700,
              fontFamily: 'alternatenum',
            },
            name: {
              color: '#020F22',
              fontSize: 14,
              lineHeight: 22,
            },
          },
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
        backgroundColor: 'rgba(2, 15, 34, 0.7)',
        borderColor: 'none',
        borderWidth: 0,
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
      },
      color: props.colors,
      legend: {
        orient: 'vertical',
        left: '10%',
        itemWidth: 6,
        top: 50,
        bottom: 20,
        icon: 'circle',
        // icon: 'path://M0 3a3 3 0 1 0 6 0a3 3 0 1 0 -6 0z',
        itemGap: 14,
        textStyle: {
          padding: [0, 0, 0, 5],
          color: '#657088',
          fontSize: 12,
        },
        formatter: function (name: any) {
          return name
          // let data = _this.getNum(name);
          // return name + ' | ' + data.percent + '      ' + '      ' + data.num;
        },
      },
      series: [
        {
          name: props.title,
          type: 'pie',
          radius: ['45%', '65%'],
          center: ['70%', '50%'],
          zlevel: 1,
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
            // padding: [2, 2, 2, 2],
            // backgroundColor: '#fff',
            // formatter: ['{name|{b}}', '{value|{c}}'].join('\n'),
            // rich: {
            //   value: {
            //     color: '#020F22',
            //     fontSize: 24,
            //     lineHeight: 20,
            //     fontWeight: 700,
            //     fontFamily: 'alternatenum',
            //   },
            //   name: {
            //     color: '#020F22',
            //     fontSize: 14,
            //     lineHeight: 20,
            //   },
            // },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: 'rgba(0, 0, 0, 0.35)',
            },
            label: {
              // show: true,
              show: false,
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: props.data || [],
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

    const updateOptions = computed<EChartsOption>(() => ({
      title: {
        text: ['{value|' + orderSum.value + '}', `{name|${props.totalTips}}`].join('\n'),
      },
      series: [
        {
          type: 'pie',
          data: props.data || [],
        },
      ],
    }))

    watch(
      () => props.data,
      () => {
        setOption(updateOptions.value)
      },
    )

    return () => <div ref={pieCharEl} class={'my-piechart'}></div>
  },
})
