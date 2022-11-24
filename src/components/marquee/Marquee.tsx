import { doubleRaf, onMountedOrActivated, raf, useRect } from '@/vant-lib/vant-use'
// import { useNow, useDateFormat } from '@vueuse/core'
// import { ElIcon } from 'element-plus'
import './index.less'

const MARQUEE_SPEED = 60 //跑马灯速度：60px/s
const MARGIN_LEFT = 160
export default defineComponent({
  name: 'MarqueeText',
  props: {
    content: String,
  },
  setup(props) {
    const { content } = toRefs(props)
    const titleRef = ref()
    const wrapRef = ref()
    let contentWidth = 0

    const marqueeState = reactive({
      offset: 0,
      duration: 0,
      copyOffset: 0,
      copyDuration: 0,
    })

    const startTextAnimation = () => {
      if (titleRef.value && wrapRef.value) {
        const textWidth = useRect(titleRef).width
        const wrapRefWidth = useRect(wrapRef).width
        // const scrollable = false;
        if (textWidth > wrapRefWidth) {
          //文字内容超过包裹的容器宽度时候才滚动播放跑马灯
          doubleRaf(() => {
            // wrapWidth = wrapRefWidth
            contentWidth = textWidth
            marqueeState.offset = -contentWidth
            marqueeState.duration = contentWidth / MARQUEE_SPEED
            marqueeState.copyOffset = -contentWidth - MARGIN_LEFT
            marqueeState.copyDuration = (contentWidth + MARGIN_LEFT) / MARQUEE_SPEED
          })
        }
      }
    }

    onMountedOrActivated(() => {
      startTextAnimation()
    })

    const onTransitionEnd = () => {
      marqueeState.offset = 0
      marqueeState.duration = 0
      marqueeState.copyOffset = 0
      marqueeState.copyDuration = 0
      console.log(111, 'end...')
      raf(() => {
        // use double raf to ensure animation can start
        doubleRaf(() => {
          marqueeState.offset = -contentWidth
          // + wrapWidth
          marqueeState.duration = contentWidth / MARQUEE_SPEED

          marqueeState.copyOffset = -contentWidth - MARGIN_LEFT
          marqueeState.copyDuration = (contentWidth + MARGIN_LEFT) / MARQUEE_SPEED
        })
      })
    }
    onMounted(() => {
      startTextAnimation()
    })
    //渲染跑马灯
    const renderMarquee = () => {
      const style = {
        transform: marqueeState.offset ? `translateX(${marqueeState.offset}px)` : '',
        transitionDuration: `${marqueeState.duration}s`,
      }
      const copyStyle = {
        transform: marqueeState.copyOffset ? `translateX(${marqueeState.copyOffset}px)` : '',
        transitionDuration: `${marqueeState.copyDuration}s`,
      }
      return (
        <div class={'marquee-text'} ref={wrapRef}>
          <span style={style} class={'marquee-text__content'} ref={titleRef}>
            {content.value || '共xxxxxxx'}
          </span>
          <span
            style={copyStyle}
            onTransitionend={onTransitionEnd}
            class={['marquee-text__content', 'is-copy']}
            ref={titleRef}
          >
            {content.value || '共xxxxxxx'}
          </span>
        </div>
      )
    }

    onUnmounted(() => {})

    return () => <div class={'my-marquee'}>{renderMarquee()}</div>
  },
})
