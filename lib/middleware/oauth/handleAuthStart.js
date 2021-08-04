"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var nonce = require("nonce");

var createNonce = nonce();

var _default = function _default(options) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var _req$body, query, scopes, generateNonce, generatedNonce, authUrl;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, query = _req$body.query, scopes = _req$body.scopes;
              generateNonce = options && options.generateNonce;

              if (!generateNonce) {
                _context.next = 8;
                break;
              }

              _context.next = 5;
              return generateNonce(req);

            case 5:
              _context.t0 = _context.sent;
              _context.next = 9;
              break;

            case 8:
              _context.t0 = createNonce();

            case 9:
              generatedNonce = _context.t0;

              if (query.shop) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.status(401).json({
                message: "Unauthorized: Required Query or Shop missing."
              }));

            case 12:
              authUrl = "https://".concat(query.shop, "/admin/oauth/authorize?client_id=").concat(process.env.SHOPIFY_API_PUBLIC_KEY, "&scope=").concat(scopes || process.env.SHOPIFY_AUTH_SCOPES, "&redirect_uri=").concat(process.env.SHOPIFY_AUTH_CALLBACK_URL, "&state=").concat(generatedNonce);
              res.status(200).json({
                redirectTo: authUrl
              });

            case 14:
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