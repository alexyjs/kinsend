const CracoLessPlugin = require("craco-less");
const path = require("path");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
        customizeThemeLessPath: path.join(__dirname, "src/styles/antd.less"),
      },
    },
  ],
};
