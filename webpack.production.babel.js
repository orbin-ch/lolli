import path from "path";
import cssnext from "postcss-cssnext";
import postcssApply from "postcss-apply";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";

export default {
  entry: [
    "./src/color.css"
  ],
  output: {
    path: "./dist",
    filename: "lolli.css",
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      include: path.resolve(__dirname, "src"),
      loader: "jshint-loader"
    }],
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract([
        "css-loader",
        "postcss-loader?pack=compile"
      ].join("!"))
    }, {
      test: /\.js$/,
      include: [path.resolve(__dirname, "src")],
      loader: "babel-loader"
    }]
  },
  externals: (context, request, done) => {
    if (!request.startsWith("./")) return done(null, request);
    done();
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new ExtractTextPlugin("./lolli.css")
  ],
  postcss: () => {
    return {
      compile: [
        postcssApply(),
        cssnext({
          features: {
            customProperties: false,
            autoprefixer: {
              cascade: false
            }
          }
        })
      ]
    };
  }
};
