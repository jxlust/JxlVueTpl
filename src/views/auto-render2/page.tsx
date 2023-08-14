import { ElTabs, ElTabPane } from 'element-plus'
// import { h } from 'vue';
const loaderComp = () => {
  // ...
  // return import modules
}
const asyncModules = loaderComp()

export default defineComponent({
  name: 'JTabsCard',
  setup() {
    const tabActiveName = ref<number>(-1)
    const handleTabClick = (item: any) => {
      console.log(item)
    }
    const renderData = [
      { id: 1, type: 'ecp', name: '办事流程', data: {} },
      { id: 2, type: 'file', name: '申请用印材料', data: {} },
      { id: 3, type: 'rich', name: '基本信息', data: {} },
    ]

    tabActiveName.value = renderData[0].id

    const getComponentName = (type: string) => {
      return asyncModules[`j-${type}-show`]
    }
    /**
     * 获取组件进行渲染
     * @param type
     * @param data
     * @param id
     * @returns
     */
    const renderComponent = (type: string, data: any, id: number) => {
      const MyComponent = getComponentName(type)
      return <MyComponent data={data} id={id} />
    }

    /**
     * 根据组件名称渲染
     * @param item
     * @returns
     */

    // const renderItemComp = (item: any) => {
    //   const { type, layout } = item
    //   const compName = layout ? `j-layout-${type}` : `j-${type}`
    //   // 按名称手动解析已注册的组件。然后再调用渲染函数渲染出来
    //   return h(resolveComponent(compName), {
    //     data: item.data,
    //   })
    // }

    return () => (
      <div class={'test'}>
        <ElTabs v-model={tabActiveName.value} class={'tabs'} onTab-click={handleTabClick}>
          {renderData.map((item) => (
            <ElTabPane label={item.name} name={item.id} key={item.id}>
              {/* {h(getComponentName(item.type), { data: item.data, id: item.id })} */}
              {renderComponent(item.type, item.data, item.id)}
            </ElTabPane>
          ))}
        </ElTabs>
      </div>
    )
  },
})
