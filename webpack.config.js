var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './app/index.js',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module : {
        rules : [
            {test : /\.(js)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']},
            {
              test: /\.(png|jpe?g|gif|svg)$/i,
              use: [
                  {
                  loader: 'file-loader',
            options : {
              outputPath: 'images'
            }
              },
              ],
          },
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'app/index.html'
        }),
    ],
    presets: [
	["@babel/preset-react"]
    ]
}
