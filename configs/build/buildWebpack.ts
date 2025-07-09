import webpack from 'webpack';

import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';

import { IBuildOptions } from '../types/types';

export function buildWebpack(options: IBuildOptions): webpack.Configuration {
    const { paths, mode } = options;
    const isDev = mode === 'development';
    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true,
            publicPath: process.env.VERCEL ? '/' : './',
        },
        devServer: isDev ? buildDevServer(options) : undefined,
        devtool: isDev ? 'inline-source-map' : false,
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        optimization: {
            runtimeChunk: 'single',
        },
    };
}
