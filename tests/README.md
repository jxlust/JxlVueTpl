## vue3+vite 项目中搭建 vitest 测试环境

### 测试框架选择

为啥这里选用 vitest, 因为兼容 vite 的一些特殊方法，比如 import.meta.url、import.meta.glob 等 vite 提供的方法。老牌 jest，可以参考 jxlust-web-monorepo 里面的 jest

### 安装

```
pnpm install -D vitest happy-dom @testing-library/vue
```

### 配置

1. vite.config.ts

```js
/// <reference types="vitest" />

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
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
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

2. tsconfig.json

```json
{
  ...
  "compilerOptions": {
    ...
    // 单元测试的支持
    "types": ["vitest/globals"],
    // 解决测试文件中的 '--isolatedModules'报错
    "isolatedModules": false
  },
  ...
}

```

3. 命令

```json
{
  "test": "vitest"
}
```

4. 测试文件 xxx.test.ts

```ts
import { render } from '@testing-library/vue'
// 导入你要测试的组件
import Test from './Test'

test('Test.tsx should work', () => {
  // 渲染组件
  const { getByText } = render(Test)
  // assert output 断言输出结果
  getByText('test: 0')
})
```

> 参考网站 [_https://blog.csdn.net/weixin_39559449/article/details/126465458_](https://blog.csdn.net/weixin_39559449/article/details/126465458)
