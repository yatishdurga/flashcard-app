import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from 'react-oidc-context'; // Import AuthProvider for Cognito integration

// Cognito OIDC configuration
const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_CWcz0VnP0", // Replace with your Cognito User Pool's issuer URL
  client_id: "43v2nn87ore0j9a9502s5130k", // Replace with your App Client ID
  redirect_uri: "http://localhost:3000", // Replace with your redirect URI
  response_type: "code", // Use "code" for Authorization Code Flow
  scope: "email openid phone", // Define the required scopes
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname); // Clear query params after login
  },
  onError: (error) => {
    console.error("OIDC Error:", error); // Log OIDC initialization errors
  },
};

// Initialize the root React application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

