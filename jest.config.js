module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/tests/**/*.ts?(x)', '**/?(*.)+(spec|test).js?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)',
  ],
};
