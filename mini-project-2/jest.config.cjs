module.exports = {
  projects: [
    {
      displayName: 'unit',
      testMatch: ['**/tests/unit/**/*.unit.test.js'],
    },
    {
      displayName: 'integration',
      testMatch: ['**/tests/integration/**/*.int.test.js'],
      globalSetup: './tests/integration/globalSetup.js',
      globalTeardown: './tests/integration/globalTeardown.js',
    }
  ]
};