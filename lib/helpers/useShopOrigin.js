"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getShopOrigin;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

/**
 * Retrieve the shopOrigin query param and store it locally for future use
 */
function getShopOrigin() {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      shopOrigin = _useState2[0],
      setShopOrigin = _useState2[1];

  (0, _react.useEffect)(function () {
    if (typeof window !== "undefined" && window.location) {
      var queryOrigin = new URLSearchParams(window.location.search).get("shop");

      if (queryOrigin) {
        setShopOrigin(queryOrigin);
      }
    }
  }, []);
  return shopOrigin;
}