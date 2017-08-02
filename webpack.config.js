const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry:  {
    // Components for '/config' route
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