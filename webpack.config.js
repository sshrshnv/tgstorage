/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlSkipAssetsPlugin = require('html-webpack-skip-assets-plugin').HtmlWebpackSkipAssetsPlugin
const HTMLInlineCSSPlugin = require("html-inline-css-webpack-plugin").default
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SentryPlugin = require('@sentry/webpack-plugin').sentryWebpackPlugin
const autoprefixer = require('autoprefixer')

const isProd = () => process.env.NODE_ENV === 'production'
const isDev = () => !isProd()
const isDevEnv = () => process.env.BUILD_ENV === 'dev'
const isBundleAnalyzer = () => !!process.env.BUNDLE_ANALYZER

const appEnv = isDevEnv() ? dotenv.config({
  path: `./.env.${process.env.BUILD_ENV}`
})?.parsed : process.env

const isSentryAvailable = () =>
  isProd() && !(isBundleAnalyzer() || isDevEnv()) && !!appEnv.SENTRY_AUTH_TOKEN

const APP_TITLE = 'TgStorage'
const APP_DESCRIPTION = 'Advanced Saved Messages of the Telegram. Organize your notes, links, checklists, photos and any documents in the free unlimited Telegram Cloud.'

const defineEnvConfig = {
  'process.env.APP_TITLE': JSON.stringify(APP_TITLE),
  'process.env.APP_DESCRIPTION': JSON.stringify(APP_DESCRIPTION),
  'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.DOMAIN': JSON.stringify(appEnv.DOMAIN),
  'process.env.API_ID': JSON.stringify(appEnv.API_ID),
  'process.env.API_HASH': JSON.stringify(appEnv.API_HASH),
  'process.env.API_TEST': JSON.stringify(appEnv.API_TEST),
  'process.env.NEWS_CHANNEL_INVITE': JSON.stringify(appEnv.NEWS_CHANNEL_INVITE),
  'process.env.SENTRY_DSN': JSON.stringify(appEnv.SENTRY_DSN),
  'process.env.SENTRY_AUTH_TOKEN': JSON.stringify(appEnv.SENTRY_AUTH_TOKEN),
  'process.env.GOOGLE_ANALYTICS_ID': JSON.stringify(appEnv.GOOGLE_ANALYTICS_ID),
  'process.env.SPONSORSHIP_CHANNEL_ID': JSON.stringify(appEnv.SPONSORSHIP_CHANNEL_ID),
  'process.env.SPONSORSHIP_CHANNEL_INVITE': JSON.stringify(appEnv.SPONSORSHIP_CHANNEL_INVITE),
  'process.env.SPONSORSHIP_BOT_LINK_0': JSON.stringify(appEnv.SPONSORSHIP_BOT_LINK_0),
  'process.env.SPONSORSHIP_BOT_LINK_1': JSON.stringify(appEnv.SPONSORSHIP_BOT_LINK_1),
  'process.env.SPONSORSHIP_REQUIRED': JSON.stringify(appEnv.SPONSORSHIP_REQUIRED),
  'process.env.SPONSORSHIP_CURRENT': JSON.stringify(appEnv.SPONSORSHIP_CURRENT),
}

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
    app: './src/core/app.tsx',
    inline: './src/ui/styles/styles.global.styl'
  },

  output: {
    path: path.resolve('./build'),
    filename: isDev() ? `[name].js` : `[name].[contenthash:8].js`,
    chunkFilename: isDev() ? `[name].js` : `[name].[contenthash:8].js`,
    assetModuleFilename: '[name].[hash:8][ext]',
    publicPath: process.env.ASSETS_HOST || '/'
  },

  experiments: {
    topLevelAwait: true
  },

  resolve: resolveOptions,

  module: {
    rules: [{
        test: /\.worker\.ts?$/,
        exclude: /node_modules\/(?!(idb-keyval)\/).*/,
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
              import: [path.resolve('./src/ui/styles/styles.vars.styl')],
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
        test: /\.(avif|webp|png)$/,
        type: 'asset/resource'
      }, {
        test: /\.webmanifest$/,
        use: 'webpack-webmanifest-loader',
        type: 'asset/resource',
        generator : {
          filename : '[name][ext]',
        }
      }, {
        test: /\.svg$/,
        use: ['preact-svg-loader'],
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin(defineEnvConfig),

    isProd() ? new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].css'
    }) : () => {},

    new HtmlPlugin({
      template: './src/core/app.html',
      filename: 'index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),

    isProd() ? new HTMLInlineCSSPlugin({
      filter: (filename) => filename.includes('inline') || filename.includes('index')
    }) : () => {},

    isProd() ? new HtmlSkipAssetsPlugin({
      skipAssets: [asset => /\/inline.*.js/.test(asset.attributes?.src || '')],
    }) : () => {},

    isProd() ? new CopyPlugin({
      patterns: [{
        from: './src/ui/images/manifest-splash-icon-512.png',
        to: './manifest-splash-icon-512.[contenthash:8].png'
      }, {
        from: './assetlinks.json',
        to: '.well-known/assetlinks.json',
        transform: (content) => {
          return content.toString().replace('process.env.ANDROID_FINGERPRINT', appEnv.ANDROID_FINGERPRINT)
        }
      }]
    }) : () => {},

    isSentryAvailable() ? SentryPlugin({
      authToken: appEnv.SENTRY_AUTH_TOKEN,
      org: 'sshrshnv',
      project: 'tgstorage',
      include: './build',
      telemetry: false,
      deploy: {
        env: process.env.BUILD_ENV
      }
    }) : () => {},

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
    //https: true,
    host: '0.0.0.0',
    port: 4000,
    hot: true,
    historyApiFallback: true,
    compress: true,
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
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
    new webpack.DefinePlugin(defineEnvConfig),

    isBundleAnalyzer() ? new BundleAnalyzerPlugin({
      analyzerHost: '0.0.0.0',
      analyzerPort: 5003
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
      new TerserPlugin({ terserOptions })
    ] : []
  },

  stats: {
    children: isBundleAnalyzer(),
    modules: isBundleAnalyzer()
  }
}]
