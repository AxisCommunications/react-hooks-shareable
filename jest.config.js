module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: ['**/src/**/?(*.)test.ts?(x)'],
  transformIgnorePatterns: ['node_modules/(?!@juggle)'],
}
