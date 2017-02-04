var path = require('path')

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src/javascripts'),
  entry: './main',
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.html$/, loader: ['html-loader'] }
    ]
  },
  output: {
    filename: 'public/js/main.js'
  }
}
