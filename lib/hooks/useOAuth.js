"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useOAuth;

var _react = _interopRequireWildcard(require("react"));

var _querystring = _interopRequireDefault(require("querystring"));

var _axios = _interopRequireDefault(require("axios"));

/**
 * Start the OAuth process by redirecting the user to your app's /api/auth route
 *
 * @param scopes || string || list of Shopify OAuth scopes
 * @note the reason why we redirecting to our own API endpoint and not Shopify directly is because we need to generate a server side nonce
 */
function useOAuth(scopes) {
  (0, _react.useEffect)(function () {
    if (typeof window !== "undefined" && window.location) {
      var query = _querystring["default"].parse(window.location.search);

      _axios["default"].post("/api/auth", {
        query: query,
        scopes: scopes
      }).then(function (response) {
        if (response.data.redirectTo) {
          if (window.parent) {
            window.parent.location.href = response.data.redirectTo;
          } else {
            window.location.href = response.data.redirectTo;
          }
        }
      })["catch"](function (error) {
        console.error(error);
      });
    }
  }, []);
}