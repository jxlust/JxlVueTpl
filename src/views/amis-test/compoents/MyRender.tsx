import 'amis/sdk/sdk.js'
import 'amis/lib/themes/default.css'

export default defineComponent({
  name: 'MyAmisRender',
  props: {
    amisjson: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    onMounted(() => {
      // @ts-ignore
      const amis = amisRequire('amis/embed')
      console.log(amis)
      const amisScoped = amis.embed('#box', props.amisjson)
    })

    return () => <div id="box"></div>
  },
})
