import { safeHref } from './safe-href';

type SiteInfoProps = {
	organization?: string;
	email?: string;
	phone?: string;
	address?: string;
	/** Map of link label to URL for social/footer links. */
	links?: Record<string, string>;
};

/** Site information (copyright, contact, social links). Composes nicely into RegionFooter. */
export function SiteInfo({ organization, email, phone, address, links }: SiteInfoProps) {
	const entries = Object.entries(links ?? {});
	return (
		<div className="flex w-full flex-col items-center gap-3 border-t border-border py-6 text-sm text-muted-foreground">
			{entries.length > 0 ? (
				<nav>
					<ul className="flex list-none flex-wrap items-center gap-4">
						{entries.map(([label, href]) => (
							<li key={label}>
								<a className="hover:text-foreground" href={safeHref(href)}>
									{label}
								</a>
							</li>
						))}
					</ul>
				</nav>
			) : null}
			{(address !== undefined && address !== '') ||
			(email !== undefined && email !== '') ||
			(phone !== undefined && phone !== '') ? (
				<address className="flex flex-col items-center gap-1 not-italic">
					{address !== undefined && address !== '' ? <span>{address}</span> : null}
					{email !== undefined && email !== '' ? <a href={`mailto:${email}`}>{email}</a> : null}
					{phone !== undefined && phone !== '' ? <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a> : null}
				</address>
			) : null}
			<p>
				© {organization !== undefined && organization !== '' ? `${organization} ` : ''}
				{new Date().getFullYear()}
			</p>
		</div>
	);
}
