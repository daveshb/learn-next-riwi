/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: { '^.+\\.(t|j)sx?$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
        'node_modules/(?!your-problematic-module-name)', // Example: to transform a specific module
        // Or, to allow transformation of all ES modules in node_modules:
        'node_modules/(?!.*(esm|es6|esnext)/.*)',
      ],
   transform: {
        '^.+\\.jsx?$': 'babel-jest', // Example: using babel-jest for JS/JSX files
        '^.+\\.tsx?$': 'ts-jest',   // Example: using ts-jest for TS/TSX files
      },
};



