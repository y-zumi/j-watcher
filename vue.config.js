module.exports = {
  devServer: {
    proxy: {
      "/niconico_api/": {
        target: "https://api.search.nicovideo.jp/api",
      }
    }
  }
};