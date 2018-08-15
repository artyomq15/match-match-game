var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    devServer: {
        inline:true,
        port: 8008,
        historyApiFallback: true,
    },
    entry: {
        'main': './js/index.js',
      },
    output:{
       path: path.resolve(__dirname, './js/public'), 
       publicPath: '/js/public/',
       filename: "[name].js"
    },
    resolve: {
        extensions: ['.js']
    },
    
    plugins: [
        /*new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.resolve(__dirname, 'js'), // каталог с исходными файлами
            {} // карта маршрутов
        ),
        new UglifyJSPlugin()*/
    ]
}