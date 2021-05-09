/*
 * @description: 
 * @author: 
 * @lastEditors: 
 * @Date: 2021-04-27 10:47:23
 */
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': 'rgb(0,82,204)','@font-size-base':'16px' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};