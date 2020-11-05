"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _lodash = require("lodash");

var withSessionToken = function withSessionToken(handler) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var token, decoded;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = (0, _lodash.get)(req, "headers.authorization", "").replace(/Bearer /, "");
              _context.prev = 1;
              _context.next = 4;
              return _jsonwebtoken["default"].verify(token, process.env.SHOPIFY_API_PRIVATE_KEY);

            case 4:
              decoded = _context.sent;
              req.sessionToken = decoded;
              req.shopDomain = decoded.dest;
              req.shopName = decoded.dest.replace('https://', '');
              return _context.abrupt("return", handler(req, res));

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);
              res.status(401).json({
                message: _context.t0.message
              });

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 11]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

var _default = withSessionToken;
exports["default"] = _default;