/**
 * To make the page load light weight we are bundling each page separately.
 * @see https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations
 * @see https://webpack.js.org/configuration/module/#rule
 * @see https://webpack.js.org/configuration/output/#outputpublicpath
 */

const webpack = require('webpack')
//const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = [
    {
        mode: 'development',
        name: 'editor',
        entry: './demo-app.js',
        output: {
            path: __dirname,
            //todo: need to use auto gen folder
            filename: './dist/demo-bundle.js'
        },
        resolve: {
            extensions: [".js", ".marko"]
        },
        module: {
            rules: [
                //to process marko files
                {
                    test: /\.marko$/,
                    loader: "@marko/webpack/loader"
                },
                //this is to process less / css files
                {
                    test: /\.(css)$/,
                    use: ['style-loader', "css-loader"]
                },
                //this is to process less / css files
                {
                    test: /\.less$/,
                    use: ['style-loader', "css-loader", "less-loader"]
                }
            ]
        },
        plugins: [
            //once the web pack chunk issue got resolved we can add more configuration for monaco optilization
            //new MonacoWebpackPlugin({
            //    languages: ["json"],
            //}),
            // we are facing issues with chunk output path so disabling chunking
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            })
        ]
    }
];
