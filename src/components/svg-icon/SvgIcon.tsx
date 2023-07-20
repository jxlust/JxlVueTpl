import { isExternal } from '@/vant-lib/utils'
import './index.scss'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#333',
    },
    // SVG 图标名称或在线URL
    icon: {
      type: String,
      required: true,
    },
    // 图标类名
    className: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const isOnlineSvg = computed(() => isExternal(props.icon))
    const renderOnlineSvg = () => {
      const urlstring = `url('${props.icon}')`
      const onlineStyle = { '--svg-icon-url': urlstring }
      return <div style={onlineStyle} class={['svg-icon', 'svg-icon-online', props.className]}></div>
    }
    const renderLocalSvg = () => {
      const useId = `#icon-${props.icon}`
      return (
        <svg class={['svg-icon', props.className]} aria-hidden="true">
          <use xlinkHref={useId} />
        </svg>
      )
    }

    const renderSvg = () => {
      return isOnlineSvg.value ? renderOnlineSvg() : renderLocalSvg()
    }

    return renderSvg
  },
})
