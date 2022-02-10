/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  devServer: {
    proxy: 'http://nginx:80/',
    public: 'http://localhost:8080'
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions = {
          ...options.compilerOptions || {},
          isCustomElement: tag => tag === 'l-tile-layer'
        }
        return options
      })
  }
}
