# Shopify NextJS Toolbox

A set of server side and client side NextJs utilities for integrating with Shopify's OAuth & App Bridge authentication systems.

These tools will allow you to complete all steps for Shopify's new authentication system without Koa.js.

This package includes the following tools:

### Server Side

#### Middleware
* `handleAuthStart` - for handling the first step of the Shopify OAuth handshake and redirecting back to Shopify with access scope requests
* `handleAuthCallback` - for handling the second step of the Shopify OAuth handshake and retrieving the merchant's access token
* `withSessionToken` - for verifying the Authorization HTTP header containing the frontend generated Session Token 

### Client Side

#### Hooks
* `useApi` - for creating an axios instance that automatically adds the session token (`Authorization: Bearer <token here>`) to every HTTP request
#### Helpers
* `getShopOrigin` - for retrieving the `shopDomain` from the query string after the OAuth handshake for AppBridge to work properly.


## How to integrate Shopify's OAuth with a NextJs project

View the corresponding [Shopify NextJs repository](https://github.com/ctrlaltdylan/shopify-session-tokens-nextjs) for a complete implementation example.

Specifically these files:

* `/pages/index.js`
* `/pages/api/auth.js`
* `/pages/api/auth/callback.js`

## How to integrate Shopify's App Bridge Session Tokens with a NextJs Project

View the corresponding [Shopify NextJs repository](https://github.com/ctrlaltdylan/shopify-session-tokens-nextjs) for a complete implementation example.

**Remember** session token generation occurs _after_ the OAuth handshake. So these components & pages are triggered after OAuth and the user has been redirected to `pages/home.js`.

* `/pages/_app.js`
* `/pages/home.js`
* `/pages/api/verify-token.js`
