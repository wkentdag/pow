require('dotenv').config()
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('babel-preset-latest')
const react = require('babel-preset-react')
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
  ignore: ['**/layout.sgr', '**/_*', '**/.*', '_cache/**', 'readme.md', '*.lock', '*.log'],
  reshape: (ctx) => {
    return htmlStandards({
      webpack: ctx,
      locals
    })
  },
  postcss: (ctx) => {
    let css = cssStandards({ webpack: ctx })
    let otherPlugins = [lost, fontMagician]
    otherPlugins.forEach(plugin => css.plugins.push(plugin()))
    return css
  },
  babel: { presets: [jsStandards, react] },
  plugins: [
    new Wordpress({
      site: process.env.wordpress_url,
      addDataTo: locals,
      posts: [
        {
          name: 'interviews',
          category: 'interviews',
          number: 10,
          template: {
            path: './views/_post.sgr',
            output: (item) => `/posts/${item.slug}.html`
          },
          transform: (post) => {
            post._url = `/posts/${post.slug}`
            return post
          }
        },
        {
          name: 'recent_posts',
          number: 10,
          template: {
            path: './views/_post.sgr',
            output: (item) => `posts/${item.slug}.html`
          },
          transform: (post) => {
            post._url = `/posts/${post.slug}`
            return post
          }
        }
      ]
    })
  ]
}
