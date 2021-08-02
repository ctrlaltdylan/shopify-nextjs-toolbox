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

#### Validating Nonce during OAuth handshake.

It is recommended that you use and validate a state parameter (also called a nonce) during the OAuth handshake. By default, `handleAuthStart` generates a random string, but does not verify it. You should consider implementing your own generation and verification for the nonce.

Read more about nonce verification on the [Shopify Authentication Docs](https://shopify.dev/tutorials/authenticate-with-oauth) and the state parameter on the [OAuth 2 RFC](https://datatracker.ietf.org/doc/html/rfc6819#section-3.6).

To generate your own nonce, provide an async function as an option to `handleAuthStart`:

```javascript
import { handleAuthStart } from "shopify-nextjs-toolbox";

const generateNonce = async (req) => {
  console.log("generating nonce");
  return "my-generated-nonce"; //eg. create uniq id in database
};

export default handleAuthStart({ generateNonce });
```

To validate the nonce on the callback, provide an async function as an option to `handleAuthCallback`:

```javascript
import { handleAuthCallback } from 'shopify-nextjs-toolbox';

const afterAuth = async(req, res, accessToken) => {
 ...
};

const validateNonce = async (nonce, req) => {
  console.log("validating nonce");
  return nonce === 'my-generated-nonce'; //eg. validate and remove from database
}

export default handleAuthCallback(afterAuth, { validateNonce })
```

### Client Side

#### Components

- `ShopifyAppBridgeProvider` - this component will act as the gatekeeper to your app. It will redirect to begin the OAuth process if the user isn't authenticated.

#### Hooks

- `useApi` - for creating an axios instance that automatically adds the session token (`Authorization: Bearer <token here>`) to every HTTP request
- `useShopOrigin` - for retrieving the `shopOrigin` query string parameter given by Shopify from the URL
- `useHost` - for retrieving the `host` query string parameter given by Shopify from the URL

## How to integrate Shopify's OAuth with a NextJs project

View the corresponding [Shopify NextJs repository](https://github.com/ctrlaltdylan/shopify-session-tokens-nextjs) for a complete implementation example.

Specifically these files:

- `/pages/_app.js`
- `/pages/index.js`
- `/pages/api/auth.js`
- `/pages/api/auth/callback.js`

## How to integrate Shopify's App Bridge Session Tokens with a NextJs Project

View the corresponding [Shopify NextJs repository](https://github.com/ctrlaltdylan/shopify-session-tokens-nextjs) for a complete implementation example.

**Remember** session token generation occurs _after_ the OAuth handshake. So these components & pages are triggered after OAuth and the user has been redirected to `pages/home.js`.

- `/pages/_app.js`
- `/pages/home.js`
- `/pages/api/verify-token.js`

## Frequently Asked Questions

**I'm trying to deploy my Shopify NextJS app to Vercel, but I can't use an extra server like Koa to deploy. Can I use this package instead?**

That's right. This package _only uses NextJS API routing_. There is no extra server needed. You'll be able to deploy to Vercel using the `shopify-nextjs-toolbox` package for handling your authentication.

**I'm trying to migrate my app off of the cookie based authentication and to session tokens, will this do that?**

Also correct, you can use the middleware and hooks provided by `shopify-nextjs-toolbox` to do so.

**Do I need to store the `shopOrigin` variable in localStorage in order to use this?**

No, the `useShopOrigin` hook will take care of storing the shop's origin (a.k.a. the primary ID of the shop within Shopify, looks like `shop-name.myshopify.com`). If you need to use the shop's primary ID elsewhere in the frontend you can do so with `useShopifyOrigin`.

**Do I need to use `useShopOrigin` to make API requests back to my API?**

No, that's the nice part about Shopify's Session Tokens. The shop's name is actually encoded in the session token. The `withSessionToken` middleware will automatically populate the `req.shopName` with the shop's unique Shopify name.

You don't need to pass the shop name to the API manually. Simply use the `useApi` hook to create the API client and it will handle passing the session token to your API in the `Authorization` header.

## Migrating from v1 to v2

The original `shopify-nextjs-toolbox` package was compatible with AppBridge v1. AppBridge v2 has seen been released and is required for all new apps, and starting Jan 1st 2022 it will be required for all Shopify apps to use AppBridge v2.

If you're using `shopify-nextjs-toolbox` version 1.x, here's how to use the new v2.

### 1. Update your frontend index page to use the new useOAuth hook:

```javascript
// pages/index.js

import React, { useEffect } from "react";
import { useOAuth } from "shopify-nextjs-toolbox";

export default function Index() {
  // if the current user isn't logged in, redirect them to begin OAuth on Shopify
  useOAuth();

  // replace this with your jazzy loading icon animation
  return <>Loading...</>;
}
```

### 2. Replace Shopify's <Provider> with the included <ShopifyAppBridgeProvider>

```javascript
import { ShopifyAppBridgeProvider } from "shopify-nextjs-toolbox";
import { Provider } from "@shopify/app-bridge-react";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";

function MyApp({ Component, pageProps }) {
  // The ShopifyAppBridgeProvider abstracts starting the OAuth process
  //   it will automatically redirect unauthenticated users to your `/api/auth.js` route
  //   note: the "appBridgeConfig" is just a way to pass AppBridge options, by default we'll handle passing the host in for you
  return (
    <ShopifyAppBridgeProvider
      Component={Component}
      pageProps={pageProps}
      appBridgeConfig={{}}
    >
      <AppProvider i18n={enTranslations}>
        <Component {...pageProps} />
      </AppProvider>
    </ShopifyAppBridgeProvider>
  );
}

export default MyApp;
```

### 2. (Optional) implement a nonce at the start of the OAuth process

```javascript
// pages/api/auth.js

import { handleAuthStart } from "shopify-nextjs-toolbox";

const generateNonce = async (req) => {
  // create a unique string and associate it with the current shop in the database
  // during the OAuth callback step, we'll verify Shopify sends it back to us
  // this proves Shopify is Shopify and not some bad actor

  return "{{ nonce here }}";
};

export default handleAuthStart;
```
