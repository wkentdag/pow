const path = require('path')
const HardSourcePlugin = require('hard-source-webpack-plugin')
const standard = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('babel-preset-latest')
const pageId = require('spike-page-id')
const lost = require('lost')
const fontMagician = require('postcss-font-magician')

const fs = require('fs')
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'))

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss'
  },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', '_cache/**', 'readme.md'],
  reshape: (ctx) => {
    return standard({
      webpack: ctx,
      locals: { pageId: pageId(ctx), foo: 'bar', data }
    })
  },
  postcss: (ctx) => {
    let css = cssStandards({ webpack: ctx })
    let otherPlugins = [lost, fontMagician]
    otherPlugins.forEach(plugin =>
      css.plugins.push(plugin())
    )
    return css
  },
  babel: { presets: [jsStandards] },
  plugins: [
    new HardSourcePlugin({
      environmentPaths: { root: __dirname },
      recordsPath: path.join(__dirname, '_cache/records.json'),
      cacheDirectory: path.join(__dirname, '_cache/hard_source_cache')
    })
  ]
}
