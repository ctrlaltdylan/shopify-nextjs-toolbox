"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useApi;

var _react = require("react");

var _SessionTokenContext = _interopRequireDefault(require("../contexts/SessionTokenContext"));

var _axios = _interopRequireDefault(require("axios"));

function useApi() {
  var sessionToken = (0, _react.useContext)(_SessionTokenContext["default"]);
  debugger;

  var instance = _axios["default"].create({
    headers: {
      Authorization: "Bearer ".concat(sessionToken)
    }
  });

  return instance;
}