const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry:  {
    // Components for '/config' route
    semantic: path.join(__dirname, 'src/configure-webpack.js'),
    background: path.join(__dirname, 'src/background.js'),
    contentscripts: path.join(__dirname, 'src/contentscript.js'),
  },
  output: {
    path: path.join(__dirname, 'bundles'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
      test: /\.(eot|png|svg|[ot]tf|woff2?)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader',
      query: {limit: 10000}
    },
      { 
        test: /\.css$/, 
        loaders: ['style-loader', 'css-loader'] },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        query: {
          presets: [
            'react', 
            ['env', { 
              "modules": false,
              "targets": {
                "browsers": ["last 2 Chrome versions"]
              }
            }]
          ],
          'plugins': [],
        }
      }
    ]
  },
};