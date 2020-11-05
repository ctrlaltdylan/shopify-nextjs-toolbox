"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SessionProvider;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _appBridgeReact = require("@shopify/app-bridge-react");

var _appBridgeUtils = require("@shopify/app-bridge-utils");

var _SessionTokenContext = _interopRequireDefault(require("../contexts/SessionTokenContext"));

function SessionProvider(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      sessionToken = _useState2[0],
      setSessionToken = _useState2[1];

  var app = (0, _react.useContext)(_appBridgeReact.Context);
  (0, _react.useEffect)(function () {
    if (app) {
      (0, _appBridgeUtils.getSessionToken)(app).then(function (sessionToken) {
        setSessionToken(sessionToken);
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, [app]);
  var loadingMarkup = props.renderLoading ? props.renderLoading : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "Loading...");
  return /*#__PURE__*/_react["default"].createElement(_SessionTokenContext["default"].Provider, {
    value: sessionToken
  }, sessionToken && app ? props.children : loadingMarkup);
}