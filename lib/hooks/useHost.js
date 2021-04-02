"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useHost;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

/**
 * Retrieve the host query param and store it locally for future use
 */
function useHost() {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      host = _useState2[0],
      sethost = _useState2[1];

  (0, _react.useEffect)(function () {
    if (typeof window !== "undefined" && window.location) {
      var queryHost = new URLSearchParams(window.location.search).get("host");

      if (queryHost) {
        setHost(queryHost);
      }
    }
  }, []);
  return host;
}