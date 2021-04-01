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

var _default = function _default(handler) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var valid, accessTokenQuery, accessToken, redirectUrl;
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
              accessTokenQuery = _querystring["default"].stringify({
                code: req.query.code,
                client_id: process.env.SHOPIFY_API_PUBLIC_KEY,
                client_secret: process.env.SHOPIFY_API_PRIVATE_KEY
              });
              _context.prev = 6;
              _context.next = 9;
              return (0, _exchangeAccessToken["default"])(req.query.shop, accessTokenQuery);

            case 9:
              accessToken = _context.sent;
              _context.next = 12;
              return handler(req, res, accessToken);

            case 12:
              redirectUrl = _context.sent;
              // finished with oauth! Redirect to home page or the custom URL provided by the handler
              res.redirect("".concat(redirectUrl || process.env.HOME_PATH, "?shop=").concat(req.query.shop));
              _context.next = 21;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](6);
              console.log(_context.t0);
              res.status(401).json({
                message: "Error while retrieving access token.",
                error: _context.t0
              });
              return _context.abrupt("return");

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[6, 16]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;