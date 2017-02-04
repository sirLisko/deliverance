var path = require('path')

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src/javascripts'),
  entry: './main',
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]
  },
  output: {
    filename: 'public/js/main.js'
  }
}
