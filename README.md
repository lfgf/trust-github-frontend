# Kojinx Trust Module: GitHub Frontend

[![NPM version](https://img.shields.io/npm/v/@kojinx/github.svg)](https://www.npmjs.com/package/@kojinx/github)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is an official Trust Module for the **Kojinx** ecosystem. 

## 🛡️ What is a "Trust Module"?

Kojinx operates under a **surgical trust** architecture. Rather than open-sourcing the entire proprietary monolith, we exclusively extract the exact code paths (pure functions and components) that interact with sensitive user data, API keys, or OAuth tokens. 

These functions are packaged into isolated, public, and fully auditable libraries called **Trust Modules**. The proprietary core system imports these packages to perform sensitive actions. 

### Why is this open source?
We believe that developers should never have to blindly trust an application with their third-party credentials. By making this module open source, anyone can audit the exact Angular components and services that negotiate the GitHub OAuth flow within the Kojinx platform.

You can verify that:
- We don't perform hidden requests in the background.
- We don't send your tokens to untrusted analytics servers.
- The UI components handle authentication states purely and predictably.

## 📦 What does this module do?

This library encapsulates the frontend logic for Kojinx's GitHub integration. It provides Angular components and services to:
1. Initiate the OAuth flow securely (`GithubAuthService.initiateOAuth`).
2. Provide a standardized login button (`<github-login-button>`).
3. Provide an integration management card (`<github-integration-card>`) to link and unlink accounts.

The services communicate exclusively with the Kojinx Trust Module backend and the Tauri native API layer for secure browser opening.

## 🚀 How to use and test

If you are auditing this code or wish to run the module locally:

1. Clone this repository.
2. Ensure you have [Node.js](https://nodejs.org/) installed.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the library:
   ```bash
   npm run build
   ```

Because this module uses Angular's standard dependency injection for external boundaries, you can easily audit its HTTP calls and logic independently from the main Kojinx system.

## 🤝 Contributing

While this library is primarily extracted for auditing purposes, we welcome issues and pull requests if you spot security vulnerabilities, inefficiencies, or bugs in how we handle GitHub API interactions on the client side.

## 📄 License

This project is licensed under the MIT License.
