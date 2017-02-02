module.exports = {
  devtool: 'source-map',
  entry: './src/javascripts/main',
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: '/node_modules/'
    }]
  },
  output: {
    filename: 'public/js/main.js'
  }
}
