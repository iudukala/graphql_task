/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
	verbose: true,
	rootDir: './src/',
	moduleDirectories: ['node_modules'],

	clearMocks: true,
	preset: 'ts-jest/presets/default-esm',

	testEnvironment: 'node',
	// testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
	testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],

	// handling esm
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	transform: {
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{
				useESM: true,
			},
		],
	},
	extensionsToTreatAsEsm: ['.ts'],

	transformIgnorePatterns: ['node_modules/'],

	setupFilesAfterEnv: ['<rootDir>/__tests__/helpers/setupTestEnvironment.ts'],
};

export default config;
