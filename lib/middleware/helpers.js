"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateNonce = generateNonce;

var _crypto = _interopRequireDefault(require("crypto"));

function generateNonce() {
  return _crypto["default"].randomBytes(16).toString("hex");
}