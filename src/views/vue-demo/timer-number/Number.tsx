import { useNow, useDateFormat } from '@vueuse/core'
import { Transition } from 'vue'
import './index.scss'

const nowDate = useNow()

const hours = useDateFormat(nowDate, 'HH')
const minute = useDateFormat(nowDate, 'mm')
const second = useDateFormat(nowDate, 'ss')

export const TimerNumber = () => {
  const renderNumber = () => {
    return <span class={'number'}>{second.value}</span>
  }
  return <div class={'number-wrap'}>{renderNumber()}</div>
}

//🍎 update key to render span every time
const renderNumber = (number: string | number) => {
  // transtion can set mode="out-in" etc..
  return (
    <div class={'clock-item'}>
      <Transition name={'slide-up'}>
        <span key={number} class={'number'}>
          {number}
        </span>
      </Transition>
    </div>
  )
}

export const SlideNumber = () => {
  return (
    <div class={'clock-wrap'}>
      {renderNumber(hours.value)} : {renderNumber(minute.value)} : {renderNumber(second.value)}
    </div>
  )
}

//倒计时组件
const startTime = Date.now()
export const CountDownSlider = (props: any) => {
  const { count } = props
  const sTime = startTime + (count ?? 60 * 1000)
  const diffTime = computed(() => {
    const diff = ((sTime - nowDate.value.getTime()) / 1000) | 0
    return diff
  })

  const renderCountDown = () => {
    const ten = (diffTime.value / 10) | 0
    const bits = diffTime.value % 10
    return (
      <>
        {renderNumber(ten)} 🍎
        {renderNumber(bits)}
      </>
    )
  }
  return <div class={'clock-wrap'}>{diffTime.value >= 0 ? renderCountDown() : <span>The End</span>}</div>
}

//define vue3 component can get current scope
export const CountComponent = defineComponent({
  name: 'CountSlide',
  directives: {
    // 'v-once': vOnce,
  },
  setup(props) {
    console.log('props:', props)
    //清除副作用
    const tryOnScopeDispose = (fn) => {
      console.log('this current scope:', getCurrentScope())
      if (getCurrentScope()) {
        onScopeDispose(fn)
        return true
      }
      return false
    }
    const effectFunction = () => {
      console.log('i am a effectt function.')
    }
    tryOnScopeDispose(effectFunction)

    const number = ref(100)
    const handleNumberClick = () => {
      number.value++
    }

    let vOnce = true
    let cacheNumber = 0
    const testRender = () => {
      if (vOnce) {
        vOnce = false
        cacheNumber = unref(number)
        return <i> {number.value}</i>
      } else {
        return <i>{cacheNumber}</i>
      }
    }
    return () => <span onClick={handleNumberClick}>{testRender()}</span>
  },
})
