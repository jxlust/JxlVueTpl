## vue3+vite 项目中搭建 vitest 测试环境

### 测试框架选择

为啥这里选用 vitest, 因为兼容 vite 的一些特殊方法，比如 import.meta.url、import.meta.glob 等 vite 提供的方法。老牌 jest，可以参考 jxlust-web-monorepo 里面的 jest

### 安装

pnpm install -D vitest happy-dom @testing-library/vue
