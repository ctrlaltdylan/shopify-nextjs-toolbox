import handleAuthStart from "./handleAuthStart";
import httpMocks from "node-mocks-http";

const req = httpMocks.createRequest({
  method: "POST",
  url: "/api/auth",
  headers: {},
  body: {
    query: { shop: "test.myshopify.com" },
    scopes: "read_orders",
  },
});

const res = httpMocks.createResponse();

describe("Handling the Shopify OAuth start", () => {
  test("it returns the redirectTo URL", async () => {
    await handleAuthStart()(req, res);
    expect(res._getJSONData()).toEqual({
      redirectTo: expect.stringContaining("https://test.myshopify.com"),
    });
  });

  test("it results in a 200", async () => {
    await handleAuthStart()(req, res);
    expect(res.statusCode).toEqual(200);
  });

  describe("when saveNonce is passed", () => {
    test("it calls saveNonce with a nonce", async () => {
      const saveNonce = jest.fn();
      await handleAuthStart({ saveNonce })(req, res);
      expect(saveNonce).toHaveBeenCalledWith({
        req,
        shopName: "test.myshopify.com",
        nonce: expect.any(String),
      });
    });
  });
});
