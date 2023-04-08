/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { Config } from 'jest';

const config: Config = {
	verbose: true,
	rootDir: './src/',
	roots: ['<rootDir>'],
	// modulePaths: ['<rootDir>'],
	// moduleDirectories: ['node_modules'],
	moduleDirectories: ["node_modules","<module-directory>"],

	// modulePaths: ['<rootDir>/src/'],
	// clearMocks: true,
	preset: 'ts-jest',
	// preset: 'ts-jest/presets/default-esm',

	// testEnvironment: 'node',
	testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},

	// transform: {
	// 	'^.+\\.ts?$': 'ts-jest',
	// },
	// transformIgnorePatterns: ['node_modules/'],
};

export default config;
