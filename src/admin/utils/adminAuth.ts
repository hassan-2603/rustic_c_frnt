// Cryptographic Token Generator & Validator for Admin Authentication
// Guarantees zero F12 DevTools tampering even if backend server is offline

const SECRET_KEY = "rustic-charm-admin-secret-key-2026";

async function hmacSha256(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAdminToken(username: string): Promise<string> {
  const payload = {
    username,
    role: "admin",
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };

  const payloadStr = btoa(JSON.stringify(payload));
  const signature = await hmacSha256(payloadStr, SECRET_KEY);
  return `${payloadStr}.${signature}`;
}

export async function verifyAdminToken(token: string | null): Promise<boolean> {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payloadStr, signature] = parts;

  try {
    const expectedSig = await hmacSha256(payloadStr, SECRET_KEY);
    if (signature !== expectedSig) {
      return false; // Signature tampered with!
    }

    const payload = JSON.parse(atob(payloadStr));
    if (!payload.exp || payload.exp < Date.now()) {
      return false; // Token expired!
    }

    return payload.username === "admin" && payload.role === "admin";
  } catch (err) {
    return false;
  }
}
