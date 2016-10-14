const utils = require('./utils')

module.exports = {
  //add...
  loaders: utils.cssLoaders(),
  postcss: [
    require('autoprefixer')({
      browsers: ['last 2 versions']
    })
  ]
}