import { useContext, useEffect } from "react";
import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Context as ShopifyAppContext } from "@shopify/app-bridge-react";

const api = axios.create();

/**
 * Creates a axios client that uses Shopify JWT Session Token authentication
 *
 * @returns axios
 */
export default function useApi() {
  const app = useContext(ShopifyAppContext);

  useEffect(() => {
    if (app) {
      api.interceptors.request.use((config) => {
        return getSessionToken(app)
          .then((token) => {
            config.headers["Authorization"] = `Bearer ${token}`;
            return config;
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }, [app]);

  return api;
}
