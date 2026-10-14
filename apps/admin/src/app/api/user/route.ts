import { stormyCMSClient } from '@/stormy-cms-client';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { nullish } from '~/lib/utils';

async function getJWT(): Promise<string | null> {
	const cookieStore = await cookies();
	return stormyCMSClient.getJWTToken(cookieStore.toString());
}

/**
 * PATCH /api/user - Update user profile
 */
export async function PATCH(request: Request) {
	const jwt = await getJWT();
	if (nullish(jwt)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const body = await request.json();
		const { id, username, displayName, email } = body;

		if (nullish(id)) {
			return NextResponse.json({ error: 'id is required' }, { status: 400 });
		}

		const user = await stormyCMSClient.updateUser(jwt, {
			id,
			username,
			displayName,
			email,
		});

		return NextResponse.json({ user });
	} catch (error) {
		console.error('Update user error:', error);
		return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
	}
}
