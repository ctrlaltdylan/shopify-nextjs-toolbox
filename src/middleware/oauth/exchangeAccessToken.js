import axios from "axios";

export default async (shop, accessTokenQuery) => {
  return axios.post(`https://${shop}/admin/oauth/access_token`, {
    accessTokenQuery,
  });
};
