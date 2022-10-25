module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  moduleDirectories: ['node_modules', '<rootDir>/node_modules', '<rootDir>/src'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '^.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub',
  },
  testPathIgnorePatterns: ['/node_modules/'],
  testRegex: '/__tests__/.*test.[jt]sx?$',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/src/setupTests.js"]
};
