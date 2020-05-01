// 此文件是production配置
const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    mode: 'production',
    performance: {
        hints: "warning",               // 发出警告，默认最大值是250kb
        maxAssetSize: 4000000,          // 文件size最大值
        maxEntrypointSize: 4000000,     // 入口size最大值
        assetFilter: function(assetFilename) { // 过滤出需要计算大小的文件
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    context: path.resolve(__dirname, '../'),
    devtool: 'cheap-module-source-map', /* 没有列映射，简化源映射到每一行*/
    entry: [ path.resolve(__dirname, '../src/index.tsx'), ],
    output: {
        path: path.resolve(__dirname, '../', 'lib'),
        filename: `index.js`,
        libraryTarget: 'umd',
    },
    externals: [nodeExternals()]
};