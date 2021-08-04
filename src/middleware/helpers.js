import crypto from "crypto";

export function createNonce() {
  return crypto.randomBytes(16).toString("base64");
}
