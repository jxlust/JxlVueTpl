// node包，commonjs规范
const path = require('path')
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')

// 打包的入口文件
const entryDir = path.resolve(__dirname, '../src/jxlp')
// 出口文件夹
const outDir = path.resolve(__dirname, '../lib')
// vite基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()],
})
// rollup配置
const rollupOptions = {
  // 确保外部化处理那些你不想打包进库的依赖
  external: ['vue'],
  output: {
    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    globals: {
      vue: 'Vue',
    },
  },
}
// 全量打包构建
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name: 'index', // umd的变量名
        fileName: 'index',
        // fileName: (format) => `index.${format}.js`, // 输出文件名
        formats: ['es', 'umd'],
      },
      outDir,
    },
  })
}
const startBuild = async () => {
  await buildAll()
}

startBuild()
