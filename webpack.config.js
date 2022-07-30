const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const registerRouter = require("./backend/router");

module.exports = {
  mode: "production",
  entry: "./src/main.ts",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    extensions: [
      ".sass",
      ".scss",
      ".css",
      ".wasm",
      ".vue",
      ".ts",
      ".js",
      ".json",
    ],
  },

  output: {
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
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
            options: {},
          },
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
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
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
    }),
  ],
};
