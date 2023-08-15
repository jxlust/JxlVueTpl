import { useRequest } from 'vue-request'
export const useApi = () => {
  const api = ref('')
  return {
    api,
  }
}

export const useSwr = () => {
  const test = (p1, p2) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('abc' + p1 + '_' + p2)
      }, 10000)
    })
  const { data, loading, error, run } = useRequest(test, {
    defaultParams: ['abc', 'efg'],
  })

  // 手动
  // run()
  console.log(data)
  return {
    data,
    loading,
    run,
    error,
  }
}
