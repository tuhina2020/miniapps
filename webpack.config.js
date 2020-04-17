const path = require("path");
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


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
      filename: "./js/[name].[contentHash].js"
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
						loader: "babel-loader",
						options: {
							presets: ['@babel/preset-env'],
						}
					},
        },
        {
          test: /\.css$/i,
          use: [
						"style-loader",
						"css-loader"
					]
        },
        {
          test: /\.(png|svg|jpg|gif|mp4)$/,
					// use: ["file-loader"],
					loader: 'file-loader',
					options: {
						name: './assets/[name][contenthash].[ext]'
					}  
				},
				{
					test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'fonts/'
							}
						}
					]
				}
      ]
		},
		// optimization: argv.build === "production" ? {
		// 	minimizer: [new UglifyJsPlugin()],
		// } : undefined,
		optimization: {
			minimize: false
		},
    plugins: [
			new CleanWebpackPlugin(),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV' : argv.build === "production" ? JSON.stringify('PRODUCTION') : JSON.stringify('DEVELOPMENT')
			}),
      new HtmlWebpackPlugin({
        inject: true,
				hash: true,
        template: "./src/base/index.html",
        filename:  "index.html"
      }),
      new WebpackMd5Hash(),
      new CompressionPlugin({
        algorithm: "gzip"
			}),
    ],
    devServer: {
      contentBase: argv.type,
      watchContentBase: true,
      port: 1000
    }
  };
};
