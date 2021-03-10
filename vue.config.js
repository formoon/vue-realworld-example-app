// var webpack = require('webpack');

module.exports = {
  publicPath: "/static",
  devServer: {
    watchOptions: {
      poll: true
    }
  },
  chainWebpack: config => {
    // console.log(process.env.VUE_APP_API_URL);
    // console.log(process.env.BABEL_ENV);
    if (process.env.NODE_ENV === "development") {
      config.output.filename("[name].[hash].js").end();
    }
  },
};
