const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const registerRouter = require("./backend/router");
const ComponentsPlugin = require("unplugin-vue-components/webpack");
const { VantResolver } = require("unplugin-vue-components/resolvers");

// const staticAssetName = "[path][name].[ext]?[hash:8]";
const mode = process.env.NODE_ENV === "dev" ? "development" : "production";
const publicPath = mode === "development" ? "/" : "";
const WebpackBar = require("webpackbar");
const progressPlugin = new WebpackBar({
  color: "#85d", // 默认green，进度条颜色支持HEX
  basic: false, // 默认true，启用一个简单的日志报告器
  profile: false, // 默认false，启用探查器。
});
module.exports = {
  mode,
  entry: "./src/main.js",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    extensions: [
      ".sass",
      ".scss",
      ".css",
      ".mjs",
      ".wasm",
      ".vue",
      ".ts",
      ".js",
      ".json",
    ],
  },

  output: {
    publicPath,
    assetModuleFilename: "images/[hash][ext][query]",
    path: path.resolve(__dirname, "./dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    liveReload: true,
    hot: false,
    port: 9000,
    onAfterSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      registerRouter(devServer.app);
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(css|less|scss)$/,
        use: [
          {
            loader: "style-loader",
            options: {},
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: {
                mode: "local",
                auto: true,
                exportGlobals: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                localIdentContext: path.resolve(__dirname, "src"),
                localIdentHashSalt: "my-custom-hash",
                namedExport: true,
                exportLocalsConvention: "camelCase",
                exportOnlyLocals: false,
              },
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
            options: {
              additionalData: `
          @import "@/styles/variable";
          @import "@/styles/mixin";
        `,
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    progressPlugin,
    ComponentsPlugin({
      resolvers: [VantResolver()],
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
    }),
  ],
};
