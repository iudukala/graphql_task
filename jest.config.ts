/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
	verbose: true,
	rootDir: './src/',
	moduleDirectories: ['node_modules'],

	clearMocks: true,
	preset: 'ts-jest/presets/default-esm',

	testEnvironment: 'node',
	testEnvironmentOptions: { module: 'esnext' },
	testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],

	// handling esm
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	transform: {
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{
				useESM: true,
				tsconfig:{
					module: 'es2020'
				}
			},
		],
	},
	extensionsToTreatAsEsm: ['.ts'],

	transformIgnorePatterns: ['node_modules/'],
};

export default config;
