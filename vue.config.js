const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new DefinePlugin({
        "process.env": {
          APP_TITLE: JSON.stringify("Fujitime"),
        },
      }),
      new HtmlWebpackPlugin({
        title: "Fujitime",
      }),
    ],
  },
};
