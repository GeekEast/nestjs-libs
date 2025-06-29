const base = require('../../jest.config.js');

module.exports = {
  ...base,
  displayName: '@future.ai/common',
  rootDir: '.',
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/index.ts',
  ],
};