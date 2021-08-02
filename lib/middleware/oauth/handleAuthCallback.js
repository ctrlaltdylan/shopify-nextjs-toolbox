"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _querystring = _interopRequireDefault(require("querystring"));

var _verifyHmac = _interopRequireDefault(require("./verifyHmac"));

var _exchangeAccessToken = _interopRequireDefault(require("./exchangeAccessToken"));

var _url = require("url");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = function _default(handler, options) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var valid, validateNonce, validNonce, accessTokenQuery, accessToken, redirect, redirectUrl, redirectUrlQuery;
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
              return validateNonce(req.query.state, req);

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
              redirect = _context.sent;

              if (redirect) {
                _context.next = 29;
                break;
              }

              res.redirect("".concat(process.env.HOME_PATH, "?").concat(_querystring["default"].stringify(req.query)));
              return _context.abrupt("return");

            case 29:
              // if redirectUrl.origin is null, it means we have been given a path, not a fully qualified URL
              redirectUrl = new _url.URL(redirect);
              redirectUrlQuery = Object.fromEntries(redirectUrl.searchParams);

              if (redirectUrl.origin) {
                res.redirect("".concat(redirectUrl.origin).concat(redirectUrl.pathname, "?").concat(_querystring["default"].stringify(_objectSpread(_objectSpread({}, req.query), redirectUrlQuery))));
              }

              throw new Error("Please provide a fully qualifed URL. Instead received ".concat(redirect));

            case 35:
              _context.prev = 35;
              _context.t1 = _context["catch"](19);
              console.log(_context.t1);
              res.status(401).json({
                message: "Error while retrieving access token.",
                error: _context.t1
              });
              return _context.abrupt("return");

            case 40:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[19, 35]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports["default"] = _default;