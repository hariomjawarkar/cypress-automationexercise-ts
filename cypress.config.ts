import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://automationexercise.com",
    specPattern: "cypress/e2e/tests/**/*.ts",
    supportFile: "cypress/support/e2e.ts",
    fixturesFolder: "cypress/fixtures",

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
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    chromeWebSecurity: false,
    retries: {
      runMode: 2,
      openMode: 0
    }
  },
});