import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Badge, badgeVariants } from '~/components/badge';
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '~/components/breadcrumb';
import { Button, buttonVariants } from '~/components/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/card';
import { Checkbox } from '~/components/checkbox';
import { Input } from '~/components/input';
import { Label } from '~/components/label';
import { Separator } from '~/components/separator';
import { Skeleton } from '~/components/skeleton';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '~/components/table';
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '~/components/avatar';

describe('Badge', () => {
	it('renders a span with the requested variant', () => {
		render(<Badge variant="destructive">Danger</Badge>);
		const badge = screen.getByText('Danger');
		expect(badge.tagName).toBe('SPAN');
		expect(badge).toHaveAttribute('data-variant', 'destructive');
	});

	it('renders into its child when asChild is set', () => {
		render(
			<Badge asChild>
				<a href="/tags">Tag</a>
			</Badge>,
		);
		expect(screen.getByRole('link', { name: 'Tag' })).toHaveAttribute('data-slot', 'badge');
	});

	it('exposes its variants for links', () => {
		expect(badgeVariants({ variant: 'link' })).toContain('underline-offset-4');
	});
});

describe('Button', () => {
	it('renders a button with default variant and size', () => {
		render(<Button>Save</Button>);
		const button = screen.getByRole('button', { name: 'Save' });
		expect(button).toHaveAttribute('data-variant', 'default');
		expect(button).toHaveAttribute('data-size', 'default');
	});

	it('applies variant, size, and custom classes', () => {
		render(
			<Button variant="outline" size="sm" className="custom-btn">
				Save
			</Button>,
		);
		const button = screen.getByRole('button', { name: 'Save' });
		expect(button).toHaveAttribute('data-variant', 'outline');
		expect(button).toHaveAttribute('data-size', 'sm');
		expect(button).toHaveClass('custom-btn');
	});

	it('renders into its child when asChild is set', () => {
		render(
			<Button asChild>
				<a href="/next">Continue</a>
			</Button>,
		);
		expect(screen.getByRole('link', { name: 'Continue' })).toHaveAttribute('data-slot', 'button');
	});

	it('exposes its variants helper', () => {
		expect(buttonVariants({ variant: 'link' })).toContain('underline-offset-4');
	});
});

describe('Input and Label', () => {
	it('associates labels with inputs', async () => {
		render(
			<div>
				<Label htmlFor="email">Email</Label>
				<Input id="email" type="email" placeholder="you@example.com" />
			</div>,
		);
		const input = screen.getByLabelText('Email');
		expect(input).toHaveAttribute('type', 'email');
		await userEvent.type(input, 'a@b.co');
		expect(input).toHaveValue('a@b.co');
	});
});

describe('Checkbox', () => {
	it('toggles between checked states', async () => {
		render(<Checkbox aria-label="Accept terms" />);
		const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
		expect(checkbox).toHaveAttribute('data-state', 'unchecked');
		await userEvent.click(checkbox);
		expect(checkbox).toHaveAttribute('data-state', 'checked');
	});
});

describe('Card', () => {
	it('renders all card slots', () => {
		render(
			<Card size="sm">
				<CardHeader>
					<CardTitle>Title</CardTitle>
					<CardDescription>Description</CardDescription>
					<CardAction>Action</CardAction>
				</CardHeader>
				<CardContent>Content</CardContent>
				<CardFooter>Footer</CardFooter>
			</Card>,
		);
		for (const text of ['Title', 'Description', 'Action', 'Content', 'Footer']) {
			expect(screen.getByText(text)).toBeInTheDocument();
		}
	});
});

describe('Separator and Skeleton', () => {
	it('renders a horizontal separator by default', () => {
		const { container } = render(<Separator />);
		expect(container.querySelector('[data-slot="separator"]')).toHaveAttribute('data-orientation', 'horizontal');
	});

	it('renders a pulsing skeleton', () => {
		const { container } = render(<Skeleton className="h-4" />);
		expect(container.querySelector('[data-slot="skeleton"]')).toHaveClass('animate-pulse', 'h-4');
	});
});

describe('Table', () => {
	it('renders a full table structure', () => {
		render(
			<Table>
				<TableCaption>Monthly totals</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Month</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>January</TableCell>
					</TableRow>
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell>Total</TableCell>
					</TableRow>
				</TableFooter>
			</Table>,
		);
		expect(screen.getByRole('table')).toBeInTheDocument();
		expect(screen.getByText('Monthly totals')).toBeInTheDocument();
		expect(screen.getByText('January')).toBeInTheDocument();
	});
});

describe('Breadcrumb', () => {
	it('renders links, separators, ellipsis, and the current page', () => {
		render(
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbEllipsis />
					</BreadcrumbItem>
					<BreadcrumbSeparator>/</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage>Current</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>,
		);
		expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
		expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page');
	});

	it('renders breadcrumb links into their child when asChild is set', () => {
		render(
			<BreadcrumbLink asChild>
				<button type="button">Go</button>
			</BreadcrumbLink>,
		);
		expect(screen.getByRole('button', { name: 'Go' })).toHaveAttribute('data-slot', 'breadcrumb-link');
	});
});

describe('Avatar', () => {
	it('renders an image with a fallback and sizes', () => {
		const { container } = render(
			<Avatar size="sm">
				<AvatarImage src="/avatar.png" alt="Ada Lovelace" />
				<AvatarFallback>AL</AvatarFallback>
			</Avatar>,
		);
		expect(container.querySelector('[data-slot="avatar"]')).toHaveAttribute('data-size', 'sm');
		expect(screen.getByText('AL')).toBeInTheDocument();
	});

	it('renders a badge, group, and group count', () => {
		const { container } = render(
			<AvatarGroup>
				<Avatar>
					<AvatarImage src="/a.png" alt="One" />
					<AvatarFallback>O</AvatarFallback>
				</Avatar>
				<Avatar>
					<AvatarImage src="/b.png" alt="Two" />
					<AvatarFallback>T</AvatarFallback>
					<AvatarBadge />
				</Avatar>
				<AvatarGroupCount>+3</AvatarGroupCount>
			</AvatarGroup>,
		);
		expect(container.querySelector('[data-slot="avatar-badge"]')).toBeInTheDocument();
		expect(container.querySelector('[data-slot="avatar-group"]')).toBeInTheDocument();
		expect(screen.getByText('+3')).toHaveAttribute('data-slot', 'avatar-group-count');
	});
});
