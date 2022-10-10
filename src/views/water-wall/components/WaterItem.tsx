import { debounce } from 'lodash-es'
import { type ExtractPropTypes } from 'vue'
import { AUTO_ROWA, ROW_GAP } from './WaterBox'

const waterItemProps = {
  url: String,
}

export type WaterItemType = ExtractPropTypes<typeof waterItemProps>

export default defineComponent({
  props: waterItemProps,
  setup(props) {
    const { url } = { ...props }
    const boxItemRef = ref<HTMLElement>()
    const imgUrl = ref('')

    const computedBoxSpan = () => {
      console.log('uuuupdat.')
      if (!url) {
        return
      }
      const boxItemWidth = boxItemRef.value?.clientWidth || 0
      const createImage = new Image()
      createImage.src = url
      createImage.onload = () => {
        const height = createImage.height
        const width = createImage.width
        console.log('图片原始size:', width, height)
        const showHeight = (height * boxItemWidth) / width
        console.log('加载后宽高', boxItemWidth, showHeight)

        imgUrl.value = url

        //计算逻辑grid布局 span块的逻辑计算
        // imgHeight = span * gridAutoRows + (span - 1) * rowGap;
        // imgHeight = span * 1 + (span - 1) * 10 = 11 * span - 10
        // span = imgHeigt + 10 / 11
        const spanSize = ((showHeight + ROW_GAP) / (ROW_GAP + AUTO_ROWA)) | 0
        console.log((showHeight + ROW_GAP) / (ROW_GAP + AUTO_ROWA))
        boxItemRef.value && (boxItemRef.value.style.cssText = `grid-row: auto / span ${spanSize};`)
      }
    }
    const windowResize = debounce(() => {
      computedBoxSpan()
    }, 300)
    onMounted(() => {
      computedBoxSpan()
      window.addEventListener('resize', windowResize, { passive: true })
    })

    onUnmounted(() => {
      window.removeEventListener('resize', windowResize)
    })

    return () => (
      <div class={'box-item'} ref={boxItemRef}>
        {imgUrl && <img class={'show-img'} data-url={url} alt="" src={imgUrl.value} />}
      </div>
    )
  },
})
