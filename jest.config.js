module.exports = {
  testMatch: ["**/test/**/*.test.js"],
  reporters: [
    "default",
    ["jest-junit", {
      outputDirectory: "test-results",
    }]
  ]
};
