"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useApi;

var _react = require("react");

var _axios = _interopRequireDefault(require("axios"));

var _appBridgeUtils = require("@shopify/app-bridge-utils");

var _appBridgeReact = require("@shopify/app-bridge-react");

/**
 * Creates a axios client that uses Shopify JWT Session Token authentication
 *
 * @returns axios
 */
function useApi() {
  var api = _axios["default"].create();

  var app = (0, _react.useContext)(_appBridgeReact.Context);
  api.interceptors.request.use(function (config) {
    return (0, _appBridgeUtils.getSessionToken)(app).then(function (token) {
      config.headers["Authorization"] = "Bearer ".concat(token);
      return config;
    })["catch"](function (err) {
      console.log(err);
    });
  });
  return api;
}