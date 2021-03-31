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
* `getShopOrigin` - for retrieving the `shopDomain` from the query string after the OAuth handshake for AppBridge to work properly. (uses Local Storage)
* `useShopOrigin` - [Recommended] also retrieves and stores the `shopDomain` but does not use local storage to store the string. Instead it just sets the `shopOrigin` in React state.

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
