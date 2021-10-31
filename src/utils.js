// get the shopOrigin query param from the URL
export function getShopOrigin() {
  return new URLSearchParams(window.location.search).get("shop");
}

// get the host param from the URL
export function getHost() {
  return new URLSearchParams(window.location.search).get("host");
}

// create the shop specific OAuth start URL. Including scopes & nonce
export function getOAuthStartUrl(shopOrigin, nonce, options = {}) {
  if(!shopOrigin) {
    throw new Error('shopOrigin (*.myshopify.com) is required to start the OAuth flow. Make sure you are parsing the shop query parameter from the current URL');
  }

  const scopes = options.scopes || process.env.NEXT_PUBLIC_SHOPIFY_AUTH_SCOPES;

  return `https://${shopOrigin}/admin/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_SHOPIFY_API_PUBLIC_KEY}&scope=${scopes}&redirect_uri=${process.env.NEXT_PUBLIC_SHOPIFY_AUTH_CALLBACK_URL}&state=${nonce}`;
}
