import { useState } from 'react';
/**
 * Retrieve the shopOrigin query param and store it locally for furture use
 */
export default function getShopOrigin() {
  const [shopOrigin, setShopOrigin] = useState(false);
  const queryOrigin = new URLSearchParams(window.location.search).get("shop");

  if (queryOrigin) {
    setShopOrigin(queryOrigin)
    return queryOrigin;
  } else {
    return shopOrigin;
  }
}
