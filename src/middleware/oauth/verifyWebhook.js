const { createHmac } = require('crypto');

export default (handler) => {
  return async (req, res) => {
    const { SHOPIFY_API_PRIVATE_KEY } = process.env;
    const {
      headers: { 'x-shopify-hmac-sha256': hash, 'x-shopify-shop-domain': shop },
      rawBody,
    } = req;

    try {
      const generatedHmac = await createHmac('sha256', SHOPIFY_API_PRIVATE_KEY)
        .update(rawBody, 'utf8')
        .digest('base64');

      if (hash !== generatedHmac) {
        res.statusCode = 403;
        res.end(JSON.stringify({ message: 'Invalid Webhook Signature.' }));
        return;
      }
    } catch (err) {
      res.status(401).json({
        message: 'Error while verifying webhook signature.',
        error: err,
      });
      return;
    }

    try {
      return handler(req, res);
    } catch (err) {
      res.status(401).json({
        message: 'Error while processing webhook request.',
        error: err,
      });
      return;
    }
  };
};
