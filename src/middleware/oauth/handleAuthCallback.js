import querystring from "querystring";
import verifyHmac from "./verifyHmac";
import exchangeAccessToken from "./exchangeAccessToken";

export default (handler, options) => {
  return async (req, res) => {
    const valid = verifyHmac(req.query);
    if (!valid) {
      res.statusCode = 403;
      res.end(JSON.stringify({ message: "Invalid Signature." }));
      return;
    }

    const validateNonce = options && options.validateNonce;
    const validNonce = validateNonce
      ? await validateNonce({
          nonce: req.query.state,
          req,
          shopName: req.query.shop,
        })
      : true;
    if (!validNonce) {
      res.statusCode = 403;
      res.end(JSON.stringify({ message: "Invalid Nonce." }));
      return;
    }

    const accessTokenQuery = querystring.stringify({
      code: req.query.code,
      client_id: process.env.SHOPIFY_API_PUBLIC_KEY,
      client_secret: process.env.SHOPIFY_API_PRIVATE_KEY,
    });

    try {
      const accessToken = await exchangeAccessToken(
        req.query.shop,
        accessTokenQuery
      );
      const redirectPath = await handler(req, res, accessToken);

      res.redirect(
        `${redirectPath || process.env.HOME_PATH}?${querystring.stringify(
          req.query
        )}`
      );
      return;
    } catch (err) {
      console.log(err);

      res
        .status(401)
        .json({ message: "Error while retrieving access token.", error: err });

      return;
    }
  };
};
