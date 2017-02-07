const path = require('path')
var webpack           = require('webpack')
var base            = require('./webpack.base.config')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var PrerenderSpaPlugin = require('prerender-spa-plugin')

module.exports = Object.assign({}, base, {
  target: 'node',
  devtool: false,
  entry: './src/server-entry.js',
  output: Object.assign({}, base.output, {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  }),
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
	new CopyWebpackPlugin([{
      from: './index.html',
      to: '.'
    }]),
	new PrerenderSpaPlugin(
		path.join(__dirname, '../dist'),
		[ '/','/how-to-use','/intro','/topic/cyberbullying','/topic/directors-election','/topic/closelyheld','/topic/distant-education' ]
	)
  ]
})