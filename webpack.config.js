const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals : {
    react: 'react'
  },
  resolve: {
    extensions: [ '.tsx', '.ts' ]
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist')
  }
};