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
    const renderComponent = (type: string, data: any, id: number) => {
      const MyComponent = getComponentName(type)
      return <MyComponent data={data} id={id} />
    }

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
