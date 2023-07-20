const AsyncModules: any = {}
const AllModules: any = {}
// 动态加载
const asyncModulesFiles = import.meta.glob(['./*.vue', './*.tsx'])
// 全部导出
const modulesFiles = import.meta.glob(['./*.vue', './*.tsx'], {
  eager: true,
})
// 采用动态加载的方式导出
for (const [key, value] of Object.entries(asyncModulesFiles)) {
  console.log('glob:', key, value)
  //名称  因为这里拿到的是  ./xxx/xxx.vue ，所以需要两层处理
  const moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1')
  //具体的内容，都是每个js中返回值  value.default
  AsyncModules[moduleName] = value
}

// 直接导出模块
for (const [key, value] of Object.entries(modulesFiles)) {
  console.log('glob:', key, value)
  //名称  因为这里拿到的是  ./xxx/xxx.vue ，所以需要两层处理
  const moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1')
  //具体的内容，都是每个js中返回值  value.default
  AllModules[moduleName] = value.default
}
export default AsyncModules
export { AllModules }
