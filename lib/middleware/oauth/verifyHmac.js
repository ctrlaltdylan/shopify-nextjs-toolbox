"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = verifyHmac;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _safeCompare = _interopRequireDefault(require("./safeCompare"));

var _crypto = _interopRequireDefault(require("crypto"));

var _querystring = _interopRequireDefault(require("querystring"));

function verifyHmac(query) {
  var hmac = query.hmac,
      _signature = query.signature,
      map = (0, _objectWithoutProperties2["default"])(query, ["hmac", "signature"]);
  var orderedMap = Object.keys(map).sort(function (v1, v2) {
    return v1.localeCompare(v2);
  }).reduce(function (sum, k) {
    sum[k] = query[k];
    return sum;
  }, {});

  var message = _querystring["default"].stringify(orderedMap);

  var compute_hmac = _crypto["default"].createHmac("sha256", process.env.SHOPIFY_API_PRIVATE_KEY).update(message).digest("hex");

  return (0, _safeCompare["default"])(hmac, compute_hmac);
}