const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

function startCreateVersion() {
  const versionObj = {
    version: crypto.randomUUID(),
  }
  // let p = path.resolve('./dist/www/')
  const filedir = path.join('./dist/www/', 'test.json')
  // console.log('f:', filedir)
  const content = JSON.stringify(versionObj)
  fs.writeFile(filedir, content, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
}
startCreateVersion()
