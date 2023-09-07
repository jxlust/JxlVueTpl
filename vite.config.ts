/// <reference types="vitest" />

import { ConfigEnv, loadEnv, UserConfig, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import compressPlugin from 'vite-plugin-compression'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { viteFilemanagerHandler } from './filemanage.config.js'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VitePluginPrint from './plugins/vite-print-demo'
import vueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import viteRemoveEs from './plugins/vite-remove-es'

const CWD = process.cwd()

// https://cn.vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 环境变量
  const { VITE_BASE_URL } = loadEnv(mode, CWD)
  return {
    root: '.',
    base: VITE_BASE_URL, // 设置打包路径
    css: {
      modules: {
        localsConvention: 'camelCase', // 默认只支持驼峰，修改为同时支持横线和驼峰
      },
      preprocessorOptions: {
        scss: {
          charset: false,
          // additionalData: '@import "./src/styles/scss/var.scss";',
          additionalData: `@use "@/styles/scss/var.scss" as *;`,
        },
        less: {
          charset: false,
        },
      },
      // TODO 构建包含@charset问题 https://github.com/vitejs/vite/issues/5833
      // charset: false,
      // postcss: {
      //   plugins: [],
      // },
    },
    plugins: [
      // VitePluginPrint(),
      // vueI18nPlugin({
      //   include: resolve(__dirname, './src/i18n/locales/**'),
      // }),
      vue(),
      vueJsx(),
      DefineOptions(),
      // WindiCSS(),
      // createSvgIconsPlugin({
      //   // 要缓存的图标文件夹
      //   iconDirs: [resolve(__dirname, 'src/assets/svg')],
      //   // 执行 icon name 的格式
      //   symbolId: 'icon-[name]',
      // }),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      //模块自动导入配置auto-imports.d.ts
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: true,
        imports: ['vue', 'vue-router'],
      }),
      //组件按需引入插件
      Components({
        dts: true,
        // VantResolver
        resolvers: [ElementPlusResolver()],
      }),
      // compressPlugin({
      //   ext: '.gz',
      //   deleteOriginFile: false, // 是否删除原始文件
      // }),
      // viteFilemanagerHandler(mode),
      viteRemoveEs({
        isRemove: true,
      }),
    ],
    // 使用这个必须在上面加/// <reference types="vitest" /> 不然会有类型报错
    test: {
      // jest like test api
      globals: true,
      // 模拟dom环境
      environment: 'happy-dom',
      // 支持tsx,jsx
      transformMode: {
        web: [/.[tj]sx$/],
      },
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
        {
          find: 'rootsrc',
          replacement: resolve(__dirname, './src'),
        },
        { find: '~', replacement: resolve(__dirname, './') },
        { find: 'vue', replacement: 'vue/dist/vue.esm-bundler.js' },
      ],
      // 'vue': 'vue/dist/vue.esm-bundler.js' // 定义vue的别名，如果使用其他的插件，可能会用到别名
    },
    build: {
      cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      sourcemap: mode !== 'production', // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
      target: 'modules', // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
      outDir: 'www', //指定输出路径
      assetsDir: 'assets', // 指定生成静态资源的存放路径
      chunkSizeWarningLimit: 550, // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
      assetsInlineLimit: 4096, // 单位字节（1024等于1kb） 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
      minify: 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
      terserOptions: {
        compress: {
          drop_console: mode === 'production', // 生产环境去除console
          drop_debugger: mode === 'production', // 生产环境去除debugger
        },
      },
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index-test.html'),
        },
        output: {
          // manualChunks: {
          //   'vue-vendor': ['vue', 'vue-router', 'pinia'],
          // },
          // 最小化拆分包
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
          entryFileNames: 'js/[name].[hash].js',
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'js/[name].[hash].js',
          assetFileNames: '[ext]/[name].[hash].[ext]',
          // 拆分js到模块文件夹
          // chunkFileNames: (chunkInfo) => {
          //   const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
          //   const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
          //   return `js/${fileName}/[name].[hash].js`
          // },
        },
      },

      // rollupOptions: {
      //   input: {
      //     main: resolve(__dirname, 'index.html'),
      //     login: resolve(__dirname, '/login/index.html'),
      //     pager2: resolve(__dirname, 'src/pager2/index.html'),
      //   },
      //   output: {
      //     manualChunks: {
      //       // jsonWorker: [`${prefix}/language/json/json.worker`],
      //       // cssWorker: [`${prefix}/language/css/css.worker`],
      //       // htmlWorker: [`${prefix}/language/html/html.worker`],
      //       // tsWorker: [`${prefix}/language/typescript/ts.worker`],
      //       // editorWorker: [`${prefix}/editor/editor.worker`],
      //     },
      //   },
      // },
    },
    optimizeDeps: {
      include: ['@vueuse/core', 'element-plus', 'vant', 'lodash-es', 'vuedraggable'],
    },
    server: {
      host: '0.0.0.0',
      port: 8080, // 设置服务启动端口号
      open: false, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域

      // 设置代理，根据项目实际情况配置
      // proxy: {
      //   '/api': {
      //     target: 'https://xx/api/admin/',
      //     changeOrigin: true,
      //     secure: false,
      //     rewrite: (path) => path.replace('/api/', '/'),
      //   },
      // },
    },
  }
})
