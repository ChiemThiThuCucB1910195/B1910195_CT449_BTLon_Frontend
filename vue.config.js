const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "http://localhost:5000",
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/CT449_BaiTapLon/'
    : '/',



  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
