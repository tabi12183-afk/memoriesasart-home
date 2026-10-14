export const OAUTH_PROVIDERS = ['github', 'google', 'gitlab', 'bitbucket', 'facebook', 'microsoft'] as const;

export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number];

export const OAUTH_PROVIDER_LABELS: Record<OAuthProvider, string> = {
	github: 'GitHub',
	google: 'Google',
	gitlab: 'GitLab',
	bitbucket: 'Bitbucket',
	facebook: 'Facebook',
	microsoft: 'Microsoft',
};

export const OAUTH_PROVIDER_GROUPS = [
	{
		label: 'Accounts',
		providers: ['google', 'microsoft', 'facebook'],
	},
	{
		label: 'Git providers',
		providers: ['github', 'gitlab', 'bitbucket'],
	},
] as const satisfies ReadonlyArray<{
	label: string;
	providers: readonly OAuthProvider[];
}>;
