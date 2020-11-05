
export default async (shop, accessTokenQuery) => {
    const data = await fetch(
      `https://${shop}/admin/oauth/access_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(accessTokenQuery).toString(),
        },
        body: accessTokenQuery,
      }
    );
    return await data.json();
}
