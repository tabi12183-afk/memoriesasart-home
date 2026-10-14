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
 * PUT /api/layouts/[id] - Replace a layout (full update)
 */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const jwt = await getJWT();
	if (nullish(jwt)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { id } = await params;

	try {
		const body = await request.json();
		const { name, components, parentLayoutId } = body;

		if (typeof name !== 'string' || name.trim() === '') {
			return NextResponse.json({ error: 'name is required' }, { status: 400 });
		}

		const layout = await stormyCMSClient.updateLayout(jwt, {
			id,
			name,
			components: (components as CMSComponentData[]).map(mapComponentDataToInput),
			parentLayoutId: parentLayoutId ?? null,
			updatedAt: new Date().toISOString(),
		});

		return NextResponse.json({ layout });
	} catch (error) {
		console.error('Update layout error:', error);
		return NextResponse.json({ error: 'Failed to update layout' }, { status: 500 });
	}
}

/**
 * PATCH /api/layouts/[id] - Partial update
 */
export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
	return PUT(request, context);
}

/**
 * DELETE /api/layouts/[id] - Delete a layout
 */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const jwt = await getJWT();
	if (nullish(jwt)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { id } = await params;

	try {
		const result = await stormyCMSClient.deleteLayout(jwt, { id });
		return NextResponse.json({ deleted: result });
	} catch (error) {
		console.error('Delete layout error:', error);
		return NextResponse.json({ error: 'Failed to delete layout' }, { status: 500 });
	}
}
