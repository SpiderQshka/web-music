const HtmlWebpackPlugin = require("html-webpack-plugin")
const TSConfigPathsWebpackPlugin = require("tsconfig-paths-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const path = require("path")

const pages = [
  {
    name: "index",
    source: "./src/scripts/index/index.ts",
  },
  {
    name: "output",
    source: "./src/scripts/output/index.ts",
  },
  {
    name: "input",
    source: "./src/scripts/input/index.ts",
  },
  {
    name: "guitar",
    source: "./src/scripts/input/guitar/index.ts",
  },
  {
    name: "fret-hand-guitar",
    source: "./src/scripts/input/guitar/fret-hand/index.ts",
  },
  {
    name: "picking-hand-guitar",
    source: "./src/scripts/input/guitar/picking-hand/index.ts",
  },
]

module.exports = {
  entry: pages.reduce((config, { name, source }) => ({ ...config, [name]: source }), {}),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
    plugins: [new TSConfigPathsWebpackPlugin()],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    ...pages.map(
      page =>
        new HtmlWebpackPlugin({
          filename: `${page.name}.html`,
          chunks: [page.name],
          template: `./src/pages/${page.name}.html`,
          publicPath: "/",
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true,
          },
        }),
    ),
    new CopyPlugin({
      patterns: [{ from: "./src/assets", to: "assets" }],
    }),
  ],
}
