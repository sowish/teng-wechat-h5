//babel.config.js
module.exports = {
  presets: [
    [
      "@vue/app",
      {
        polyfills: ["es6.promise", "es6.symbol"]
      }
    ]
  ],
//   vant 库配置
//   plugins: [
//     ['import', {
//       libraryName: 'vant',
//       libraryDirectory: 'es',
//     //   style: name => `${name}/style/less` // 配置vant 的主题
//       style: true // 配置vant 的主题
//     }, 'vant']
//   ]
};
