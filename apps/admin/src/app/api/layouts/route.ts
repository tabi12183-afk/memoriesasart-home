import { stormyCMSClient } from '@/stormy-cms-client';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { mapComponentDataToInput, type CMSComponentData } from '@stormycms/core';
import { nullish } from '~/lib/utils';

async function getJWT(): Promise<string | null> {
	const cookieStore = await cookies();
	return stormyCMSClient.getJWTToken(cookieStore.toString());
}

/**
 * POST /api/layouts - Create a new layout
 */
export async function POST(request: Request) {
	const jwt = await getJWT();
	if (nullish(jwt)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const body = await request.json();
		const { name, components } = body;

		if (typeof name !== 'string' || name.trim() === '') {
			return NextResponse.json({ error: 'name is required' }, { status: 400 });
		}

		const now = new Date().toISOString();
		const layout = await stormyCMSClient.createLayout(jwt, {
			name,
			components: (components as CMSComponentData[]).map(mapComponentDataToInput),
			createdAt: now,
			updatedAt: now,
		});

		return NextResponse.json({ layout }, { status: 201 });
	} catch (error) {
		console.error('Create layout error:', error);
		return NextResponse.json({ error: 'Failed to create layout' }, { status: 500 });
	}
}
