<script setup>
  import { ref, computed, watch, watchEffect, effectScope, getCurrentScope, onScopeDispose } from 'vue'

  const counter = ref(2)

  // 定义第一个侦听管家
  const scope = effectScope()
  scope.run(() => {
    const doubled = computed(() => counter.value * 2)
    watch(doubled, () => console.log(doubled.value))
    watchEffect(() => console.log('Count: ', doubled.value))
  })
  //scope.stop()  // 调用它，可以取消scope内的侦听。执行这个不会触发onScopeDispose事件

  //  定义第二个侦听管家
  const scope2 = effectScope()
  scope2.run(() => {
    const doubled2 = computed(() => counter.value * 3)
    watch(doubled2, () => console.log(doubled2.value))
    watchEffect(() => console.log('Count: ', doubled2.value))
  })
  //scope2.stop() // 调用它，可以取消scope2内的侦听。执行这个不会触发onScopeDispose事件
  // 获取当前侦听实例
  const allScope = getCurrentScope()
  // 执行 allScope.stop()时会触发 onScopeDispose 事件
  // 当前页面或组件注销时会触发 onScopeDispose 事件
  onScopeDispose(() => {
    console.log('已停止所有侦听')
    // to do...
  })

  // 5秒后停止所有侦听，此时会触发 onScopeDispose 事件
  setTimeout(() => {
    allScope?.stop()
  }, 5000)
</script>
