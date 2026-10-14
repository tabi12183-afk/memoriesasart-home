import { FaBitbucket, FaFacebookF, FaGithub, FaGitlab, FaGoogle, FaMicrosoft } from 'react-icons/fa';

import type { OAuthProvider } from '~/lib/oauth-providers';

const PROVIDER_ICONS = {
	github: FaGithub,
	google: FaGoogle,
	gitlab: FaGitlab,
	bitbucket: FaBitbucket,
	facebook: FaFacebookF,
	microsoft: FaMicrosoft,
} satisfies Record<OAuthProvider, React.ComponentType<{ className?: string }>>;

const PROVIDER_ICON_COLORS: Record<OAuthProvider, string> = {
	github: 'text-foreground',
	google: 'text-[#4285f4]',
	gitlab: 'text-[#fc6d26]',
	bitbucket: 'text-[#0052cc]',
	facebook: 'text-[#1877f2]',
	microsoft: 'text-[#737373]',
};

export function ProviderIcon({ provider }: { provider: OAuthProvider }) {
	const Icon = PROVIDER_ICONS[provider];

	return (
		<span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted" aria-hidden="true">
			<Icon className={`size-4 ${PROVIDER_ICON_COLORS[provider]}`} />
		</span>
	);
}
