const nonce = require("nonce");
const createNonce = nonce();

export default (req, res) => {
  const { query } = req.body;
  const scopes = process.env.SHOPIFY_AUTH_SCOPES;
  const redirect_uri = process.env.SHOPIFY_AUTH_CALLBACK_URL;

  if (!query.shop) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Required Query or Shop missing." });
  }

  const authUrl = `https://${query.shop}/admin/oauth/authorize?client_id=${
    process.env.SHOPIFY_API_PUBLIC_KEY
  }&scope=${scopes}&redirect_uri=${redirect_uri}&state=${createNonce()}`;

  res.status(200).json({
    redirectTo: authUrl,
  });
};
