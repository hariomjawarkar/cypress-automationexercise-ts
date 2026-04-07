import { defineConfig } from "cypress";
import allureWriter from "@shelex/cypress-allure-plugin/writer";

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
      // Allure Writer Setup
      allureWriter(on, config);
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