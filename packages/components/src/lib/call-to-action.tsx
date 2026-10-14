import { buttonVariants } from './button';
import { safeHref } from './safe-href';

export type CallToActionPriority = 'primary' | 'secondary';

/**
 * Editors describe the use case; the design system decides how it looks.
 * Adjust this mapping to restyle every call to action consistently.
 */
const priorityVariants: Record<CallToActionPriority, 'default' | 'outline'> = {
	primary: 'default',
	secondary: 'outline',
};

type CallToActionProps = {
	label?: string;
	href?: string;
	/**
	 * The action's importance on the page: "primary" for the main action a
	 * visitor should take, "secondary" for supporting actions.
	 */
	priority?: CallToActionPriority;
};

/** A link styled like a button. Content editors can express navigation, but not arbitrary behavior. */
export function CallToAction({ label, href, priority = 'primary' }: CallToActionProps) {
	return (
		<a className={buttonVariants({ variant: priorityVariants[priority], size: 'lg' })} href={safeHref(href)}>
			{label ?? 'Learn More'}
		</a>
	);
}
