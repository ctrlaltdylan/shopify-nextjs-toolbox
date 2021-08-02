import querystring from "querystring";
import verifyHmac from "./verifyHmac";
import exchangeAccessToken from "./exchangeAccessToken";
import { URL } from "url";

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
      ? await validateNonce(req.query.state, req)
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
      // optional redirectUrl from the user, by default we use HOME_PATH
      const redirect = await handler(req, res, accessToken);

      if (!redirect) {
        res.redirect(
          `${process.env.HOME_PATH}?${querystring.stringify(req.query)}`
        );
        return;
      }

      // if redirectUrl.origin is null, it means we have been given a path, not a fully qualified URL
      const redirectUrl = new URL(redirect);
      const redirectUrlQuery = Object.fromEntries(redirectUrl.searchParams);

      if (redirectUrl.origin) {
        res.redirect(
          `${redirectUrl.origin}${redirectUrl.pathname}?${querystring.stringify(
            { ...req.query, ...redirectUrlQuery }
          )}`
        );
      }

      throw new Error(
        `Please provide a fully qualifed URL. Instead received ${redirect}`
      );
    } catch (err) {
      console.log(err);

      res
        .status(401)
        .json({ message: "Error while retrieving access token.", error: err });

      return;
    }
  };
};
