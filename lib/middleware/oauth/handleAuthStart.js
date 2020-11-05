"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var nonce = require("nonce");

var createNonce = nonce();

var _default = function _default(req, res) {
  var query = req.body.query;
  var scopes = process.env.SHOPIFY_AUTH_SCOPES;
  var redirect_uri = process.env.SHOPIFY_AUTH_CALLBACK_URL;

  if (!query.shop) {
    return res.status(401).json({
      message: "Unauthorized: Required Query or Shop missing."
    });
  }

  var authUrl = "https://".concat(query.shop, "/admin/oauth/authorize?client_id=").concat(process.env.SHOPIFY_API_PUBLIC_KEY, "&scope=").concat(scopes, "&redirect_uri=").concat(redirect_uri, "&state=").concat(createNonce());
  res.status(200).json({
    redirectTo: authUrl
  });
};

exports["default"] = _default;