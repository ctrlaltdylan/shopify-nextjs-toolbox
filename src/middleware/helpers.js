import crypto from "crypto";

export function generateNonce() {
  return crypto.randomBytes(16).toString("hex");
}
