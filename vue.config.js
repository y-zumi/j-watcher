module.exports = {
  devServer: {
    proxy: {
      "^/niconico_api": {
        target: "https://api.search.nicovideo.jp",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/niconico_api": "" }
      },
      "^/youtube_api": {
        target: "https://www.googleapis.com",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/youtube_api": "" }
      }
    }
  }
};