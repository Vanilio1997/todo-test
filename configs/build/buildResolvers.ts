import { IBuildOptions } from './../types/types';
import { Configuration } from 'webpack'

export function buildResolvers(
	options: IBuildOptions
): Configuration['resolve'] {
	return {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {    
			'@': options.paths.src,
		},
	}
}
