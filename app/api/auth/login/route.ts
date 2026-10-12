import { NextResponse } from 'next/server';
import { createSessionToken, type HgtRole } from '@/lib/session';

const ROLE_PREFIX: Record<HgtRole, string> = {
  cms: 'HGT_CMS',
  mptb_nodal: 'HGT_MPTB_NODAL',
  sports_nodal: 'HGT_SPORTS_NODAL',
  participant: 'HGT_PARTICIPANT',
};

const ROLE_NAMES: Record<HgtRole, string> = {
  cms: 'CMS Admin',
  mptb_nodal: 'MPTB Nodal Officer',
  sports_nodal: 'Sports Nodal Officer',
  participant: 'Participant',
};

function equalSecret(input: string, expected: string): boolean {
  const a = new TextEncoder().encode(input);
  const b = new TextEncoder().encode(expected);
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i++) difference |= a[i] ^ b[i];
  return difference === 0;
}

export async function POST(request: Request) {
  if (request.headers.get('sec-fetch-site') === 'cross-site') {
    return NextResponse.json({ error: 'Please sign in from the HGT portal.' }, { status: 403, headers: { 'Cache-Control': 'no-store' } });
  }

  const secret = process.env.HGT_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    return NextResponse.json({ error: 'Secure login is not configured. Contact the site administrator.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const body = await request.json() as { id?: unknown; password?: unknown; role?: unknown };
    if (typeof body.id !== 'string' || typeof body.password !== 'string' || typeof body.role !== 'string') {
      return NextResponse.json({ error: 'Enter your ID, password and role.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
    }
    if (!Object.prototype.hasOwnProperty.call(ROLE_PREFIX, body.role)) {
      return NextResponse.json({ error: 'Select a valid role.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
    }
    const role = body.role as HgtRole;
    const prefix = ROLE_PREFIX[role];
    const expectedId = process.env[`${prefix}_ID`];
    const expectedPassword = process.env[`${prefix}_PASSWORD`];
    if (!expectedId || !expectedPassword) {
      return NextResponse.json({ error: 'Credentials for this role have not been configured.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
    }
    if (!equalSecret(body.id.trim(), expectedId) || !equalSecret(body.password, expectedPassword)) {
      return NextResponse.json({ error: 'The ID or password is incorrect.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
    }

    const user = { id: expectedId, role, name: ROLE_NAMES[role] };
    const token = await createSessionToken(user, secret);
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    const response = NextResponse.json({ ok: true, user }, { headers: { 'Cache-Control': 'no-store' } });
    response.headers.set('Set-Cookie', `hgt_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${secure}`);
    return response;
  } catch {
    return NextResponse.json({ error: 'Sign-in could not be completed. Please try again.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }
}
