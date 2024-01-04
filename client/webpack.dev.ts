/* eslint-disable import/no-extraneous-dependencies */
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import common from './webpack.common';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const webpackConfig = (): Configuration => merge<Configuration>(common(), {
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module: { context: string }): string {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://server:3000',
    },
  },
});

export default webpackConfig;
