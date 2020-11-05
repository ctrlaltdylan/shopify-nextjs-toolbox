"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = safeCompare;

var _crypto = _interopRequireDefault(require("crypto"));

function safeCompare(stringA, stringB) {
  var aLen = Buffer.byteLength(stringA);
  var bLen = Buffer.byteLength(stringB);

  if (aLen !== bLen) {
    return false;
  } // Turn strings into buffers with equal length
  // to avoid leaking the length


  var buffA = Buffer.alloc(aLen, 0, "utf8");
  buffA.write(stringA);
  var buffB = Buffer.alloc(bLen, 0, "utf8");
  buffB.write(stringB);
  return _crypto["default"].timingSafeEqual(buffA, buffB);
}