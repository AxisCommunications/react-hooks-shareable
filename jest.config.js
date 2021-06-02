module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: ['**/src/**/?(*.)test.ts?(x)'],
  transformIgnorePatterns: ['node_modules/(?!@juggle)'],
}
