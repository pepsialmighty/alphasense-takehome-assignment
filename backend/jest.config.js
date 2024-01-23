module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleNameMapper: {
    // Add any module mappings as needed
  },
  testRegex: "(/tests/.*\\.(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
};
