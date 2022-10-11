
import { debounce } from 'lodash-es';
import { type ExtractPropTypes } from 'vue';
import { AUTO_ROWA, ROW_GAP, WATER_BOX_KEY } from './WaterBox';


const waterItemProps = {
  url: String,
  text: String,
  id: String
}

export type WaterItemType = ExtractPropTypes<typeof waterItemProps>;

const imageLoadAsync = (url: string) => {
  return new Promise((resolve, reject) => {
    const createImage = new Image();
    createImage.src = url;
    createImage.onload = () => {
      const height = createImage.height;
      const width = createImage.width;
      resolve([width, height]);
    }

    createImage.onerror = () => {
      reject(new Error('load error'))
    }
  })


}

export default defineComponent({
  props: waterItemProps,
  setup(props) {
    const { url, text, id } = { ...props };
    const boxItemRef = ref<HTMLElement>();
    const descRef = ref<HTMLElement>();
    const loadingEnd = ref(false);
    const loadSuccess = ref(false);
    const imgUrl = ref('');
    const parent = inject(WATER_BOX_KEY);
    const computedBoxSpan = async () => {
      if (!url) {
        return;
      }
      const boxItemWidth = boxItemRef.value?.clientWidth || 0;
      const descHeight = descRef.value?.clientHeight || 0;

      let height, width, showHeight;
      try {
        let result: any = await imageLoadAsync(url);
        width = result[0];
        height = result[1];
        // console.log('图片原始size:', width, height);
        showHeight = height * boxItemWidth / width;
        // console.log('加载后宽高', boxItemWidth, showHeight);
        imgUrl.value = url;
        loadSuccess.value = true;
      } catch (_) {
        showHeight = 200;
        loadSuccess.value = false;
      }

      //计算逻辑grid布局 span块的逻辑计算
      // imgHeight = span * gridAutoRows + (span - 1) * rowGap;
      // imgHeight = span * 1 + (span - 1) * 10 = 11 * span - 10
      // span = imgHeigt + 10 / 11
      const spanSize = Math.round((showHeight + descHeight + ROW_GAP) / (ROW_GAP + AUTO_ROWA));
      // console.log('orgin span:', ((showHeight + descHeight + ROW_GAP) / (ROW_GAP + AUTO_ROWA)));
      boxItemRef.value && (boxItemRef.value.style.cssText = `grid-row: auto / span ${spanSize};`);

      loadingEnd.value = true;
      parent?.updateStatus(props.id)

    }
    const windowResize = debounce(() => {
      computedBoxSpan();
    }, 300)
    onMounted(() => {
      computedBoxSpan();
      window.addEventListener('resize', windowResize, { passive: true });
    })

    onUnmounted(() => {
      window.removeEventListener('resize', windowResize)
    })

    const renderImage = () => {
      if (imgUrl && loadSuccess.value) {
        return <img class={'show-img'} data-url={url} alt="" src={imgUrl.value} />
      } else {
        return <div class={'error-img'}></div>
      }

    }
    return () => (
      <div class={'box-item'} ref={boxItemRef}>
        {renderImage()}
        <div class={['box-item__desc', { 'show': loadingEnd.value }]} ref={descRef}>
          {text}
        </div>
      </div>
    )

  }
})
