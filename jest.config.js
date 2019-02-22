// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "node"
  ],
  roots: [
    "<rootDir>/tests/"
  ],
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testEnvironment: "node",
  testMatch: [
    "**/*.js?(x)"
    // "**/__tests__/**/*.js?(x)",
    // "**/?(*.)+(spec|test).js?(x)"
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  verbose: true
};
