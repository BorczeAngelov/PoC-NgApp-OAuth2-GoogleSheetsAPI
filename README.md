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
- [x] Enable the Google Sheets API and obtain OAuth 2.0 credentials from the Google Cloud Console.
- [x] CRUD operations to the Google Spreadsheet.

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


## Google Authentication in Angular App

Follow these steps to add Google authentication to your Angular app:

1. **Load the Client Library**: Add the following script between the `<head></head>` tags of your `index.html` file in your Angular project:
```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

2. **Add Initialization Code**: In the component where you want to have the "Sign in with Google" button, add this code to the `ngOnInit()` function:
```typescript
ngOnInit() {
  // @ts-ignore
  google.accounts.id.initialize({
    client_id: "YOUR GOOGLE CLIENT ID",
    callback: this.handleCredentialResponse.bind(this),
    auto_select: false,
    cancel_on_tap_outside: true,
  });
  // @ts-ignore
  google.accounts.id.renderButton(
  // @ts-ignore
  document.getElementById("google-button"),
    { theme: "outline", size: "large", width: "100%" }
  );
  // @ts-ignore
  google.accounts.id.prompt((notification: PromptMomentNotification) => {});
}  
async handleCredentialResponse(response: any) {
  // Here will be your response from Google.
  console.log(response);
}
```
Replace `"YOUR GOOGLE CLIENT ID"` with your actual Google client ID.

3. **Add Button Element**: Add a `div` or `button` element to the HTML file of this component, with the same id that you mentioned in the initialization (`"google-button"`):
```html
<div class="" id="google-button"></div>
```
Now, you should have a "Sign in with Google" button in your Angular app.
