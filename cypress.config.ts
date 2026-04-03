import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://automationexercise.com",
    specPattern: "cypress/e2e/tests/**/*.ts",
    supportFile: "cypress/support/e2e.ts",
    fixturesFolder: "fixtures",
    env: {
      allure: true,
      allureResultsPath: "allure-results"
    },
    setupNodeEvents(on, config) {
      // Load environment-specific config if needed
      const envName = config.env.envName || 'prod';
      
      // Allure Writer Setup
      require('@shelex/cypress-allure-plugin/writer')(on, config);
      
      return config;
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 2,
      openMode: 0
    }
  },
});