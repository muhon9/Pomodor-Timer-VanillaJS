const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const paths = require("./paths");

module.exports = {
  // Webpack will start bundling file from this file
  entry: [paths.src + "/index.js"],

  // Webpack will output the assests and bundles to this path
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  // Plugins to customize build
  plugins: [
    // Before rebuilding these will remove unused assets
    new CleanWebpackPlugin(),

    // Copies all the files from public to assets except css, html and js
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: "assets",
          globOptions: {
            ignore: [
              "*.DS_Store",
              "**/css/my.css",
              "**/js/my.js",
              "**/index.html",
            ],
            //ignore: [],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    // Generates the main HTML file from the index.html file in public. index.html in public folder will work as a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      // favicon: paths.src + "/images/favicon.png",
      favicon: paths.public + "/favicon.ico",
      template: paths.public + "/index.html", // template file
      filename: "index.html", // output file
    }),
  ],

  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ["babel-loader"] },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
    ],
  },

  resolve: {
    modules: [paths.src, "node_modules"],
    extensions: [".js", ".jsx", ".json"],
    // Alias to use during file import
    alias: {
      "@": paths.src,
      assets: paths.public,
    },
  },
};
