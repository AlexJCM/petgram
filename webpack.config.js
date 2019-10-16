const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  output: {
    filename: "app.bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html" //el template que va a utilizar esta en esta direccion
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
        }
      }
    ]
  }
};
