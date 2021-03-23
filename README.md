# Shopify NextJS Toolbox

A set of server side and client side NextJs utilities for integrating with Shopify's OAuth & App Bridge authentication systems.

These tools will allow you to complete all steps for Shopify's new authentication system without Koa.js.

This package includes the following tools:

### Server Side

#### Middleware

- `handleAuthStart` - for handling the first step of the Shopify OAuth handshake and redirecting back to Shopify with access scope requests
- `handleAuthCallback` - for handling the second step of the Shopify OAuth handshake and retrieving the merchant's access token
- `withSessionToken` - for verifying the Authorization HTTP header containing the frontend generated Session Token

#### Custom redirect

Custom redirect can be pass during OAuth completion at `handleAuthCallback`.

```javascript
// pages/api/auth/callback.js
import { handleAuthCallback } from 'shopify-nextjs-toolbox';

const afterAuth = async(req, res, accessToken) => {
  // save accessToken with the shop
  db.collection('shop').insertOne({name: req.query.shop, accessToken}, (err,result) => {
      if (err) throw err;

      if (result.result.hasOwnProperty('upserted') ) {
        console.log( JSON.stringify( result.result.upserted,  undefined, 2));
      }
  });

  //present user with billing options
  const subscriptionUrl = await getSubscriptionUrl(
    accessToken,
    shop,
    ...
  );

  // redirect is handled by handleAuthCallback, no need to res.send() or res.redirect() here.
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
