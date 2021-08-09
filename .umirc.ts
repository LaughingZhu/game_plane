/*
 * @Description:
 * @Author: LaughingZhu
 * @Date: 2021-06-04 17:24:52
 * @LastEditros:
 * @LastEditTime: 2021-08-09 16:46:25
 */
const pxToViewPort = require('postcss-px-to-viewport');
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {},
  routes: [
    {
      exact: false,
      component: '@/layouts/index',
      routes: [
        {
          exact: true,
          path: '/index',
          component: '@/pages/index',
        },
        {
          exact: true,
          path: '/',
          component: '@/pages/index',
        },
      ],
    },
  ],
  404: true,
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'https://sc.peiyou.eaydu.com/api',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
      secure: false,
    },
  },
  title: '打飞机',
  plugins: ['@alitajs/hd'],
  // hd: {
  //   px2rem: {
  //     rootValue: 100,
  //     unitPrecision: 5,
  //     propWhiteList: [],
  //     propBlackList: [],
  //     exclude: false,
  //     selectorBlackList: [],
  //     ignoreIdentifier: false,
  //     replace: true,
  //     mediaQuery: false,
  //     minPixelValue: 0,
  //   },
  // },
  extraPostCSSPlugins: [
    pxToViewPort({
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: true,
    }),
  ],
  // chunks: ['umi', 'vendors'],
  chainWebpack: function (config, { env }) {
    // 删除 umi 内置插件
    if (env === 'production') {
      // build部署分包
      config.merge({
        optimization: {
          minimize: true,
          splitChunks: {
            chunks: 'async',
            minSize: 1000, //文件最小打包体积，单位byte，默认30000，若单个文件不满足会合并其他文件组成一个
            minChunks: 1, //最小使用到次数，超过2次执行
            automaticNameDelimiter: '.', //连接符
            cacheGroups: {
              vendor: {
                // chunks: 'ini',
                test: /[\\/]node_modules[\\/]/,
                name(module: any) {
                  const packageName = module.context.match(
                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                  )[1];
                  // 避免服务端不支持@
                  return `npm.${packageName.replace('@', '')}`;
                },
              },
            },
          },
        },
      });
      //过滤掉momnet的那些不使用的国际化文件
      config
        .plugin('replace')
        .use(require('webpack').ContextReplacementPlugin)
        .tap(() => {
          return [/moment[/\\]locale$/, /zh-cn/];
        });
    }
  },
  publicPath: '/flag_2021/',
  base: '/',
  history: {
    type: 'hash',
  },
  dynamicImport: {
    loading: '@/component/Loading',
  },
  runtimePublicPath: true,
  hash: true,
  styles: ['@/global.less'],
});
