import { generateNonce } from "../helpers";

export default (options = {}) => {
  return async (req, res) => {
    const { query, scopes } = req.body;

    if (!query.shop) {
      return res
        .status(401)
        .json({ message: "Unauthorized: shop missing from query string." });
    }

    const { saveNonce } = options;
    const nonce = await generateNonce();

    if (saveNonce) {
      await saveNonce({ req, shopName: query.shop, nonce });
    }

    const authUrl = `https://${query.shop}/admin/oauth/authorize?client_id=${
      process.env.SHOPIFY_API_PUBLIC_KEY
    }&scope=${scopes || process.env.SHOPIFY_AUTH_SCOPES}&redirect_uri=${
      process.env.SHOPIFY_AUTH_CALLBACK_URL
    }&state=${nonce}`;

    res.status(200).json({
      redirectTo: authUrl,
    });
  };
};
