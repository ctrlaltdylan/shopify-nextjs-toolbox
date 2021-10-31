"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _handleAuthStart = _interopRequireDefault(require("./handleAuthStart"));

var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));

var req = _nodeMocksHttp["default"].createRequest({
  method: "POST",
  url: "/api/auth",
  headers: {},
  body: {
    query: {
      shop: "test.myshopify.com"
    },
    scopes: "read_orders"
  }
});

var res = _nodeMocksHttp["default"].createResponse();

describe("Handling the Shopify OAuth start", function () {
  test("it returns the redirectTo URL", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _handleAuthStart["default"])()(req, res);

          case 2:
            expect(res._getJSONData()).toEqual({
              redirectTo: expect.stringContaining("https://test.myshopify.com")
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test("it results in a 200", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _handleAuthStart["default"])()(req, res);

          case 2:
            expect(res.statusCode).toEqual(200);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  describe("when saveNonce is passed", function () {
    test("it calls saveNonce with a nonce", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var saveNonce;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              saveNonce = jest.fn();
              _context3.next = 3;
              return (0, _handleAuthStart["default"])({
                saveNonce: saveNonce
              })(req, res);

            case 3:
              expect(saveNonce).toHaveBeenCalledWith({
                req: req,
                shopName: "test.myshopify.com",
                nonce: expect.any(String)
              });

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
});