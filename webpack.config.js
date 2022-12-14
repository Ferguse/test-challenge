const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  bail: isProduction,
  devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: isProduction
      ? 'js/bundle.[contenthash:8].js'
      : 'js/bundle.js',
    chunkFilename: isProduction
      ? 'js/[name].[contenthash:8].chunk.js'
      : 'js/[name].chunk.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    open: true,
    hot: true,
    port: 3000,
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    },
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: { comments: false }
        },
        extractComments: false
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /.(css|scss)$/,
        exclude: /\.module\.(css|scss)$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: { sassOptions: { outputStyle: 'expanded' }}
          }
        ]
      },
      {
        test: /.(css|scss)$/,
        include: /\.module\.(css|scss)$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 2, modules: true }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: { sassOptions: { outputStyle: 'expanded' }}
          }
        ]
      },
      {
        test: /.(bmp|jpg|jpeg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.svg$/,
        use: [
          '@svgr/webpack',
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '../fonts'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, './public/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: false,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash:8].css',
      chunkFilename: 'css/[id].[contenthash:8].css'
    }),
    new CopyPlugin({
      patterns: [{
        from: 'public',
        to: path.join(__dirname, 'build'),
        globOptions: {
          ignore: ['**/index.html']
        },
      }]
    }),
    new Dotenv(),
    isDevelopment && new CaseSensitivePathsPlugin(),
    isProduction && new webpack.NoEmitOnErrorsPlugin(),
  ].filter(Boolean)
};
