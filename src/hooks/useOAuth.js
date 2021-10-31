import React, { useEffect } from "react";
import qs from "querystring";
import axios from "axios";

/**
 * Start the OAuth process by redirecting the user to your app's /api/auth route
 *
 * @param scopes || string || list of Shopify OAuth scopes
 * @note the reason why we redirecting to our own API endpoint and not Shopify directly is because we need to generate a server side nonce
 */
export default function useOAuth(scopes) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location) {
      const query = qs.parse(window.location.search);
      axios
        .post("/api/auth", {
          query: query,
          scopes,
        })
        .then((response) => {
          if (response.data.redirectTo) {
            if (window.parent) {
              window.parent.location.href = response.data.redirectTo;
            } else {
              window.location.href = response.data.redirectTo;
            }
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, []);
}
