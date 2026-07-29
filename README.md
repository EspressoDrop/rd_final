# FopHelp Test Automation Project

Automated testing suite for [FopHelp.pro](https://new.fophelp.pro) - a financial management platform for individual entrepreneurs in Ukraine.

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
lesson25_course_project/
├── src/
│   ├── api/                    # API client and services
│   │   ├── api.service.ts      # Base HTTP service
│   │   └── fophelp-api.client.ts  # API client with all endpoints
│   ├── dto/                    # Data Transfer Objects (TypeScript types)
│   │   ├── income.dto.ts
│   │   ├── expense.dto.ts
│   │   ├── taxes.dto.ts
│   │   └── report.dto.ts
│   ├── pages/                  # Page Object Model for UI tests
│   │   ├── base.page.ts
│   │   ├── login.page.ts
│   │   ├── dashboard.page.ts
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
│   │   ├── auth.e2e.spec.ts
│   │   ├── incomes.e2e.spec.ts
│   │   └── reports.e2e.spec.ts
│   ├── fixtures/               # Custom Playwright fixtures
│   │   └── test.fixtures.ts
│   └── global-setup.ts         # Global authentication setup
├── .github/
│   └── workflows/              # GitHub Actions CI/CD
├── playwright.config.ts        # Playwright configuration
├── package.json                # Dependencies and scripts
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## 🧪 Test Coverage

### API Tests (4 tests)
- ✅ Get all incomes
- ✅ Add new income
- ✅ Get payed taxes
- ✅ Get all reports

### E2E UI Tests (5 tests)
- ✅ Authentication verification
- ✅ Display incomes page
- ✅ Add new income via UI
- ✅ Display reports page
- ✅ Verify active navigation

**Total: 9 automated tests**

## 🚀 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lesson25_course_project
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

## 🔐 Authentication

This project uses **global authentication setup** for efficient test execution:
- Login happens **once** before all tests (in `test/global-setup.ts`)
- Authentication state is saved and reused by all E2E tests
- No repeated logins = faster test execution

## 📊 Reporting

Tests generate an **HTML report** with:
- ✅ Pass/fail status for each test
- ⏱️ Execution time
- 📸 Screenshots on failure
- 🎥 Video recordings on failure
- 📋 Detailed error messages

## 🔄 CI/CD Pipeline

This project uses **GitHub Actions** for continuous integration:
- ✅ Runs automatically on every push and pull request
- ✅ Executes all tests in headless mode
- ✅ Generates and uploads HTML reports as artifacts
- ✅ Displays test results in GitHub Actions UI

### View CI/CD Results
1. Go to the **Actions** tab in the GitHub repository
2. Click on the latest workflow run
3. Download the **playwright-report** artifact to view the HTML report

## 📝 Additional Scripts

```bash
# Run tests in headed mode (visible browser)
npm run test:headed

# Run specific browser
npm run test:chromium

# Run integration tests
npm run test:integration
```

## 🔧 Configuration

- **playwright.config.ts** - Playwright test configuration
  - Timeout settings
  - Browser configuration
  - Reporter setup
  - Global authentication

- **.env** - Environment variables (not committed to git)
  - API endpoints
  - Test credentials

## 🤝 Contributing

This is a course project for test automation training.

## 📄 License

ISC

## 👤 Author

Andrii Yefimchuk (EspressoDrop)

---

## 📚 Course Requirements Met

- ✅ API тестування (API Testing)
- ✅ E2E UI тестування (End-to-end UI Testing)
- ✅ HTML звіти (HTML Reports)
- ✅ CI/CD автоматизація (CI/CD Automation)
- ✅ Git репозиторій (Git Repository)
- ✅ README документація (README Documentation)

