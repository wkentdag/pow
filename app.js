require('dotenv').config()
const path = require('path')
const HardSourcePlugin = require('hard-source-webpack-plugin')
const standard = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('babel-preset-latest')
const Wordpress = require('spike-wordpress')
const lost = require('lost')
const fontMagician = require('postcss-font-magician')

const locals = {}

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss'
  },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', '_cache/**', 'readme.md', 'yarn.*', '*.log'],
  reshape: (ctx) => {
    return standard({
      webpack: ctx,
      locals: locals
    })
  },
  postcss: (ctx) => {
    let css = cssStandards({ webpack: ctx })
    let otherPlugins = [lost, fontMagician]
    otherPlugins.forEach(plugin => css.plugins.push(plugin()))
    return css
  },
  babel: { presets: [jsStandards] },
  plugins: [
    new Wordpress({
      site: process.env.wordpress_url,
      addDataTo: locals,
      posts: [
        {
          name: 'interviews',
          category: 'interviews',
          number: 10,
          transform: (post) => {
            post._url = `/interviews/${post.slug}`
            return post
          },
          template: {
            path: './views/_interview.sgr',
            output: (item) => `interviews/${item.slug}.html`
          }
        },
        {
          name: 'recent_posts',
          number: 10,
          transform: (post) => {
            post._url = `/posts/${post.slug}`
            return post
          },
          template: {
            path: './views/_post.sgr',
            output: (item) => `posts/${item.slug}.html`
          }
        }
      ]
    }),
    new HardSourcePlugin({
      environmentPaths: { root: __dirname },
      recordsPath: path.join(__dirname, '_cache/records.json'),
      cacheDirectory: path.join(__dirname, '_cache/hard_source_cache')
    })
  ]
}
