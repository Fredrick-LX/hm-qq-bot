const path = require('path');

module.exports = {
  entry: './src/index.ts',  // 入口文件
  target: 'node',          // 生成 Node.js 可执行文件
  mode: 'production',      // 生产模式（压缩代码）
  output: {
    filename: 'bot.js',  // 输出文件名
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'system',  // 将依赖打包到主文件中
  },
  resolve: {
    extensions: ['.ts', '.js'],  // 支持 TypeScript 扩展名
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,  // 不处理 node_modules 中的 TypeScript 文件
      },
    ],
  },
  externals: {  // 排除某些依赖（如需保留 node_modules 中的某些库）
    // 例如排除 'lodash' 不打包，需手动安装
    // lodash: 'lodash'
  },
};
