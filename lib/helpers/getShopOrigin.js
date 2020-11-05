"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getShopOrigin;

function getShopOrigin() {
  var queryOrigin = new URLSearchParams(window.location.search).get("shop");

  if (queryOrigin) {
    localStorage.setItem("shopOrigin", queryOrigin);
    return queryOrigin;
  } else {
    return localStorage.getItem("shopOrigin");
  }
}