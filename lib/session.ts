export type HgtRole = 'cms' | 'mptb_nodal' | 'sports_nodal' | 'participant';
export type HgtSession = { id: string; role: HgtRole; name: string; exp: number };

function encodeBytes(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4);
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
}

async function signingKey(secret: string, usage: KeyUsage[]): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, usage);
}

export async function createSessionToken(user: Omit<HgtSession, 'exp'>, secret: string): Promise<string> {
  const payload = encodeBytes(new TextEncoder().encode(JSON.stringify({ ...user, exp: Date.now() + 8 * 60 * 60 * 1000 })));
  const signature = await crypto.subtle.sign('HMAC', await signingKey(secret, ['sign']), new TextEncoder().encode(payload));
  return `${payload}.${encodeBytes(new Uint8Array(signature))}`;
}

export async function verifySessionToken(token: string | undefined, secret: string | undefined): Promise<HgtSession | null> {
  if (!token || !secret || secret.length < 32) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
    const valid = await crypto.subtle.verify('HMAC', await signingKey(secret, ['verify']), decodeBytes(parts[1]), new TextEncoder().encode(parts[0]));
    if (!valid) return null;
    const parsed = JSON.parse(new TextDecoder().decode(decodeBytes(parts[0]))) as HgtSession;
    if (!parsed.id || !parsed.name || !parsed.exp || parsed.exp <= Date.now()) return null;
    if (!['cms', 'mptb_nodal', 'sports_nodal', 'participant'].includes(parsed.role)) return null;
    return parsed;
  } catch {
    return null;
  }
}
