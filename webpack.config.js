/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')
const HtmlPlugin = require('html-webpack-plugin')
//const ModuleNomodulePlugin = require('webpack-module-nomodule-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const DotenvPlugin = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const RobotstxtPlugin = require('robotstxt-webpack-plugin')
const autoprefixer = require('autoprefixer')
const postcssSafeParser = require('postcss-safe-parser')

const babelConfig = require('./.babelrc.json')

const appEnv = dotenv.config({
  path: `./.env.${process.env.BUILD_ENV}`
})

const isProd = () => process.env.NODE_ENV === 'production'
const isDev = () => !isProd()
const isStage = () => process.env.BUILD_ENV === 'stage'
const isBundleAnalyzer = () => !!process.env.BUNDLE_ANALYZER

const makeConfig = (mode) => ({
  mode: isDev() ? 'development' : 'production',

  entry: {
    app: './src/core/app.tsx'
  },

  output: {
    path: path.resolve('./build'),
    filename: isDev() ? `[name].${mode}.build.js` : `[name].${mode}.build.[contenthash:8].js`,
    chunkFilename: isDev() ? `[name].${mode}.build.js` : `[name].${mode}.build.[contenthash:8].js`,
    publicPath: process.env.ASSETS_HOST || '/'
  },

  experiments: {
    topLevelAwait: true
  },

  resolve: {
    extensions: [
      '.mjs', '.js', '.jsx', '.tsx', '.ts', '.js', '.json',
      '.wasm', '.css', '.styl', '.html', '.svg', '.jpg', '.png'
    ],
    alias: {
      '~': path.resolve('./src'),
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      'core-js-pure': 'core-js',
      ...(mode === 'modern' ? { 'url': 'native-url' } : {})
    }
  },

  module: {
    rules: [{
        test: /\.worker\.ts?$/,
        exclude: /node_modules\/(?!(idb-keyval|pako)\/).*/,
        use: [{
          loader: 'worker-loader'
        }, {
          loader: 'babel-loader',
          options: babelConfig.env[mode]
        }]
      } ,{
        test: /\.m?[jt]sx?$/,
        exclude: /node_modules\/(?!(comlink)\/).*/,
        resolve: { mainFields: mode === 'modern' ?
          ['esm2017', 'module', 'jsnext:main', 'browser', 'main'] :
          ['module', 'jsnext:main', 'browser', 'main']
        },
        use: [{
          loader: 'babel-loader',
          options: babelConfig.env[mode]
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
        use: ['file-loader']
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

    new webpack.DefinePlugin({
      'process.env.MODE': mode
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

    //new ModuleNomodulePlugin(mode),

    isProd() ? new MiniCssExtractPlugin({
      filename: '[name].build.[contenthash:8].css',
      chunkFilename: '[name].build.[contenthash:8].css'
    }) : () => {},

    /*(isProd() && mode === 'modern') ? new CopyPlugin({
      patterns: [
        { from: './src/app.webmanifest', to: './app-v1.webmanifest' },
        { from: './src/ui/images/*', to: './[name]-v1[ext]' },
      ]
    }) : () => {},*/

    (isProd() && mode === 'modern') ? new WorkboxPlugin.GenerateSW({
      cacheId: 'tgstorage',
      navigateFallback: '/index.html',
      navigateFallbackAllowlist: [/^(?!\/__)/],
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      cleanupOutdatedCaches: true,
      exclude: [/\.mp4$/, /\.map$/, /\.cache$/],
      runtimeCaching: [{
        urlPattern: /\.(?:jpe?g|png|svg|css|js)$/,
        handler: 'NetworkFirst'
      }]
    }) : () => {},

    isProd() ? new RobotstxtPlugin({
      policy: [{
        userAgent: '*',
        [isStage() ? 'disallow' : 'allow']: '/'
      }]
    }) : () => {},

    isDev() ? new webpack.HotModuleReplacementPlugin() : () => {},

    isBundleAnalyzer() ? new BundleAnalyzerPlugin({
      analyzerHost: '0.0.0.0',
      analyzerPort: 5001
    }) : () => {}
  ],

  optimization: {
    nodeEnv: isDev() ? 'development' : 'production',
    //chunkIds: 'named',
    splitChunks: {
      chunks: 'all'
    },
    concatenateModules: false,
    minimizer: isProd() ? [
      new TerserPlugin({
        terserOptions: {
          compress: {
            ecma: mode === 'modern' ? 2019 : 5
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: mode === 'modern' ? 2019 : 5,
            beautify: false,
            comments: false,
            ascii_only: true,
            safari10: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: postcssSafeParser
        }
      })
    ] : []
  },

  devtool: isDev() ? 'eval-cheap-module-source-map' : 'hidden-source-map',

  devServer: {
    //https: true,
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
})

module.exports =
  isDev() ? makeConfig('modern') :
  isBundleAnalyzer() ? makeConfig(process.env.BUNDLE_ANALYZER) :
  makeConfig('legacy')
  //[makeConfig('modern'), makeConfig('legacy')]
