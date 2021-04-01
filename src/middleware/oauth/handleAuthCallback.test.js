import handleAuthCallback from './handleAuthCallback';
import exchangeAccessToken from './exchangeAccessToken';
import verifyHmac from './verifyHmac';

import httpMocks from "node-mocks-http";
jest.mock('./exchangeAccessToken');
jest.mock('./verifyHmac');

const req = httpMocks.createRequest({
  method: "POST",
  url: "/api/auth/callback",
  headers: {},
  query: {
    shop: "test.myshopify.com",
    host: 'dylanwashere'
  },
});

const res = {
  redirect: jest.fn(),
};

describe('Handling the Shopify OAuth callback response', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    verifyHmac.mockReturnValue(true);
    process.env.HOME_PATH='/home'
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('it redirects to the HOME_PATH by default', async () => {
    await handleAuthCallback((req, res) => {})(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/home?shop=test.myshopify.com&host=dylanwashere')
  });

  test('it redirects to the provided path if the handler returns a custom path with the shop query param appended automatically', async () => {
    await handleAuthCallback((req, res) => {
      return "https://getverdict.com/a-custom-path";
    })(req, res);

    expect(res.redirect).toHaveBeenCalledWith(
      "https://getverdict.com/a-custom-path?shop=test.myshopify.com&host=dylanwashere"
    );
  })

  test("it redirects to the provided path if the handler returns a custom path with the shop query param appended automatically", async () => {
    await handleAuthCallback((req, res) => {
      return "https://getverdict.com/a-custom-path?signature=123123";
    })(req, res);

    expect(res.redirect).toHaveBeenCalledWith(
      "https://getverdict.com/a-custom-path?shop=test.myshopify.com&host=dylanwashere&signature=123123"
    );
  });
});
