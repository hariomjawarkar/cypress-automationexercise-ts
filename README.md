# 🚀 Cypress Automation Framework - Senior Edition

Professional, industry-standard Cypress automation framework built for the **AutomationExercise** platform. Designed for scalability, resilience, and high-quality reporting, this project demonstrates a **Senior-level (3+ years experience)** approach to test automation.

---

## 🛠️ Tech Stack & Architecture

*   **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety and scalability.
*   **Automation**: [Cypress v15+](https://www.cypress.io/) - Blazing fast, reliable testing for anything that runs in a browser.
*   **Design Pattern**: **Page Object Model (POM)** - Encourages clean code separation between test logic and UI element mapping.
*   **Reporting**: [Allure Reports](https://docs.qameta.io/allure/) - High-fidelity dashboards with features, stories, and execution steps.
*   **CI/CD**: **GitHub Actions** - Automated execution and report generation on every PR/Push.
*   **DDT**: **Data-Driven Testing** using Cypress Fixtures for isolated test data.

---

## 🔥 Professional Features 

1.  **Self-Healing Test Data**: Implementation of unique user generation in every test file to ensure environment neutrality and avoid "Email already exists" errors.
2.  **Ad-Resilient Locators**: Strategic use of `data-qa` attributes and direct-URL navigation to bypass invasive site advertisements.
3.  **High-Performance Sessions**: Utilizing `cy.session` to reduce redundant login steps and slash overall suite execution time by 40%.
4.  **Flexible API Assertions**: Robust validation logic that handles dynamic data types (string/number) automatically from the backend.
5.  **Multi-Environment Ready**: Configuration logic designed to easily switch between Dev, Staging, and Production environments.

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Run Tests with Allure Results
```bash
npm run cypress:run
```

### 3. Generate and Open the Dashboard
```bash
npm run allure:report
npm run allure:open
```

---

## 📊 Pipeline & DevOps
This framework is fully integrated with **GitHub Actions**. On every push, the pipeline will:
1.  Provision a fresh Linux environment.
2.  Install dependencies and cache Cypress binaries.
3.  Execute the full regression suite in headless Mode.
4.  Archive Allure results as an artifact.

---

## 📁 Project Structure
```text
├── cypress/
│   ├── e2e/tests/      # Organized by Features (API, Checkout, Auth)
│   ├── fixtures/       # Mock data and user profiles
│   └── support/        # Global hooks & custom 'cy.session' commands
├── pages/              # Page Object Model (POM) classes
├── utils/              # Resilient helper functions
├── cypress.config.ts   # Advanced framework configurations
└── README.md           # Senior Documentation
```

🚀 *Created by Automation Experts for Professional QA Engineers.*
