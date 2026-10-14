import { stormyCMSClient } from '@/stormy-cms-client';
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { mapComponentDataToInput, type CMSComponentData } from '@stormycms/core';
import { nullish } from '~/lib/utils';

async function getJWT(): Promise<string | null> {
	const cookieStore = await cookies();
	return stormyCMSClient.getJWTToken(cookieStore.toString());
}

/**
 * PUT /api/pages/[id] - Replace a page (full update)
 */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const jwt = await getJWT();
	if (nullish(jwt)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { id } = await params;

	try {
		const body = await request.json();
		const { slug, metadata, components, layoutId } = body;

		if (typeof slug !== 'string' || nullish(metadata) || nullish(layoutId)) {
			return NextResponse.json({ error: 'slug, metadata and layoutId are required' }, { status: 400 });
		}

		const page = await stormyCMSClient.updatePage(jwt, {
			id,
			slug,
			metadata,
			components: (components as CMSComponentData[]).map(mapComponentDataToInput),
			layoutId,
			updatedAt: new Date().toISOString(),
		});

		return NextResponse.json({ page });
	} catch (error) {
		console.error('Update page error:', error);
		return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
	}
}

/**
 * PATCH /api/pages/[id] - Partial update
 */
export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
	return PUT(request, context);
}

/**
 * DELETE /api/pages/[id] - Delete a page
 */
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const jwt = await getJWT();
	if (nullish(jwt)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { id } = await params;

	try {
		const result = await stormyCMSClient.deletePage(jwt, { id });
		return NextResponse.json({ deleted: result });
	} catch (error) {
		console.error('Delete page error:', error);
		return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
	}
}
