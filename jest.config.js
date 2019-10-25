module.exports = {
  verbose: true,
  testRegex: '((\\.|/*.)(spec))\\.js?$',
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
