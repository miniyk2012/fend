const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const common = require('./webpack.common.js');
const merge= require('webpack-merge');

const devConfig =  {
    mode: 'development',
    devtool: 'source-map',
    // stats: 'verbose',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
}

module.exports=merge(common, devConfig);