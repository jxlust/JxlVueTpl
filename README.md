# 我的 Vue 3 + TypeScript + Vite 模板

## 一、技术栈

- 编程语言：TypeScript 4.x + JavaScript
- 构建工具：Vite 2.x
- 前端框架：Vue 3.x
- 路由工具：Vue Router 4.x
- 状态管理：Vuex 4.x
- PC 端 UI 框架：Element Plus
- H5 端 UI 框架：vant
- CSS 预编译：Stylus / Sass / Less
- HTTP 工具：Axios
- Git Hook 工具：husky + lint-staged
- 代码规范：EditorConfig + Prettier + ESLint + Airbnb JavaScript Style Guide
- 提交规范：Commitizen + Commitlint
- 单元测试：vue-test-utils + jest + vue-jest + ts-jest
- 自动部署：GitHub Actions

## git husky 配置

1. 安装脚本 husky.sh

```shell
npm install prepare
```

2. 配置

```shell
git config core.hooksPath .husky
chmod 700 .husky/*
# chmod +x .husky/pre-commit
```

3. 提交例子：

```shell
git commit -m "chore: updated md.json"
git commit -m  "fix(server): send xxxx"
git commit -m "feat(blog): add comment section"
```
