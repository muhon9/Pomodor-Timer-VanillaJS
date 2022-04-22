const { merge } = require("webpack-merge");

const common = require("./webpack.common");

module.exports = merge(common, {
  // Setting mode to development
  mode: "development",

  // Control how source maps are generated
  devtool: "inline-source-map",

  //Setting up a dev server
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8000,
  },

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(sass|scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
    ],
  },
});
