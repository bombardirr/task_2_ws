const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// to understand that we are in dev mode for 'hmr' or 'hot' mode (hot module replacement)
// install package cross-env
// in package.json change dev script:
// "dev": "cross-env NODE_ENV=development webpack --mode development",
//  "build": "cross-env NODE_ENV=production webpack --mode production",
//  "watch": "cross-env NODE_ENV=development webpack --mode development --watch",
//  "start": "cross-env NODE_ENV=development webpack-dev-server --mode development --open"

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
const config = {
  splitChunks: {
    chunks: "all"
  }
}

if (isProd) {
  config.minimizer = [
    new TerserPlugin(),
    new OptimizeCssAssetsPlugin()
  ]
}

return config
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.js',
    analytics: './analytics.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            },
          },
          'css-loader'
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            },
          },
          'css-loader',
          'less-loader'
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      }
      ,
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use:
          ['file-loader']
      }
      ,
      {
        test: /\.xml$/,
        use:
          ['xml-loader']
      }
      ,
      {
        test: /\.csv$/,
        use:
          ['csv-loader']
      }
      ,
    ],
  },
};