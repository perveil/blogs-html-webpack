'use strict'

var webpack=require('webpack');
const path=require('path');
//const htmlWebpackPlugin=require('html-webpack-plugin');
//const urlLoader=require("url-loader"); //把小的图片内置到文件中来，转换成base64位的值
// path 用于操作路径
module.exports = {
    entry: "./src/main.js",
    //入口文件，并且公用的文件要分开打包，common.js 就是将相同的文件都统一打包
    devServer: {
        host:"127.0.0.1",
        open:true,
        port:8090
    },
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "[name].bundle.js",
    },
    //所有生成的依赖文件
    module: {
        rules: [
        //webpack 2.0 3.0 loaders
        //webpack 4.0 rules
        { 
        	test: /\.css$/,
        	use:[
        	'style-loader',
        	'css-loader',
             'less-loader',
             'postcss-loader'
        	]
        },{
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
        }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },{
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1000,
                            name:'/static/images/assets/[hash:8].[name].[ext]'
                        }
                    }
                ]
            }
        
//            {test: /\.css$/, loader: "style-loader!css-loader",modules:true},
//          {test:/\.png$/,loader:'url-loader?limit=10000'}
        ]
    },
    mode: 'development',
    
};