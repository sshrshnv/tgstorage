/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')
const HtmlPlugin = require('html-webpack-plugin')
const HtmlInjectPreloadPlugin = require('@principalstudio/html-webpack-inject-preload')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const DotenvPlugin = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const autoprefixer = require('autoprefixer')

const isProd = () => process.env.NODE_ENV === 'production'
const isDev = () => !isProd()
const isStage = () => process.env.BUILD_ENV === 'stage'
const isBundleAnalyzer = () => !!process.env.BUNDLE_ANALYZER

const resolveOptions = {
  extensions: [
    '.mjs', '.js', '.jsx', '.tsx', '.ts', '.js', '.json',
    '.wasm', '.css', '.styl', '.html', '.svg', '.jpg', '.png'
  ],
  alias: {
    '~': path.resolve('./src')
  }
}

const mainFields = ['esm2017', 'module', 'jsnext:main', 'browser', 'main']

const terserOptions = {
  compress: {
    ecma: 2019
  },
  output: {
    ecma: 2019,
    beautify: false,
    comments: false,
    ascii_only: true
  }
}

module.exports = [{
  mode: isDev() ? 'development' : 'production',

  target: 'web',

  entry: {
    app: './src/core/app.tsx'
  },

  output: {
    path: path.resolve('./build'),
    filename: isDev() ? `[name].js` : `[name].[contenthash:8].js`,
    chunkFilename: isDev() ? `[name].js` : `[name].[contenthash:8].js`,
    publicPath: process.env.ASSETS_HOST || '/'
  },

  experiments: {
    topLevelAwait: true
  },

  resolve: resolveOptions,

  module: {
    rules: [{
        test: /\.worker\.ts?$/,
        exclude: /node_modules\/(?!(idb-keyval|pako)\/).*/,
        use: [{
          loader: 'worker-loader'
        }, {
          loader: 'babel-loader'
        }]
      } ,{
        test: /\.m?[jt]sx?$/,
        exclude: /node_modules\/(?!(comlink)\/).*/,
        resolve: { mainFields },
        use: [{
          loader: 'babel-loader'
        }]
      }, {
        test: /\.styl$/,
        use: [{
          loader: isDev() ? 'style-loader' : MiniCssExtractPlugin.loader,
          options: {
            esModule: true,
          }
        }, {
          loader: 'css-loader',
          options: {
            esModule: true,
            modules: {
              localIdentName: isDev() ? '[name]__[local]--[hash:base64:8]' : '[hash:base64:8]',
              exportLocalsConvention: 'asIs'
            },
            sourceMap: isDev()
          }
        }, {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [autoprefixer],
            },
            sourceMap: isDev()
          }
        }, {
          loader: 'stylus-loader',
          options: {
            stylusOptions: {
              import: [path.resolve('./src/ui/styles/vars.styl')],
            },
            sourceMap: isDev()
          }
        }]
      }, {
        test: /\.css$/,
        use: [{
          loader: isDev() ? 'style-loader' : MiniCssExtractPlugin.loader,
          options: {
            esModule: true,
          }
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [autoprefixer],
            },
            sourceMap: isDev()
          }
        }]
      }, {
        test: /\.(woff2?|jpe?g|png|gif|mp4)$/,
        type: 'asset/resource'
      }, {
        test: /\.svg$/,
        use: ['preact-svg-loader'],
      }
    ]
  },

  plugins: [
    new DotenvPlugin({
      path: `./.env.${process.env.BUILD_ENV}`
    }),

    new HtmlPlugin({
      template: './src/core/app.html',
      filename: 'index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
      }
    }),

    new HtmlInjectPreloadPlugin({
      files: [{
        match: /app*\.css$/,
        attributes: { as: 'style' }
      }]
    }),

    isProd() ? new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].css'
    }) : () => {},

    /*isProd() ? new CopyPlugin({
      patterns: [
        { from: './src/app.webmanifest', to: './app-v1.webmanifest' },
        { from: './src/ui/images/*', to: './[name]-v1[ext]' },
      ]
    }) : () => {},*/
/*
    !workboxManifestInjected ? new WorkboxPlugin.InjectManifest({
      swDest: 'sw.js',
      swSrc: './src/sw/sw.ts',
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
    }) : () => {},
*/
    isDev() ? new webpack.HotModuleReplacementPlugin() : () => {},

    isBundleAnalyzer() ? new BundleAnalyzerPlugin({
      analyzerHost: '0.0.0.0',
      analyzerPort: 5002
    }) : () => {}
  ],

  optimization: {
    nodeEnv: isDev() ? 'development' : 'production',
    //chunkIds: 'named',
    splitChunks: {
      chunks: 'all'
    },
    concatenateModules: false,
    minimize: isProd(),
    minimizer: isProd() ? [
      new TerserPlugin({ terserOptions }),
      new CssMinimizerPlugin()
    ] : []
  },

  devtool: isDev() ? 'eval-cheap-module-source-map' : 'hidden-source-map',

  devServer: {
    https: true,
    host: '0.0.0.0',
    port: 5000,
    hot: true,
    historyApiFallback: true,
    compress: true,
    overlay: {
      warnings: false,
      errors: true
    },
    stats: {
      children: false,
      modules: false
    }
  },

  stats: {
    children: isBundleAnalyzer(),
    modules: isBundleAnalyzer()
  }
}, {
  mode: isDev() ? 'development' : 'production',

  target: 'webworker',

  entry: {
    sw: { import: './src/sw/sw.ts', filename: 'sw.js' }
  },

  output: {
    path: path.resolve('./build'),
    filename: isDev() ? `sw.[name].js` : `sw.[name].[contenthash:8].js`,
    chunkFilename: isDev() ? `sw.[name].js` : `sw.[name].[contenthash:8].js`,
    publicPath: process.env.ASSETS_HOST || '/'
  },

  resolve: resolveOptions,

  module: {
    rules: [{
      test: /\.m?[jt]sx?$/,
      resolve: { mainFields },
      use: [{
        loader: 'babel-loader'
      }]
    }]
  },

  plugins: [
    new DotenvPlugin({
      path: `./.env.${process.env.BUILD_ENV}`
    })
  ],

  optimization: {
    nodeEnv: isDev() ? 'development' : 'production',
    //chunkIds: 'named',
    splitChunks: {
      chunks: 'all'
    },
    concatenateModules: false,
    minimize: isProd(),
    minimizer: isProd() ? [
      new TerserPlugin({ terserOptions })
    ] : []
  },

  stats: {
    children: isBundleAnalyzer(),
    modules: isBundleAnalyzer()
  }
}]
