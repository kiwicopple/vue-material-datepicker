var path = require('path');
var webpack = require('webpack');

module.exports = {
  // entry: path.resolve(__dirname, ('../src/main.js')),
  entry: path.resolve(__dirname, ('../src/Datepicker.vue')),
  output: {
    path: path.resolve(__dirname, ('../dist/')),
    filename: 'vue-material-datepicker.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  vue: {
    loaders: {
      scss: 'style!css!sass'
    }
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.scss'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../demo/assets'),
      'components': path.resolve(__dirname, '../demo/components')
    }
  },
  plugins: []
};
