"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ShopifyAppBridgeProvider;

var _react = _interopRequireDefault(require("react"));

var _appBridgeReact = require("@shopify/app-bridge-react");

var _useHost = _interopRequireDefault(require("../hooks/useHost"));

var _useShopOrigin = _interopRequireDefault(require("../hooks/useShopOrigin"));

/**
 * Wrap the Shopify AppBridge instantiation, if the host or shopOrigin isn't available, then start the OAuth process
 *
 * @param {*} props
 * @returns Component
 */
function ShopifyAppBridgeProvider(props) {
  var children = props.children,
      Component = props.Component,
      pageProps = props.pageProps;
  var shopOrigin = (0, _useShopOrigin["default"])();
  var host = (0, _useHost["default"])();

  if (typeof window == "undefined" || !window.location || !shopOrigin || !host) {
    return /*#__PURE__*/_react["default"].createElement(Component, pageProps);
  }

  var config = {
    apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_PUBLIC_KEY,
    forceRedirect: true,
    host: host
  };
  return /*#__PURE__*/_react["default"].createElement(_appBridgeReact.Provider, {
    config: config
  }, children);
}