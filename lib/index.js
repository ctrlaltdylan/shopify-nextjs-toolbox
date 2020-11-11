"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useApi: true,
  SessionProvider: true,
  getShopOrigin: true,
  useShopOrigin: true,
  SessionTokenContext: true
};
Object.defineProperty(exports, "useApi", {
  enumerable: true,
  get: function get() {
    return _useApi["default"];
  }
});
Object.defineProperty(exports, "SessionProvider", {
  enumerable: true,
  get: function get() {
    return _SessionProvider["default"];
  }
});
Object.defineProperty(exports, "getShopOrigin", {
  enumerable: true,
  get: function get() {
    return _getShopOrigin["default"];
  }
});
Object.defineProperty(exports, "useShopOrigin", {
  enumerable: true,
  get: function get() {
    return _useShopOrigin["default"];
  }
});
Object.defineProperty(exports, "SessionTokenContext", {
  enumerable: true,
  get: function get() {
    return _SessionTokenContext["default"];
  }
});

var _middleware = require("./middleware");

Object.keys(_middleware).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _middleware[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _middleware[key];
    }
  });
});

var _useApi = _interopRequireDefault(require("./hooks/useApi"));

var _SessionProvider = _interopRequireDefault(require("./components/SessionProvider"));

var _getShopOrigin = _interopRequireDefault(require("./hooks/getShopOrigin"));

var _useShopOrigin = _interopRequireDefault(require("./hooks/useShopOrigin"));

var _SessionTokenContext = _interopRequireDefault(require("./contexts/SessionTokenContext"));