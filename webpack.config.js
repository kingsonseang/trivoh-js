/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.ts", // Entry point of your application
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // File extensions to resolve
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "umd",
    // umdNamedDefine: true,
    // library: "@kingsonseang/trivoh-js",
  },
  optimization: {
    minimize: true, // Disable minification
  },
};
