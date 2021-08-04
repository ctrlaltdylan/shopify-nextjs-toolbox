const nonce = require("nonce");
const createNonce = nonce();

export default (options) => {
  return async (req, res) => {
    const { query, scopes } = req.body;

    const generateNonce = options && options.generateNonce;
    const generatedNonce = generateNonce
      ? await generateNonce(req)
      : createNonce();

    if (!query.shop) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Required Query or Shop missing." });
    }

    const authUrl = `https://${query.shop}/admin/oauth/authorize?client_id=${
      process.env.SHOPIFY_API_PUBLIC_KEY
    }&scope=${scopes || process.env.SHOPIFY_AUTH_SCOPES}&redirect_uri=${
      process.env.SHOPIFY_AUTH_CALLBACK_URL
    }&state=${generatedNonce}`;

    res.status(200).json({
      redirectTo: authUrl,
    });
  };
};
