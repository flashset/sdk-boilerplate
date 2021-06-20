const path = require("path");
var webpack = require("webpack");

let config = {
  entry: {
    "flashset-sdk-lib": [path.join(__dirname, "src", "index.ts")],
    "flashset-sdk-lib.min": [path.join(__dirname, "src", "index.ts")],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "FlashsetSDK",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      { test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/ },
    ],
  },
  optimization: {
    minimize: false,
  },
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new DtsBundlePlugin(),
  ],
  target: "node",
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    setImmediate: false,
  },
  externals: {
    axios: {
      root: "axios",
      commonjs: "axios",
      commonjs2: "axios",
      amd: "axios",
    },
  },
};

module.exports = config;

function DtsBundlePlugin() {}
DtsBundlePlugin.prototype.apply = function (compiler) {
  compiler.plugin("done", function () {
    var dts = require("dts-bundle");
    dts.bundle({
      name: "FlashsetSDK",
      main: path.join(__dirname, "tmp", "index.d.ts"),
      out: path.join(__dirname, "dist", "flashset-sdk-lib.d.ts"),
      removeSource: false,
      outputAsModuleFolder: true, // to use npm in-package typings
    });
  });
};
