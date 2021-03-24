# Shopify NextJS Toolbox

A set of server side and client side NextJs utilities for integrating with Shopify's OAuth & App Bridge authentication systems.

These tools will allow you to complete all steps for Shopify's new authentication system without Koa.js.

This package includes the following tools:

### Server Side

#### Middleware

- `handleAuthStart` - for handling the first step of the Shopify OAuth handshake and redirecting back to Shopify with access scope requests
- `handleAuthCallback` - for handling the second step of the Shopify OAuth handshake and retrieving the merchant's access token
- `withSessionToken` - for verifying the Authorization HTTP header containing the frontend generated Session Token

#### Redirect to a custom URL after OAuth

By default `handleAuthCallback` assumes that after a user has accepted your app's scopes it will redirect the user back to the path defined in the `HOME_PATH` environment variable. No need to return a string or use `res.redirect` inside of the `handleAuthCallback`.

However, if your app prompts for a payment plan immediately on install, you'll need to redirect them to the payment plan's confirmation URL at runtime.

To do this, simply return the URL in string format from `handleAuthCallback` and it will redirect the user to that URL instead of the URL defined in `HOME_PATH`.

```javascript
// pages/api/auth/callback.js
import { handleAuthCallback } from 'shopify-nextjs-toolbox';

const afterAuth = async(req, res, accessToken) => {
  // save accessToken with the shop

  //present user with billing options
  const subscriptionUrl = await getSubscriptionUrl(
    accessToken,
    shop,
    ...
  );
  
  // the subscriptionUrl overrides redirecting to the HOME_PATH
  return subscriptionUrl;
};

export default handleAuthCallback(afterAuth);
```

### Client Side

#### Hooks

- `useApi` - for creating an axios instance that automatically adds the session token (`Authorization: Bearer <token here>`) to every HTTP request

#### Helpers

- `getShopOrigin` - for retrieving the `shopDomain` from the query string after the OAuth handshake for AppBridge to work properly. (uses Local Storage)
- `useShopOrigin` - [Recommended] also retrieves and stores the `shopDomain` but does not use local storage to store the string. Instead it just sets the `shopOrigin` in React state.

## How to integrate Shopify's OAuth with a NextJs project

View the corresponding [Shopify NextJs repository](https://github.com/ctrlaltdylan/shopify-session-tokens-nextjs) for a complete implementation example.

Specifically these files:

- `/pages/index.js`
- `/pages/api/auth.js`
- `/pages/api/auth/callback.js`

## How to integrate Shopify's App Bridge Session Tokens with a NextJs Project

View the corresponding [Shopify NextJs repository](https://github.com/ctrlaltdylan/shopify-session-tokens-nextjs) for a complete implementation example.

**Remember** session token generation occurs _after_ the OAuth handshake. So these components & pages are triggered after OAuth and the user has been redirected to `pages/home.js`.

- `/pages/_app.js`
- `/pages/home.js`
- `/pages/api/verify-token.js`
