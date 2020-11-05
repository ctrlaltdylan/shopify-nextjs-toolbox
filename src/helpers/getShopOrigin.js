export default function getShopOrigin() {
  const queryOrigin = new URLSearchParams(window.location.search).get("shop");
  if (queryOrigin) {
    localStorage.setItem("shopOrigin", queryOrigin);
    return queryOrigin;
  } else {
    return localStorage.getItem("shopOrigin");
  }
}
