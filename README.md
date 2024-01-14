# PoC-NgApp-OAuth2-GoogleSheetsAPI

This repository contains a minimalistic Angular application that demonstrates the integration of OAuth 2.0 authentication with the Google Sheets API.
The app allows users to securely interact with a Google Spreadsheet and is designed for deployment on GitHub Pages.

Feel free to clone this repository and explore the integration of these technologies in a simple, yet functional Angular application.

## Key Features

- **OAuth 2.0 Authentication**: Securely authenticate users with their Google account.
- **Google Sheets API**: Append text messages to a designated Google Spreadsheet.
- **Angular Framework**: Utilize Angular for a responsive and interactive user experience.
- **GitHub Pages Deployment**: Easily access and use the app through GitHub Pages.

## TODOs

- [x] Set up the Angular development environment and project structure.
- [x] Implement the authentication service using Google OAuth 2.0.
- [ ] Enable the Google Sheets API and obtain OAuth 2.0 credentials from the Google Cloud Console.
- [ ] Create the UI components for the text input and submission.
- [ ] Develop the service to handle HTTP requests to the Google Sheets API.
- [ ] Write the logic to append text messages to the Google Spreadsheet.
- [ ] Configure the deployment process to GitHub Pages.

## Publishing Angular App on GitHub Pages

### Step 1: Install GitHub Pages Package
First, you need to install the `gh-pages` package. This package will create a gh-pages branch on your GitHub repository and push your built files to this branch.

```bash
    npm install gh-pages
```

### Step 2: Build Your Angular App
Next, you need to build your Angular app for production. The `--base-href` option is used to set the base URL for the application. Replace `https://borczeangelov.github.io/PoC-NgApp-OAuth2-GoogleSheetsAPI/` with the URL of your GitHub Pages.

```bash
    ng build --configuration production --base-href="https://borczeangelov.github.io/PoC-NgApp-OAuth2-GoogleSheetsAPI/"
```

### Step 3: Deploy to GitHub Pages
Finally, you can deploy your app to GitHub Pages. The `--dir` option is used to specify the directory of the built files. Replace `dist/poc-google-sheets-api/browser/` with the directory of your built files.

```bash
    npx angular-cli-ghpages --dir=dist/poc-google-sheets-api/browser/
```

### Step 4: Verify Deployment
Your app should now be live on GitHub Pages. You can verify it by visiting the URL you used in the `--base-href` option.



