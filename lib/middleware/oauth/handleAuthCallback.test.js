"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _handleAuthCallback = _interopRequireDefault(require("./handleAuthCallback"));

var _exchangeAccessToken = _interopRequireDefault(require("./exchangeAccessToken"));

var _verifyHmac = _interopRequireDefault(require("./verifyHmac"));

var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));

jest.mock('./exchangeAccessToken');
jest.mock('./verifyHmac');

var req = _nodeMocksHttp["default"].createRequest({
  method: "POST",
  url: "/api/auth/callback",
  headers: {},
  query: {
    shop: "test.myshopify.com"
  }
});

var res = {
  redirect: jest.fn()
};
describe('Handling the Shopify OAuth callback response', function () {
  var OLD_ENV = process.env;
  beforeEach(function () {
    jest.resetModules();

    _verifyHmac["default"].mockReturnValue(true);

    process.env.HOME_PATH = '/home';
  });
  afterAll(function () {
    process.env = OLD_ENV; // Restore old environment
  });
  test('it redirects to the HOME_PATH by default', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _handleAuthCallback["default"])(function (req, res) {})(req, res);

          case 2:
            expect(res.redirect).toHaveBeenCalledWith('/home?shop=test.myshopify.com');

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('it redirects to the provided path if the handler returns a custom path with the shop query param appended automatically', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _handleAuthCallback["default"])(function (req, res) {
              return '/a-custom-path';
            })(req, res);

          case 2:
            expect(res.redirect).toHaveBeenCalledWith("/a-custom-path?shop=test.myshopify.com");

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});