import { useState, useEffect } from "react";

/**
 * Retrieve the shopOrigin query param and store it locally for future use
 */
export default function useShopOrigin() {
  const [shopOrigin, setShopOrigin] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.location) {
      const queryOrigin = new URLSearchParams(window.location.search).get(
        "shop"
      );

      if (queryOrigin) {
        setShopOrigin(queryOrigin);
      }
    }
  }, []);

  return shopOrigin;
}
