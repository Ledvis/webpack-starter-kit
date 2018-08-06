const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const StyleLintPlugin = require('stylelint-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    // new StyleLintPlugin({
    //   context: './src/scss',
    //   configFile: './.stylelintrc',
    // }),
    new UglifyJSPlugin({
      test: /\.js($|\?)/i,
      exclude: /.(node_modules|bootstrap|jquery)$/,
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: {
          warnings: false,
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
      },
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      maxFileSize: 1700000,
      optipng: {
        optimizationLevel: 3,
      },
      svgo: {
        plugins: [{
          cleanupIDs: false,
        }],
      },
      plugins: [
        imageminMozjpeg({
          quality: 70,
        }),
      ],
    }),
  ],
});
