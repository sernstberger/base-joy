/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@base-joy/tokens$': '<rootDir>/libs/design-system/tokens/src/index.ts',
    '^@base-joy/tokens/(.*)$': '<rootDir>/libs/design-system/tokens/src/$1',
    '^@base-joy/utils$': '<rootDir>/libs/design-system/utils/src/index.ts',
    '^@base-joy/ui-unstyled$': '<rootDir>/libs/ui/unstyled/src/index.ts',
    '^@base-joy/ui-unstyled/(.*)$': '<rootDir>/libs/ui/unstyled/src/$1',
    '^@base-joy/ui-styled$': '<rootDir>/libs/ui/styled/src/index.ts',
    '^@base-joy/ui-styled/(.*)$': '<rootDir>/libs/ui/styled/src/$1',
    '^shiki$': '<rootDir>/__mocks__/shiki.ts',
  },
  testMatch: ['**/*.test.{ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          module: 'commonjs',
          moduleResolution: 'node',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverageFrom: [
    'libs/**/src/**/*.{ts,tsx}',
    '!libs/**/src/**/*.d.ts',
    '!libs/**/src/**/index.ts',
  ],
};

module.exports = config;
