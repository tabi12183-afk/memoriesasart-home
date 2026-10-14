import { cookies } from 'next/headers';
import { StormyCMSClient } from '@stormycms/core';
import { StormyCMSClientMock } from './src/lib/stormy-cms-client.mock';

const realClient = new StormyCMSClient();
const mockClient = new StormyCMSClientMock();

async function isBypassEnabled(): Promise<boolean> {
	if (process.env.E2E_BYPASS_AUTH === 'true') return true;
	try {
		const cookieStore = await cookies();
		return cookieStore.get('e2e_bypass_auth')?.value === 'true';
	} catch {
		return false;
	}
}

export const stormyCMSClient = new Proxy(realClient, {
	get(target, prop) {
		const targetValue = Reflect.get(target, prop) as unknown;
		if (typeof targetValue !== 'function') {
			return targetValue;
		}
		return async (...args: unknown[]) => {
			const bypass = await isBypassEnabled();
			const client = bypass ? mockClient : realClient;
			const value = (client as unknown as Record<string, unknown>)[prop as string];
			if (typeof value === 'function') {
				return value.apply(client, args);
			}
			return value;
		};
	},
}) as StormyCMSClient;
