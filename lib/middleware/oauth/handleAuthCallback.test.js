"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _handleAuthCallback = _interopRequireDefault(require("./handleAuthCallback"));

var _exchangeAccessToken = _interopRequireDefault(require("./exchangeAccessToken"));

var _verifyHmac = _interopRequireDefault(require("./verifyHmac"));

var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));

jest.mock("./exchangeAccessToken");
jest.mock("./verifyHmac");

var req = _nodeMocksHttp["default"].createRequest({
  method: "POST",
  url: "/api/auth/callback",
  headers: {},
  query: {
    shop: "test.myshopify.com",
    host: "dylanwashere"
  }
});

var res = {
  redirect: jest.fn(),
  end: jest.fn()
};
describe("Handling the Shopify OAuth callback response", function () {
  var OLD_ENV = process.env;
  beforeEach(function () {
    jest.resetModules();

    _verifyHmac["default"].mockReturnValue(true);

    process.env.HOME_PATH = "/home";
  });
  afterAll(function () {
    process.env = OLD_ENV; // Restore old environment
  });
  test("it fails if validateNonce fails", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _handleAuthCallback["default"])(function (req, res) {}, {
              validateNonce: function () {
                var _validateNonce = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          return _context.abrupt("return", false);

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                function validateNonce() {
                  return _validateNonce.apply(this, arguments);
                }

                return validateNonce;
              }()
            })(req, res);

          case 2:
            expect(res.end).toHaveBeenCalledWith(JSON.stringify({
              message: "Invalid Nonce."
            }));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  test("it passes if validateNonce passes", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _handleAuthCallback["default"])(function (req, res) {}, {
              validateNonce: function () {
                var _validateNonce2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          return _context3.abrupt("return", true);

                        case 1:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                function validateNonce() {
                  return _validateNonce2.apply(this, arguments);
                }

                return validateNonce;
              }()
            })(req, res);

          case 2:
            expect(res.redirect).toHaveBeenCalledWith("/home?shop=test.myshopify.com&host=dylanwashere");

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  test("it redirects to the HOME_PATH by default", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _handleAuthCallback["default"])(function (req, res) {})(req, res);

          case 2:
            expect(res.redirect).toHaveBeenCalledWith("/home?shop=test.myshopify.com&host=dylanwashere");

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  test("it redirects to the provided path if the handler returns a custom path with the shop query param appended automatically", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _handleAuthCallback["default"])(function (req, res) {
              return "https://getverdict.com/a-custom-path";
            })(req, res);

          case 2:
            expect(res.redirect).toHaveBeenCalledWith("https://getverdict.com/a-custom-path?shop=test.myshopify.com&host=dylanwashere");

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  test("it redirects to the provided path if the handler returns a custom path with the shop query param appended automatically", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _handleAuthCallback["default"])(function (req, res) {
              return "https://getverdict.com/a-custom-path?signature=123123";
            })(req, res);

          case 2:
            expect(res.redirect).toHaveBeenCalledWith("https://getverdict.com/a-custom-path?signature=123123?shop=test.myshopify.com&host=dylanwashere");

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
});