import { createNextAuthHandlers } from '@stormycms/next';
import { NextRequest, NextResponse } from 'next/server';

const handlers = createNextAuthHandlers();

export async function GET(request: NextRequest): Promise<Response> {
	const action = request.nextUrl.searchParams.get('action');
	const e2eBypass =
		process.env.E2E_ALLOW_COOKIE_BYPASS === 'true' && request.cookies.get('e2e_bypass_auth')?.value === 'true';

	if (action === 'session' && e2eBypass) {
		return NextResponse.json({ id: 'test-user', userName: 'Test' });
	}

	return handlers.GET(request);
}

export const POST = handlers.POST;
