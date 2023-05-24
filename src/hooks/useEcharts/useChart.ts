import { nextTick, onMounted, onUnmounted, Ref, unref } from 'vue'
import type { EChartsOption } from 'echarts'
import echarts from './lib'
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers'
import { RenderType, ThemeType } from './types'

export default function useChart(
  elRef: Ref<HTMLDivElement>,
  autoChartSize = false,
  animation = false,
  render: RenderType = RenderType.SVGRenderer,
  theme: ThemeType = ThemeType.Default,
) {
  // 渲染模式
  echarts.use(render === RenderType.SVGRenderer ? SVGRenderer : CanvasRenderer)
  // echart实例
  let chartInstance: echarts.ECharts | null = null

  // 初始化echart
  const initCharts = () => {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }
    chartInstance = echarts.init(el, theme)
  }

  // 更新/设置配置
  const setOption = (option: EChartsOption) => {
    nextTick(() => {
      if (!chartInstance) {
        initCharts()
        if (!chartInstance) return
      }

      chartInstance.setOption(option)
      hideLoading()
    })
  }

  // 获取echart实例
  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts()
    }
    return chartInstance
  }

  // 更新大小
  function resize() {
    chartInstance?.resize()
  }

  // 监听元素大小
  function watchEl() {
    // 给元素添加过渡
    if (animation) {
      elRef.value.style.transition = 'width 1s, height 1s'
    }
    //entries
    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(elRef.value)
  }

  // 显示加载状
  function showLoading() {
    if (!chartInstance) {
      initCharts()
    }
    chartInstance?.showLoading('default', {
      text: '加载中',
      color: '#007aff',
      textColor: '#020f22',
      maskColor: 'rgba(255, 255, 255, 0.8)',
      zlevel: 0,
      // 字体大小。从 `v4.8.0` 开始支持。
      fontSize: 12,
      // 是否显示旋转动画（spinner）。从 `v4.8.0` 开始支持。
      showSpinner: true,
      // 旋转动画（spinner）的半径。从 `v4.8.0` 开始支持。
      spinnerRadius: 10,
      // 旋转动画（spinner）的线宽。从 `v4.8.0` 开始支持。
      lineWidth: 3,
      // 字体粗细。从 `v5.0.1` 开始支持。
      fontWeight: 'normal',
      // 字体风格。从 `v5.0.1` 开始支持。
      fontStyle: 'normal',
      // 字体系列。从 `v5.0.1` 开始支持。
      fontFamily: 'sans-serif',
    })
  }
  // 显示加载状
  function hideLoading() {
    if (!chartInstance) {
      initCharts()
    }
    chartInstance?.hideLoading()
  }

  onMounted(() => {
    window.addEventListener('resize', resize)
    if (autoChartSize) watchEl()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resize)
  })

  function getLinearGradientColor(
    x: number,
    y: number,
    x2: number,
    y2: number,
    colorStops: any,
    globalCoord?: boolean,
  ) {
    return new echarts.graphic.LinearGradient(x, y, x2, y2, colorStops, globalCoord)
  }

  return {
    setOption,
    getInstance,
    showLoading,
    hideLoading,
    getLinearGradientColor,
  }
}
