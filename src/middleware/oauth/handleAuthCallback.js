import querystring from "querystring";
import verifyHmac from "./verifyHmac";
import exchangeAccessToken from './exchangeAccessToken';

export default handler => {
  return async (req, res) => {
    const valid = verifyHmac(req.query);
    if (!valid) {
      res.statusCode = 403;
      res.end(JSON.stringify({ message: "Invalid Signature." }));
      return;
    }

    const accessTokenQuery = querystring.stringify({
      code: req.query.code,
      client_id: process.env.SHOPIFY_API_PUBLIC_KEY,
      client_secret: process.env.SHOPIFY_API_PRIVATE_KEY,
    });

    try {
      const accessToken = await exchangeAccessToken(req.query.shop, accessTokenQuery);

      await handler(req, res, accessToken);

      // finished with oauth! Redirect to home page
      res.redirect(`${process.env.HOME_PATH}?shop=${req.query.shop}`);
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: "Error while retrieving access token.", error: err });
      return;
    }
  }
};
