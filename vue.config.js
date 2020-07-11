module.exports = {
  devServer: {
    proxy: {
      "^/niconico_api": {
        target: "https://api.search.nicovideo.jp",
        changeOrigin: true,
        pathRewrite: { "^/niconico_api": "" }
      },
      "^/youtube_api": {
        target: "https://www.googleapis.com",
        changeOrigin: true,
        pathRewrite: { "^/youtube_api": "" }
      }
    }
  }
};