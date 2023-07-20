// 定义全局类型、接口、模块、变量等等
type TestType = 'add' | 'reduce' | 'save'
interface SaveImpl {
  id: string
}
declare const GlobalColor: 1 | 2 | 3
/**
 * test 过期方法
 * @param a
 * @param b
 * @deprecated
 */
declare function addFunction(a: number, b: number): number
// declare function addFunctionCalc(a: number, b: number) {
//   return a + b
// }

interface TestInfo {
  id: string
  /**
   * 开关
   * @version 1.0
   * @default true
   */
  flag: boolean
}
