// * 配置完成后记得重启下
const CracoLessPlugin = require("craco-less");
const path = require("path")


module.exports = {
  babel: {
    //用来支持装饰器
    plugins: [["@babel/plugin-proposal-decorators", {legacy: true}]]
  },
  webpack: {
    alias: {
      "@": path.join(__dirname, "src")
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "red",
              "@border-color-base": "green",
              "@link-color": "orange"
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};