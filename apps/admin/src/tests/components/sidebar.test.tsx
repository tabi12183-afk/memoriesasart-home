import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { isMobileState } = vi.hoisted(() => ({ isMobileState: { value: false } }));

vi.mock('~/hooks/use-mobile', () => ({
	useIsMobile: () => isMobileState.value,
}));

import { TooltipProvider } from '~/components/tooltip';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
	useSidebar,
} from '~/components/sidebar';

function StateProbe() {
	const { state, open, isMobile, openMobile, setOpen, setOpenMobile } = useSidebar();
	return (
		<div>
			<output data-testid="state">{state}</output>
			<output data-testid="open">{String(open)}</output>
			<output data-testid="mobile">{String(isMobile)}</output>
			<output data-testid="open-mobile">{String(openMobile)}</output>
			<button onClick={() => setOpen(false)}>close</button>
			<button onClick={() => setOpenMobile(true)}>open-mobile</button>
		</div>
	);
}

beforeEach(() => {
	isMobileState.value = false;
});

describe('SidebarProvider', () => {
	it('throws when useSidebar is used outside the provider', () => {
		vi.spyOn(console, 'error').mockImplementation(() => {});
		expect(() => render(<StateProbe />)).toThrow('useSidebar must be used within a SidebarProvider.');
		vi.restoreAllMocks();
	});

	it('starts expanded and persists collapse in a cookie', async () => {
		render(
			<SidebarProvider>
				<StateProbe />
			</SidebarProvider>,
		);
		expect(screen.getByTestId('state')).toHaveTextContent('expanded');
		await userEvent.click(screen.getByRole('button', { name: 'close' }));
		expect(screen.getByTestId('state')).toHaveTextContent('collapsed');
		expect(document.cookie).toContain('sidebar_state=false');
	});

	it('toggles with the keyboard shortcut', () => {
		render(
			<SidebarProvider defaultOpen>
				<StateProbe />
			</SidebarProvider>,
		);
		fireEvent.keyDown(window, { key: 'b', ctrlKey: true });
		expect(screen.getByTestId('open')).toHaveTextContent('false');
		fireEvent.keyDown(window, { key: 'b', metaKey: true });
		expect(screen.getByTestId('open')).toHaveTextContent('true');
		fireEvent.keyDown(window, { key: 'b' });
		expect(screen.getByTestId('open')).toHaveTextContent('true');
	});

	it('notifies a controlled parent instead of mutating internal state', async () => {
		const onOpenChange = vi.fn();
		render(
			<SidebarProvider open onOpenChange={onOpenChange}>
				<StateProbe />
				<SidebarTrigger />
			</SidebarProvider>,
		);
		await userEvent.click(screen.getByRole('button', { name: 'Toggle Sidebar' }));
		expect(onOpenChange).toHaveBeenCalledWith(false);
		expect(screen.getByTestId('open')).toHaveTextContent('true');
	});

	it('toggles the mobile sheet instead of the desktop sidebar on mobile', async () => {
		isMobileState.value = true;
		render(
			<SidebarProvider>
				<StateProbe />
				<SidebarTrigger />
			</SidebarProvider>,
		);
		await userEvent.click(screen.getByRole('button', { name: 'Toggle Sidebar' }));
		expect(screen.getByTestId('open-mobile')).toHaveTextContent('true');
		expect(screen.getByTestId('open')).toHaveTextContent('true');
	});
});

describe('Sidebar', () => {
	it('renders a static sidebar when collapsible is none', () => {
		render(
			<SidebarProvider>
				<Sidebar collapsible="none">static content</Sidebar>
			</SidebarProvider>,
		);
		expect(screen.getByText('static content')).toBeInTheDocument();
	});

	it('renders the desktop chrome with variant-specific classes', () => {
		const { container } = render(
			<SidebarProvider defaultOpen={false}>
				<Sidebar variant="floating" collapsible="icon">
					desktop content
				</Sidebar>
			</SidebarProvider>,
		);
		const sidebar = container.querySelector('[data-slot="sidebar"]');
		expect(sidebar).toHaveAttribute('data-state', 'collapsed');
		expect(sidebar).toHaveAttribute('data-collapsible', 'icon');
		expect(sidebar).toHaveAttribute('data-variant', 'floating');
	});

	it('renders the default variant chrome when expanded', () => {
		const { container } = render(
			<SidebarProvider>
				<Sidebar>desktop content</Sidebar>
			</SidebarProvider>,
		);
		const sidebar = container.querySelector('[data-slot="sidebar"]');
		expect(sidebar).toHaveAttribute('data-state', 'expanded');
		expect(sidebar).toHaveAttribute('data-collapsible', '');
	});

	it('renders inside a sheet on mobile once opened', async () => {
		isMobileState.value = true;
		render(
			<SidebarProvider>
				<Sidebar>mobile content</Sidebar>
				<SidebarTrigger />
			</SidebarProvider>,
		);
		expect(screen.queryByText('mobile content')).not.toBeInTheDocument();
		await userEvent.click(screen.getByRole('button', { name: 'Toggle Sidebar' }));
		expect(screen.getByText('mobile content')).toBeInTheDocument();
		expect(screen.getByText('Displays the mobile sidebar.')).toBeInTheDocument();
	});
});

describe('sidebar building blocks', () => {
	it('renders structural pieces and forwards clicks', async () => {
		const onTriggerClick = vi.fn();
		render(
			<SidebarProvider>
				<Sidebar>
					<SidebarHeader>header</SidebarHeader>
					<SidebarSeparator />
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>Group label</SidebarGroupLabel>
							<SidebarGroupAction>group action</SidebarGroupAction>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton isActive>Plain button</SidebarMenuButton>
										<SidebarMenuAction showOnHover>menu action</SidebarMenuAction>
										<SidebarMenuBadge>3</SidebarMenuBadge>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuSkeleton showIcon />
										<SidebarMenuSkeleton />
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuSub>
											<SidebarMenuSubItem>
												<SidebarMenuSubButton href="/sub" size="sm">
													Sub link
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										</SidebarMenuSub>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
					<SidebarFooter>footer</SidebarFooter>
					<SidebarRail />
				</Sidebar>
				<SidebarInset>
					<SidebarInput placeholder="Search" />
					<SidebarTrigger onClick={onTriggerClick} />
				</SidebarInset>
			</SidebarProvider>,
		);

		expect(screen.getByText('Group label')).toBeInTheDocument();
		expect(screen.getByText('Plain button')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Sub link' })).toHaveAttribute('href', '/sub');
		expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();

		const trigger = document.querySelector('[data-slot="sidebar-trigger"]') as HTMLElement;
		await userEvent.click(trigger);
		expect(onTriggerClick).toHaveBeenCalled();

		await userEvent.click(screen.getByTitle('Toggle Sidebar'));
	});

	it('renders asChild variants into their children', () => {
		render(
			<SidebarProvider>
				<SidebarGroupLabel asChild>
					<h2>Custom label</h2>
				</SidebarGroupLabel>
				<SidebarGroupAction asChild>
					<a href="/action">Custom action</a>
				</SidebarGroupAction>
				<SidebarMenuButton asChild>
					<a href="/button">Custom button</a>
				</SidebarMenuButton>
				<SidebarMenuAction asChild>
					<a href="/menu-action">Custom menu action</a>
				</SidebarMenuAction>
				<SidebarMenuSubButton asChild>
					<button type="button">Custom sub</button>
				</SidebarMenuSubButton>
			</SidebarProvider>,
		);
		expect(screen.getByRole('heading', { name: 'Custom label' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Custom action' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Custom button' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Custom sub' })).toBeInTheDocument();
	});

	it('wraps menu buttons in tooltips when requested', () => {
		render(
			<TooltipProvider>
				<SidebarProvider defaultOpen={false}>
					<SidebarMenuButton tooltip="String tooltip">With string</SidebarMenuButton>
					<SidebarMenuButton tooltip={{ children: 'Object tooltip' }}>With object</SidebarMenuButton>
				</SidebarProvider>
			</TooltipProvider>,
		);
		expect(screen.getByText('With string')).toBeInTheDocument();
		expect(screen.getByText('With object')).toBeInTheDocument();
	});
});
