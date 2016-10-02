const standard = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const pageId = require('spike-page-id')
const {UglifyJsPlugin, DedupePlugin, OccurrenceOrderPlugin} = require('webpack').optimize
const lost = require('lost')
const fontMagician = require('postcss-font-magician')

module.exports = {
  // disable source maps
  devtool: false,
  // webpack optimization and minfication plugins
  plugins: [
    new UglifyJsPlugin(),
    new DedupePlugin(),
    new OccurrenceOrderPlugin()
  ],
  // image optimization
  module: {
    loaders: [{ test: /\.(jpe?g|png|gif|svg)$/i, loader: 'image-webpack' }]
  },
  // TODO add html minification plugin
  reshape: (ctx) => {
    return standard({
      webpack: ctx,
      locals: { pageId: pageId(ctx), foo: 'bar' },
      minify: true
    })
  },
  // adds css minification plugin
  postcss: (ctx) => {
    let css = cssStandards({
      webpack: ctx,
      minify: true,
      warnForDuplicates: false  //  cssnano includes autoprefixer
    })
    let otherPlugins = [lost, fontMagician]
    otherPlugins.forEach(plugin =>
      css.plugins.push(plugin())
    )
    return css
  }
}
