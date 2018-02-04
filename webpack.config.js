    const path = require("path");
    const HtmlWebPackPlugin = require("html-webpack-plugin");
    module.exports = {
      entry: ["./client/src/js/app.js"],
      output: {
        path: path.resolve(__dirname, "./client/dist"),
        filename: "js/[name].js"
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
          }
        ]
      },
      plugins: [
        new HtmlWebPackPlugin({
          template: "./client/src/static/index.html",
          filename: "./index.html"
        })
      ]
    };