import { cookies } from 'next/headers';
import { StormyCMSClient } from '@stormycms/core';
import { StormyCMSClientMock } from './stormy-cms-client.mock';
import { nullish } from './utils';

/**
 * Helper type to strip the leading jwt param from a method signature.
 */
type StripJwt<T> = T extends (jwt: string, ...args: infer A) => infer R ? (...args: A) => R : T;

/**
 * Methods on StormyCMSClient that take jwt as their first parameter.
 * This is the single source of truth for both the type and runtime proxy.
 */
const JWT_METHODS = [
	'createPage',
	'updatePage',
	'deletePage',
	'createLayout',
	'updateLayout',
	'deleteLayout',
	'updateUser',
	'getMediaItems',
	'getMedia',
	'createMedia',
	'updateMedia',
	'deleteMedia',
] as const satisfies readonly (keyof StormyCMSClient)[];

type JWTMethodName = (typeof JWT_METHODS)[number];

const JWT_METHOD_SET = new Set<string>(JWT_METHODS);

/**
 * Client type with JWT auto-injected (jwt param removed from methods).
 * Only includes methods that had (jwt: string, ...args) signature.
 */
type JWTInjectedClient = {
	[K in JWTMethodName]: StripJwt<StormyCMSClient[K]>;
};

/**
 * Create a request-scoped StormyCMS client with auto-minted JWT.
 * Use this in server components and route handlers.
 */
export async function createStormyCMSClient(): Promise<JWTInjectedClient> {
	const cookieStore = await cookies();
	const bypass =
		process.env.E2E_BYPASS_AUTH === 'true' ||
		(process.env.E2E_ALLOW_COOKIE_BYPASS === 'true' && cookieStore.get('e2e_bypass_auth')?.value === 'true');

	if (bypass) {
		return new StormyCMSClientMock() as unknown as JWTInjectedClient;
	}

	const cookieHeader = cookieStore.toString();

	const client = new StormyCMSClient();

	// Mint JWT from session cookie
	const jwt = await client.getJWTToken(cookieHeader);
	if (nullish(jwt)) {
		throw new Error('Failed to mint JWT - no valid session');
	}

	// Create a proxy that automatically injects jwt as first argument
	// Only wraps methods that have (jwt: string, ...) signature
	return new Proxy(client, {
		get(target, prop) {
			const value = target[prop as keyof StormyCMSClient];
			if (typeof value !== 'function') {
				return value;
			}
			// Only wrap methods that expect jwt as their first parameter
			if (!JWT_METHOD_SET.has(prop as string)) {
				return value;
			}
			return async (...args: unknown[]) => {
				// Prepend jwt to args (methods expect jwt as first param)
				return (value as (...args: unknown[]) => unknown).apply(target, [jwt, ...args]);
			};
		},
	}) as unknown as JWTInjectedClient;
}
