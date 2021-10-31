"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _querystring = _interopRequireDefault(require("querystring"));

var _verifyHmac = _interopRequireDefault(require("./verifyHmac"));

var _exchangeAccessToken = _interopRequireDefault(require("./exchangeAccessToken"));

var _default = function _default(handler, options) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var valid, validateNonce, validNonce, accessTokenQuery, accessToken, redirectPath;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              valid = (0, _verifyHmac["default"])(req.query);

              if (valid) {
                _context.next = 5;
                break;
              }

              res.statusCode = 403;
              res.end(JSON.stringify({
                message: "Invalid Signature."
              }));
              return _context.abrupt("return");

            case 5:
              validateNonce = options && options.validateNonce;

              if (!validateNonce) {
                _context.next = 12;
                break;
              }

              _context.next = 9;
              return validateNonce({
                nonce: req.query.state,
                req: req,
                shopName: req.query.shop
              });

            case 9:
              _context.t0 = _context.sent;
              _context.next = 13;
              break;

            case 12:
              _context.t0 = true;

            case 13:
              validNonce = _context.t0;

              if (validNonce) {
                _context.next = 18;
                break;
              }

              res.statusCode = 403;
              res.end(JSON.stringify({
                message: "Invalid Nonce."
              }));
              return _context.abrupt("return");

            case 18:
              accessTokenQuery = _querystring["default"].stringify({
                code: req.query.code,
                client_id: process.env.SHOPIFY_API_PUBLIC_KEY,
                client_secret: process.env.SHOPIFY_API_PRIVATE_KEY
              });
              _context.prev = 19;
              _context.next = 22;
              return (0, _exchangeAccessToken["default"])(req.query.shop, accessTokenQuery);

            case 22:
              accessToken = _context.sent;
              _context.next = 25;
              return handler(req, res, accessToken);

            case 25:
              redirectPath = _context.sent;
              res.redirect("".concat(redirectPath || process.env.HOME_PATH, "?").concat(_querystring["default"].stringify(req.query)));
              return _context.abrupt("return");

            case 30:
              _context.prev = 30;
              _context.t1 = _context["catch"](19);
              console.log(_context.t1);
              res.status(401).json({
                message: "Error while retrieving access token.",
                error: _context.t1
              });
              return _context.abrupt("return");

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[19, 30]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;