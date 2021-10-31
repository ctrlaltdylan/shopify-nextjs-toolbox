"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShopOrigin = getShopOrigin;
exports.getHost = getHost;
exports.getOAuthStartUrl = getOAuthStartUrl;

// get the shopOrigin query param from the URL
function getShopOrigin() {
  return new URLSearchParams(window.location.search).get("shop");
} // get the host param from the URL


function getHost() {
  return new URLSearchParams(window.location.search).get("host");
} // create the shop specific OAuth start URL. Including scopes & nonce


function getOAuthStartUrl(shopOrigin, nonce) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!shopOrigin) {
    throw new Error('shopOrigin (*.myshopify.com) is required to start the OAuth flow. Make sure you are parsing the shop query parameter from the current URL');
  }

  var scopes = options.scopes || process.env.NEXT_PUBLIC_SHOPIFY_AUTH_SCOPES;
  return "https://".concat(shopOrigin, "/admin/oauth/authorize?client_id=").concat(process.env.NEXT_PUBLIC_SHOPIFY_API_PUBLIC_KEY, "&scope=").concat(scopes, "&redirect_uri=").concat(process.env.NEXT_PUBLIC_SHOPIFY_AUTH_CALLBACK_URL, "&state=").concat(nonce);
}