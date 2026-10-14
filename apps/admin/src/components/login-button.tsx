'use client';

import { Button } from '~/components/button';
import { OAUTH_PROVIDER_LABELS, type OAuthProvider } from '~/lib/oauth-providers';
import { ProviderIcon } from './provider-icon';

export default function LoginButton({ provider }: { provider: OAuthProvider }) {
	return (
		<Button
			variant="outline"
			type="button"
			className="h-11 w-full justify-start gap-3 px-3 shadow-xs"
			onClick={() => {
				window.location.href = `/api/auth/stormy?action=signin&provider=${provider}`;
			}}
			data-testid={`${provider}-login-button`}
		>
			<ProviderIcon provider={provider} />
			<span>Login with {OAUTH_PROVIDER_LABELS[provider]}</span>
		</Button>
	);
}
