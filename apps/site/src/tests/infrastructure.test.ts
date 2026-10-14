import { describe, expect, it } from 'vitest';
import { StormyCMSClient } from '@stormycms/core';
import emptyModule from '../../empty-module';
import nextConfig from '../../next.config';
import { stormyCMSClient } from '../stormy-cms-client';

describe('stormy-cms-client', () => {
	it('exports a configured client instance', () => {
		expect(stormyCMSClient).toBeInstanceOf(StormyCMSClient);
	});
});

describe('next.config', () => {
	it('transpiles the shared components package', () => {
		expect(nextConfig.transpilePackages).toContain('components');
	});

	it('only allows https image sources', () => {
		expect(nextConfig.images?.remotePatterns?.length).toBeGreaterThan(0);
		for (const pattern of nextConfig.images?.remotePatterns ?? []) {
			expect(pattern.protocol).toBe('https');
		}
	});
});

describe('empty-module', () => {
	it('exports an empty stub for aliased-away modules', () => {
		expect(emptyModule).toEqual({});
	});
});
