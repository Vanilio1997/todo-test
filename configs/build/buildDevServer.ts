import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { IBuildOptions } from '../types/types';

export function buildDevServer(opions: IBuildOptions): DevServerConfiguration {
    return {
        port: opions.port ?? 5000,
        open: true,
        historyApiFallback: true,
    };
}
