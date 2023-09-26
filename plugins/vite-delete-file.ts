import { Plugin } from 'vite'
import { deleteAsync } from 'del'

interface DeleteFileConf {
  hook?: string
  target: string | string[]
}
export default function viteDeleteFile(config: DeleteFileConf): Plugin {
  const { hook = 'closeBundle', target = [] } = config
  let deleted = false
  return {
    name: 'vite-delete-file',
    apply: 'build',
    [hook]: async () => {
      if (deleted) {
        return
      }
      const paths = await deleteAsync(target)
      console.log('paths:', paths)
      deleted = true
    },
  }
}
