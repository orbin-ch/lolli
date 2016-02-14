import config from "./webpack.production.babel";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

config.entry.push("./demo/", "roboto-fontface/css/roboto-fontface.css");
config.module.loaders[1].include.push(path.resolve(__dirname, "demo"));
config.module.loaders.push({
  test: /\.(eot|woff|woff2|ttf|svg)$/,
  loader: "file-loader?name=./font/[name].[ext]"
});
config.output.publicPath = "/";
config.debug = true;
config.devtool = "source-map";
config.module.preLoaders.shift();
config.devServer = {
  inline: true,
  port: 3000,
  contentBase: "./dist"
};
config.plugins.shift();
config.plugins.unshift(new HtmlWebpackPlugin({
  template: "./demo/index.html",
  inject: true
}));
delete config.externals;

module.exports = config;
