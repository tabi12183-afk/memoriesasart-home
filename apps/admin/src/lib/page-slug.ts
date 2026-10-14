export function normalizePageSlug(value: string): string {
	return value
		.trim()
		.replace(/^\/+|\/+$/g, '')
		.toLowerCase();
}

export function pageNameToSlug(value: string): string {
	return normalizePageSlug(value)
		.replace(/[^a-z0-9/]+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
}
