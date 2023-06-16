// const path = require('path')
// const fs = require('fs')
// const crypto = require('crypto')
import path from 'node:path'
import fs from 'node:fs'
import crypto from 'node:crypto'
import type { Plugin } from 'vite'

function startCreateVersion() {
  const versionObj = {
    version: crypto.randomUUID() + new Date().getTime(),
  }
  const filedir = path.join('./public/', 'test.json')
  console.log('f:', filedir)
  const content = JSON.stringify(versionObj)

  fs.writeFile(filedir, content, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
}

export default function VitePluginPrint(params?: 'pre' | 'post'): Plugin {
  return {
    name: 'vite-plugin-print',
    // 指明它们仅在 'build' 或 'serve' 模式时调用
    apply: 'build',
    // pre 会较于 post 先执行
    enforce: params,
    config(userConfig, env) {
      console.log('printdemo:', userConfig)
      console.log('env:', env)
      // 可以做进一步的修改，会自动合入当前的配置
      // return
    },
    configResolved(resolvedConfig) {
      console.log('这里是configResolved钩子')
    },
    configureServer(server) {
      console.log('这里是configureServer钩子')
    },
    transformIndexHtml(html) {
      console.log('这里是transformIndexHtml钩子')
    },
    buildStart() {
      console.log('build start.')
      startCreateVersion()
    },
    buildEnd() {
      console.log('build end.')
    },
  }
}
