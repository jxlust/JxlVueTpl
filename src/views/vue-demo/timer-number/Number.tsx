import { useNow, useDateFormat } from '@vueuse/core'
import { Transition } from 'vue'
import './index.scss'

const nowDate = useNow()
export const TimerNumber = () => {
  const seconds = useDateFormat(nowDate, 'ss')
  const renderNumber = () => {
    return <span class={'number'}>{seconds.value}</span>
  }

  return <div class={'number-wrap'}>{renderNumber()}</div>
}

export const SlideNumber = () => {
  const hours = useDateFormat(nowDate, 'HH')
  const minute = useDateFormat(nowDate, 'mm')
  const second = useDateFormat(nowDate, 'ss')

  //🍎 update key to render span every time
  const renderNumber = (number: string) => {
    return (
      <div class={'clock-item'}>
        <Transition name={'slide-up'} mode="out-in">
          <span key={number} class={'number'}>
            {number}
          </span>
        </Transition>
      </div>
    )
  }

  return (
    <div class={'clock-wrap'}>
      {renderNumber(hours.value)} : {renderNumber(minute.value)} : {renderNumber(second.value)}
    </div>
  )
}
