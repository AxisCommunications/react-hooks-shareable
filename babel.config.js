const presets = ['@babel/preset-typescript', '@babel/preset-react']

module.exports = {
  sourceType: 'unambiguous',
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
  presets: [
    ['@babel/preset-env', { targets: { esmodules: true } }],
    ...presets,
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ...presets,
      ],
    },
  },
}
