const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  return {
    entry: {
      app: `./src/${argv.type}/main.js`
    },
    devtool: argv.mode === "production" ? false : "source-map",
    output: {
      path: path.resolve(__dirname, "dist"),
      chunkFilename:
        argv.mode === "production"
          ? "chunks/[name].[chunkhash].js"
          : "chunks/[name].js",
      filename:
        argv.mode === "production" ? "[name].[chunkhash].js" : "[name].js"
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|svg|jpg|gif|mp4)$/,
					// use: ["file-loader"],
					loader: 'file-loader',
					options: {
						name: '[name][contenthash].[ext]'
					}  
				}
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename:
          argv.mode === "production" ? "[name].[contenthash].css" : "[name].css"
      }),
      new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: "./src/base/index.html",
        filename: "index.html"
      }),
      new WebpackMd5Hash(),
      new CompressionPlugin({
        algorithm: "gzip"
			}),
			new CopyPlugin([
				{ from: './src/style/main.css', to: '.' },
				{ from : './src/style/normalize.css', to: '.' }
			]),
    ],
    devServer: {
      contentBase: "dist",
      watchContentBase: true,
      port: 1000
    }
  };
};
