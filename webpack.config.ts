import path from 'path';
import webpack from 'webpack';
import { buildWebpack } from './configs/build/buildWebpack';
import { BuildMode, BuildPlatform, IBuildPaths } from './configs/types/types';

interface EnvVariables {
    mode?: BuildMode;
    port?: number;
    analyzer?: boolean;
    platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
    const paths: IBuildPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };
    const config: webpack.Configuration = buildWebpack({
        mode: env.mode,
        port: env.port,
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop',
    });
    return config;
};
