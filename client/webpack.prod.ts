/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

const webpackConfig = (): Configuration => merge<Configuration>(common(), {
  mode: 'production',
});

export default webpackConfig;
