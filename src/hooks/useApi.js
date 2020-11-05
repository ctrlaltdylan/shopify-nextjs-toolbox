import { useContext } from "react";
import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Context as ShopifyAppContext } from "@shopify/app-bridge-react";

export default function useApi(token) {
  const api = axios.create();
  const app = useContext(ShopifyAppContext);

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

  return api;
}
