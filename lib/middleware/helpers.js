"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNonce = createNonce;

var _crypto = _interopRequireDefault(require("crypto"));

function createNonce() {
  return _crypto["default"].randomBytes(16).toString("base64");
}