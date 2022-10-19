import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vuedts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vuedts()],
  resolve: {
    alias: [
      {
        find: '@jxlp',
        replacement: resolve(__dirname, './'),
      },
      {
        find: '@img',
        replacement: resolve(__dirname, './assets/'),
      },
    ],
  },
  build: {
    outDir: 'lib', //输出文件名称
    lib: {
      entry: resolve(__dirname, './index.ts'), //指定组件编译入口文件
      name: 'jxlp-ui',
      // formats: ['es'],
      fileName: 'index',
    }, //库编译模式配置
    assetsInlineLimit: 2048, // 单位字节（1024等于1kb） 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境去除console
        drop_debugger: true, // 生产环境去除debugger
      },
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    }, // rollup打包配置
  },
})
