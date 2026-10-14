import { GalleryVerticalEnd } from 'lucide-react';
import { LoginForm } from '~/components/login-form';
import { notNullish } from '~/lib/utils';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
	const error = (await searchParams).error;

	const errorMap = {
		user_search_failed: 'User does not exist. Please sign up first.',
		clientid_not_found:
			"We couldn't sign you in due to a configuration issue. Please try again later or contact support.",
		internal_api_unauthorized:
			"We couldn't sign you in due to a configuration issue. Please try again later or contact support.",
		internal_api_key_missing:
			"We couldn't sign you in due to a configuration issue. Please try again later or contact support.",
		auth_timeout: 'Signing in took too long. Please try again in a moment.',
		invalid_redirect: "We couldn't complete sign-in. Please try again or contact support.",
		site_validation_failed: "We couldn't sign you in right now. Please try again later or contact support.",
		site_validation_invalid_response: "We couldn't sign you in right now. Please try again in a moment.",
		validation_failed: "We couldn't sign you in right now. Please try again later or contact support.",
		provider_signin_failed: "We couldn't start the sign-in process. Please try again.",
		user_creation_failed: 'We could not create your account. Please try again or contact support.',
		user_not_found: 'No account found for this login. Please sign up first.',
		invalid_state: 'Your sign-in session expired or is invalid. Please try again.',
		missing_parameters: 'Something went wrong during sign-in. Please try again.',
	} as const;

	type ErrorKey = keyof typeof errorMap;

	function getErrorMessage(error: string | undefined) {
		if (notNullish(error) && error in errorMap) {
			return errorMap[error as ErrorKey];
		}
		return error;
	}

	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<a href="#" className="flex items-center gap-2 self-center font-medium">
					<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
						<GalleryVerticalEnd className="size-4" />
					</div>
					Stormy CMS
				</a>
				<LoginForm error={getErrorMessage(error)} />
			</div>
		</div>
	);
}
