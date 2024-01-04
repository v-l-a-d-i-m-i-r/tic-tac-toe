/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const webpackConfig = (): Configuration => ({
  entry: path.join(__dirname, './src/index.tsx'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: path.join(__dirname, './tsconfig.json') })],
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, '/build'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
      template: path.join(__dirname, './src/public/index.html'),
    }),
    // DefinePlugin allows you to create global constants which can be configured at compile time
    new DefinePlugin({
      'process.env': process.env.production || !process.env.development,
    }),
    // Speeds up TypeScript type checking and ESLint linting (by moving each to a separate process)
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        enabled: false,
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
  ],
});

export default webpackConfig;
