const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // implement node event listeners here
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    supportFile: "cypress/support/e2e.js",
  },
});
