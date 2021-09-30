module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: '일정 관리 앱'
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "~@/assets/_global.scss";
          @import "~@/assets/_reset.scss";
        `
      }
    }
  }
}