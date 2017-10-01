module.exports = {
  NODE_ENV: '"production"',
module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
}
