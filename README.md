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

## CSS Module

1. 需要 css-loader
2. 文件命名 xxx.module.scss xxx.module.css
3.

## gzip 压缩

1. vite-plugin-compression
2. 服务器配置 gzip

```shell
# http{}下配置：
gzip on;
#不压缩临界值，大于1K的才压缩，一般不用改
gzip_min_length 1k;
#buffer，就是，嗯，算了不解释了，不用改
gzip_buffers 4 16k;
#用了反向代理的话，末端通信是HTTP/1.0,默认是HTTP/1.1
#gzip_http_version 1.0;
#压缩级别，1-10，数字越大压缩的越好，时间也越长，看心情随便改吧
gzip_comp_level 2;
#进行压缩的文件类型，缺啥补啥就行了，JavaScript有两种写法，最好都写上吧，总有人抱怨js文件没有压缩，其实多写一种格式application/javascript 就行了
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
#跟Squid等缓存服务有关，on的话会在Header里增加"Vary: Accept-Encoding"
gzip_vary off;
#IE6对Gzip不怎么友好，不给它Gzip了
gzip_disable "MSIE [1-6]\.";

```

```shell
# 安装nginx ngx_http_gzip_module模块
./configure --prefix=/usr/local/nginx --with-http_gzip_static_module
#make 安装
make
#千万不要执行make install！执行make install会直接将之前安装的nginx给覆盖掉。
#make命令执行成功之后会在objs目录下生成nginx可执行文件，直接使用此nginx替换掉原本的nginx即可
```

```shell
#静态压缩：当已经有gz压缩文件时，不再对源文件进行压缩生成gz。减小服务器压力。

server {
	listen 8080;     #1.你想让你的这个项目跑在哪个端口
    server_name 120.48.9.40;     #2.当前服务器ip
    location / {
       root   /usr/web/myBlog/dist/;     #3.dist文件的位置(根据自己dist包放置的位置决定)
       try_files $uri $uri/ /index.html;     #4.重定向,内部文件的指向(照写，history和bash通用，这里配置主要是兼容history模式，进行一个404的重定向)
        gzip_static on; #静态压缩
    }
}
```
