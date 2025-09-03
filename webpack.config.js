const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

module.exports = (env) => ({
  entry: './src/index.js',
  output: {
    filename: env && env.prod ? '[name].[contenthash].js' : '[name].js',
    chunkFilename: env && env.prod ? '[name].[contenthash].chunk.js' : '[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  devtool: env && env.prod ? 'source-map' : 'inline-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        bootstrap: {
          test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
          name: 'bootstrap',
          chunks: 'all',
          priority: 20,
        },
        chartjs: {
          test: /[\\/]node_modules[\\/]chart\.js[\\/]/,
          name: 'chartjs',
          chunks: 'all',
          priority: 20,
        },
        validator: {
          test: /[\\/]node_modules[\\/]validator[\\/]/,
          name: 'validator',
          chunks: 'all',
          priority: 20,
        },
      },
    },
    minimize: env && env.prod,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: env && env.prod,
            drop_debugger: env && env.prod,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    usedExports: true,
    sideEffects: false,
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: 'defaults',
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          env && env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                silenceDeprecations: [
                  'mixed-decls',
                  'color-functions',
                  'global-builtin',
                  'import',
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash][ext]',
        },
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: env && env.prod ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      } : false,
    }),
    new MiniCssExtractPlugin({
      filename: env && env.prod ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: env && env.prod ? '[name].[contenthash].chunk.css' : '[name].chunk.css',
    }),
    new ESLintPlugin({
      extensions: ['js'],
      fix: true,
      failOnError: env && env.prod,
    }),
    ...(env && env.analyze ? [new BundleAnalyzerPlugin()] : []),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 8080,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
