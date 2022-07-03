/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // Matches test files with suffix ".test.js"
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  // clearMocks: true,
};
