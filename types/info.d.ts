// 定义全局类型、接口、模块、变量等等
type TestType = 'add' | 'reduce' | 'save'
interface SaveImpl {
  id: string
}

declare const GlobalColor: 1 | 2 | 3
declare function addFunction(a: number, b: number): number
// declare function addFunctionCalc(a: number, b: number) {
//   return a + b
// }
