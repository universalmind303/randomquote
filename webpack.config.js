const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const ProvidePlugin = require("webpack/lib/ProvidePlugin");
const autoprefixer = require("autoprefixer");


const appDir = path.resolve(__dirname, "src/app");


module.exports = {


    entry: {
        polyfills: "./src/polyfills.ts",
        app: "./src/main.ts",
        vendor: "./src/vendor.ts"
    },
    resolve: {
        extensions: [".js", ".ts", ".css", ".scss"]
    },
    output: {
        path: __dirname + "./dist",
        filename: "[name]-[hash6].js"
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader"
            },
            {
                test: /\.ts$/,
                enforce: "pre",
                loader: "tslint-loader"
            },
            {
                // component templates
                test: /\.html$/,
                loader: "html-loader", 
                options: {
                  minimize: true,
                  removeAttributeQuotes: false,
                  caseSensitive: true,
                  customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
                  customAttrAssign: [ /\)?\]?=/ ] 
                }
            },
            {
                test: /\.css$/,
                exclude: appDir,
                loader: ["style-loader","css-loader"]
            },
            {
                test: /\.css$/,
                include: appDir,
                loader: "raw-loader"
            },
            {
                test: /\.scss$/,
                exclude: appDir,
                loader: ["style-loader",
                    "css-loader?sourceMap",
                    "postcss-loader",
                    "sass-loader?sourceMap",
                    "sass-loader", {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: "./src/styles/bootstrap/sass-resources.scss"
                        }
                    }]
            },
            {
                test: /\.scss$/,
                include: appDir,
                loader: ["raw-loader",
                    "postcss-loader",
                    "sass-loader?sourceMap",
                    "sass-loader", {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: "./src/styles/bootstrap/sass-resources.scss"
                        }
                    }]
            },
            {
                test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/,
                loader: "imports-loader?jQuery=jquery"
            },
            {
                test: /\.(woff2?|ttf|eot|svg)(\?[\s\S]+)?$/,
                loader: "file-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader?limit=25000"
            }

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: `./src/index.html?v=${new Date().toISOString().slice(0,13)}`,
            inject: "body"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["app", "vendor", "polyfills"]
        }),
        new ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
            jquery: "jquery",
            "Tether": "tether",
            "window.Tether": "tether",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip"
        })
    ],
    devtool: "source-map",
    devServer: {
        historyApiFallback: true
    }
};