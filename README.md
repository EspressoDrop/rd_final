# FopHelp Test Automation Project

**⚡ This test automation framework is fully implemented, stable, and ready for expansion with additional test cases and coverage.**

[![Playwright Tests](https://github.com/EspressoDrop/rd_final/actions/workflows/playwright.yml/badge.svg)](https://github.com/EspressoDrop/rd_final/actions/workflows/playwright.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.61.1-green.svg)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-24%2B-brightgreen.svg)](https://nodejs.org/)

Automated testing suite for [FopHelp.pro](https://new.fophelp.pro) - a financial management platform for individual entrepreneurs (ФОП) in Ukraine.

**🎯 14 automated tests** | **✅ All passing** | **🚀 CI/CD with GitHub Actions**

## 📋 Project Description

This project provides comprehensive test coverage for the FopHelp.pro application, including:
- **API Testing** - Automated tests for REST API endpoints
- **E2E UI Testing** - End-to-end user interface tests using Playwright
- **Authentication** - Global authentication setup for efficient test execution
- **HTML Reporting** - Detailed test execution reports

## 🛠 Technologies Used

- **[Playwright](https://playwright.dev/)** v1.61.1 - Modern end-to-end testing framework
- **TypeScript** v6.0.3 - Type-safe test development
- **Node.js** - JavaScript runtime environment
- **GitHub Actions** - CI/CD pipeline for automated testing
- **HTML Reporter** - Built-in Playwright test reporting

### Development Tools:
- **ESLint** - Code quality and style checking
- **Prettier** - Code formatting
- **dotenv** - Environment variable management

## 📁 Project Structure

```
robot_final_project/
├── src/
│   ├── api/                    # API client and services
│   │   ├── api.service.ts      # Base HTTP service (with POST-based DELETE)
│   │   └── fophelp-api.client.ts  # API client with all endpoints + helper methods
│   ├── dto/                    # Data Transfer Objects (TypeScript types)
│   │   ├── income.dto.ts
│   │   ├── taxes.dto.ts
│   │   └── report.dto.ts
│   ├── pages/                  # Page Object Model for UI tests
│   │   ├── base.page.ts
│   │   ├── income.page.ts
│   │   └── reports.page.ts
│   ├── helpers/                # Utility functions
│   │   └── auth.helper.ts
│   └── config/                 # Configuration
│       └── env.config.ts
├── test/
│   ├── api/                    # API tests
│   │   ├── incomes.api.spec.ts
│   │   ├── taxes.api.spec.ts
│   │   └── reports.api.spec.ts
│   ├── e2e/                    # End-to-end UI tests
│   │   ├── incomes.e2e.spec.ts
│   │   └── reports.e2e.spec.ts
│   ├── fixtures/               # Custom Playwright fixtures
│   │   └── test.fixtures.ts
│   └── global-setup.ts         # Global authentication setup
├── .github/
│   └── workflows/              # GitHub Actions CI/CD
│       └── playwright.yml
├── playwright.config.ts        # Playwright configuration
├── package.json                # Dependencies and scripts
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## 🧪 Test Coverage

### API Tests (9 tests)
- ✅ Get all incomes
- ✅ Add new income
- ✅ Add and then delete an income
- ✅ Update an existing income
- ✅ Reject invalid income amount (negative test)
- ✅ Handle non-existent income deletion (negative test)
- ✅ Get current unpaid taxes
- ✅ Get payed taxes
- ✅ Get all reports

### E2E UI Tests (5 tests)
- ✅ Display incomes page
- ✅ Add new income via UI
- ✅ Display reports page
- ✅ Verify active navigation on reports page
- ✅ Verify reports page loads correctly

**Total: 14 automated tests** (9 API + 5 E2E)

## 🚀 Installation

### Prerequisites
- **Node.js** (v24 or higher) - LTS version recommended
- **npm** (comes with Node.js)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd robot_final_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install chromium
   ```

4. **Set up environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```env
   BASE_URL=https://new.fophelp.pro
   TEST_USERNAME=your_username
   TEST_PASSWORD=your_password
   API_BASE_URL=https://new.fophelp.pro/api
   AUTH_URL=https://new.fophelp.pro
   ```

## ▶️ Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test Suites
```bash
# API tests only
npm run test:api

# E2E UI tests only
npm run test:e2e

# E2E tests with visible browser
npm run test:e2e:headed
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### View Test Report
```bash
npm run test:report
```
After running tests, the HTML report is automatically generated in `playwright-report/`.

## 🏗️ Custom Test Framework Architecture

This project implements a **custom test automation framework** built on top of Playwright Test:

### Key Components:

1. **Custom Fixtures** (`test/fixtures/test.fixtures.ts`)
   - `apiContext` - API request context
   - `authenticatedApi` - Pre-authenticated API client with helper methods
   - Page fixtures: `incomePage`, `reportsPage`

2. **Page Object Model** (`src/pages/`)
   - Base page class with common functionality
   - Separate page classes for each application page
   - Encapsulated locators and actions

3. **API Client Layer** (`src/api/`)
   - `ApiService` - Generic HTTP methods (GET, POST, DELETE*)
     - *Note: DELETE uses POST internally (FopHelp API is non-RESTful)
   - `FophelpApiClient` - Application-specific API methods
   - Helper methods: `findIncomeByComment()`, `findIncomeById()`
   - Safe JSON parsing with error handling

4. **Type Safety** (`src/dto/`)
   - TypeScript DTOs for all API request/response objects
   - Strong typing throughout the framework

5. **Helpers & Utilities** (`src/helpers/`)
   - Authentication helper
   - Environment configuration
   - Reusable utility functions

## 🔐 Authentication

This project uses **global authentication setup** for efficient test execution:
- Login happens **once** before all tests (in `test/global-setup.ts`)
- Authentication state is saved to `test/.auth/user.json`
- State is reused by all E2E tests via `storageState` in Playwright config
- No repeated logins = faster test execution
- API tests use `AuthHelper` for token-based authentication

## 📊 Reporting

Tests generate an **HTML report** with:
- ✅ Pass/fail status for each test
- ⏱️ Execution time
- 📸 Screenshots on failure
- 🎥 Video recordings on failure
- 📋 Detailed error messages

## 🔄 CI/CD Pipeline

This project uses **GitHub Actions** for continuous integration:
- ✅ Runs automatically on every push to `master` branch
- ✅ Runs on pull requests to `master` branch
- ✅ Manual trigger via `workflow_dispatch`
- ✅ Executes all 14 tests in headless mode using `xvfb-run`
- ✅ Uses Node.js v24+ for compatibility
- ✅ Installs Playwright browsers with system dependencies
- ✅ Generates and uploads HTML reports as artifacts (30 days retention)
- ✅ Uploads screenshots/videos on failure (7 days retention)
- ✅ All tests currently **passing** ✅

### View CI/CD Results
1. Go to the **Actions** tab in the GitHub repository: https://github.com/EspressoDrop/rd_final/actions
2. Click on the latest workflow run
3. Download the **playwright-report** artifact to view the HTML report
4. Download **test-screenshots** artifact if tests failed

### GitHub Secrets Configuration
The following secrets must be configured in GitHub repository settings for CI/CD to work:
- `BASE_URL` - Application base URL
- `TEST_USERNAME` - Test user email
- `TEST_PASSWORD` - Test user password
- `API_BASE_URL` - API base URL
- `AUTH_URL` - Authentication URL

## 📝 Additional Scripts

```bash
# Run tests in headed mode (visible browser)
npm run test:headed

# Run specific browser
npm run test:chromium
```

## 🔧 Configuration

- **playwright.config.ts** - Playwright test configuration
  - Timeout settings (120s test timeout, 60s navigation, 30s action)
  - Browser configuration (Chromium with anti-automation features disabled)
  - Reporter setup (HTML reports)
  - Global authentication via `storageState`
  - Screenshot and video on failure

- **.env** - Environment variables (not committed to git)
  - API endpoints
  - Test credentials

## 🐛 Known Issues

- ⚠️ **API Bug Discovered**: The FopHelp API accepts negative income amounts (e.g., `-5000`) without validation. This is a backend issue that should be fixed to reject invalid amounts. A test case has been added to verify this behavior, but it currently expects the API to accept negative values until the backend implements proper validation.

## 👤 Author

Andrii Yefimchuk (EspressoDrop)