const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = (env) => ({
  entry: "./src/index.js",
  output: {
    filename: "main.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            targets: "defaults",
            presets: [["@babel/preset-env"]],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          env.prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "main.[contenthash].css",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
});
