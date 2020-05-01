// 此文件是共有配置
const path = require('path');
const merge = require('webpack-merge');
const helper = require('./helper.config');
const mode = process.env.NODE_ENV;
let modeConfig = null;
if(mode == 'development') {
    modeConfig = require('./dev.config');
}else {
    modeConfig = require('./pro.config');
}

const commonConfig = {
    target: "web",
    stats: "errors-only", // 只有错误或者警告的时候才输出信息
    context: path.resolve(__dirname, '../'),
    // optimization: {
    //     moduleIds: 'hashed',    // 替换自增的module.id，保证依赖文件不重复生成
    //     runtimeChunk: 'single', // 提取boilerplate代码
    //     splitChunks: {          // 将第三方依赖提取到单独的文件中
    //         minSize: 30000,
    //         maxAsyncRequests: 6,            // 最大异步请求数
    //         maxInitialRequests: 4,          // 入口最大请求数
    //         automaticNameDelimiter: '~',    // chunk名称分隔符
    //         automaticNameMaxLength: 30,     // chunk名称最长字节数
    //         cacheGroups: {
    //             vendor: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendors',
    //                 chunks: 'all'    // all 所有模块 | async 按需加载的模块 | initial 初始加载的模块
    //             }
    //         }
    //     }
    // },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        modules: [ // 设置解析模块时要查找的路径
            "node_modules",
            path.resolve(__dirname, '../', 'src')
        ],
        alias: {
            "@": path.resolve(__dirname, '../', 'src'),
        },
    },
    plugins: helper.generatePlugins(mode),
    module: { // json文件默认支持，不需要loader
        rules: helper.generateLoaders(mode)
    },
}

module.exports = merge(commonConfig, modeConfig);