"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _helpers = require("../helpers");

var _default = function _default() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var _req$body, query, scopes, saveNonce, nonce, authUrl;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, query = _req$body.query, scopes = _req$body.scopes;

              if (query.shop) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(401).json({
                message: "Unauthorized: shop missing from query string."
              }));

            case 3:
              saveNonce = options.saveNonce;
              _context.next = 6;
              return (0, _helpers.generateNonce)();

            case 6:
              nonce = _context.sent;

              if (!saveNonce) {
                _context.next = 10;
                break;
              }

              _context.next = 10;
              return saveNonce({
                req: req,
                shopName: query.shop,
                nonce: nonce
              });

            case 10:
              authUrl = "https://".concat(query.shop, "/admin/oauth/authorize?client_id=").concat(process.env.SHOPIFY_API_PUBLIC_KEY, "&scope=").concat(scopes || process.env.SHOPIFY_AUTH_SCOPES, "&redirect_uri=").concat(process.env.SHOPIFY_AUTH_CALLBACK_URL, "&state=").concat(nonce);
              res.status(200).json({
                redirectTo: authUrl
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;