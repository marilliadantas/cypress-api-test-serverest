const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "uwfjyx",
  e2e: {
    baseUrl: "https://serverest.dev",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalRunAllSpecs: true
  },
});