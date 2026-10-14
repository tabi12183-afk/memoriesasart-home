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
 * POST /api/pages - Create a new page
 */
export async function POST(request: Request) {
	const jwt = await getJWT();
	if (nullish(jwt)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const body = await request.json();
		const { slug, metadata, components, layoutId } = body;

		if (typeof slug !== 'string' || nullish(metadata) || nullish(layoutId)) {
			return NextResponse.json({ error: 'slug, metadata and layoutId are required' }, { status: 400 });
		}

		const now = new Date().toISOString();
		const page = await stormyCMSClient.createPage(jwt, {
			slug,
			metadata,
			components: (components as CMSComponentData[]).map(mapComponentDataToInput),
			layoutId,
			createdAt: now,
			updatedAt: now,
		});

		return NextResponse.json({ page }, { status: 201 });
	} catch (error) {
		console.error('Create page error:', error);
		return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
	}
}
