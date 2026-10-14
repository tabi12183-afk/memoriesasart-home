import Link from 'next/link';
import { cn, notNullish } from '~/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/card';
import { Field, FieldDescription, FieldGroup } from '~/components/field';
import { OAUTH_PROVIDER_GROUPS } from '~/lib/oauth-providers';
import LoginButton from './login-button';

export function LoginForm({
	className,
	error,
	...props
}: React.ComponentProps<'div'> & { error?: string | string[] | undefined }) {
	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className="shadow-lg shadow-black/5">
				<CardHeader className="gap-1 text-center">
					<CardTitle className="text-2xl">Welcome back</CardTitle>
					<CardDescription>Choose how you&apos;d like to sign in</CardDescription>
					{notNullish(error) ? (
						<p className="mt-3 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
							{error}
						</p>
					) : null}
				</CardHeader>
				<CardContent>
					<form>
						<FieldGroup className="gap-6">
							<div className="space-y-5">
								{OAUTH_PROVIDER_GROUPS.map((group) => (
									<section key={group.label} aria-labelledby={`login-${group.label.toLowerCase().replace(' ', '-')}`}>
										<div className="mb-2 flex items-center gap-3">
											<h2
												id={`login-${group.label.toLowerCase().replace(' ', '-')}`}
												className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
											>
												{group.label}
											</h2>
											<div className="flex-1 border-t" />
										</div>
										<Field className="gap-2">
											{group.providers.map((provider) => (
												<LoginButton key={provider} provider={provider} />
											))}
										</Field>
									</section>
								))}
							</div>
							<Field>
								<FieldDescription className="text-center">
									Don&apos;t have an account? <Link href="/signup">Sign up</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				<a href="https://account.stormycms.com/terms">Terms of Service</a> |{' '}
				<a href="https://account.stormycms.com/privacy">Privacy Policy</a>
			</FieldDescription>
		</div>
	);
}
