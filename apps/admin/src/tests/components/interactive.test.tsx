import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/avatar';
import { EditorSelectionProvider, useEditorSelection } from '~/components/editor-selection';
import { SelectionBar } from '~/components/selection-bar';
import { Toaster } from '~/components/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants } from '~/components/tabs';
import { Toggle } from '~/components/toggle';
import { ToggleGroup, ToggleGroupItem } from '~/components/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/tooltip';

describe('Tooltip', () => {
	it('shows content for an open tooltip', () => {
		render(
			<TooltipProvider>
				<Tooltip open>
					<TooltipTrigger>Hover me</TooltipTrigger>
					<TooltipContent>Helpful hint</TooltipContent>
				</Tooltip>
			</TooltipProvider>,
		);
		expect(screen.getAllByText('Helpful hint').length).toBeGreaterThan(0);
	});
});

describe('Toggle', () => {
	it('toggles pressed state on click', async () => {
		render(<Toggle aria-label="Bold" />);
		const toggle = screen.getByRole('button', { name: 'Bold' });
		expect(toggle).toHaveAttribute('data-state', 'off');
		await userEvent.click(toggle);
		expect(toggle).toHaveAttribute('data-state', 'on');
	});
});

describe('ToggleGroup', () => {
	it('propagates variant and size from the group context', async () => {
		render(
			<ToggleGroup type="single" variant="outline" size="sm" spacing={2} orientation="vertical">
				<ToggleGroupItem value="a">A</ToggleGroupItem>
			</ToggleGroup>,
		);
		const item = screen.getByRole('radio', { name: 'A' });
		expect(item).toHaveAttribute('data-variant', 'outline');
		expect(item).toHaveAttribute('data-size', 'sm');
		await userEvent.click(item);
		expect(item).toHaveAttribute('data-state', 'on');
	});

	it('falls back to item variant when the group sets none', () => {
		render(
			<ToggleGroup type="multiple">
				<ToggleGroupItem value="b" variant="outline">
					B
				</ToggleGroupItem>
			</ToggleGroup>,
		);
		expect(screen.getByRole('button', { name: 'B' })).toHaveAttribute('data-variant', 'outline');
	});
});

describe('Tabs', () => {
	it('switches panels when a tab is clicked', async () => {
		render(
			<Tabs defaultValue="one">
				<TabsList variant="line">
					<TabsTrigger value="one">One</TabsTrigger>
					<TabsTrigger value="two">Two</TabsTrigger>
				</TabsList>
				<TabsContent value="one">First panel</TabsContent>
				<TabsContent value="two">Second panel</TabsContent>
			</Tabs>,
		);
		expect(screen.getByText('First panel')).toBeInTheDocument();
		await userEvent.click(screen.getByRole('tab', { name: 'Two' }));
		expect(screen.getByText('Second panel')).toBeInTheDocument();
	});

	it('exposes list variants', () => {
		expect(tabsListVariants({ variant: 'default' })).toContain('bg-muted');
	});
});

describe('Avatar', () => {
	it('shows the fallback while the image has not loaded', () => {
		render(
			<Avatar size="sm">
				<AvatarImage src="/nope.png" alt="user" />
				<AvatarFallback>AB</AvatarFallback>
			</Avatar>,
		);
		expect(screen.getByText('AB')).toBeInTheDocument();
	});
});

describe('Toaster', () => {
	it('renders the themed sonner toaster', async () => {
		render(<Toaster />);
		expect(await screen.findByLabelText(/Notifications/)).toBeInTheDocument();
	});
});

describe('SelectionBar', () => {
	it('pluralizes the selection count and hides Clear All for one item', () => {
		const onChoose = vi.fn();
		render(<SelectionBar count={1} onChoose={onChoose} onClear={vi.fn()} />);
		expect(screen.getByText('1 item selected')).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Clear All' })).not.toBeInTheDocument();
	});

	it('offers Clear All for multiple items and invokes callbacks', async () => {
		const onChoose = vi.fn();
		const onClear = vi.fn();
		render(<SelectionBar count={3} onChoose={onChoose} onClear={onClear} />);
		expect(screen.getByText('3 items selected')).toBeInTheDocument();
		await userEvent.click(screen.getByRole('button', { name: 'Clear All' }));
		await userEvent.click(screen.getByRole('button', { name: 'Choose Selected' }));
		expect(onClear).toHaveBeenCalled();
		expect(onChoose).toHaveBeenCalled();
	});

	it('disables choosing when requested', () => {
		render(<SelectionBar count={2} onChoose={vi.fn()} disabled />);
		expect(screen.getByRole('button', { name: 'Choose Selected' })).toBeDisabled();
	});
});

function SelectionProbe() {
	const { activeId, setActiveId, hoveredId, setHoveredId } = useEditorSelection();
	return (
		<div>
			<output data-testid="active">{String(activeId)}</output>
			<output data-testid="hovered">{String(hoveredId)}</output>
			<button onClick={() => setActiveId('component-1')}>select</button>
			<button onClick={() => setHoveredId('component-2')}>hover</button>
		</div>
	);
}

describe('EditorSelectionProvider', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it('tracks active and hovered components', async () => {
		render(
			<EditorSelectionProvider>
				<SelectionProbe />
			</EditorSelectionProvider>,
		);
		await userEvent.click(screen.getByRole('button', { name: 'select' }));
		await userEvent.click(screen.getByRole('button', { name: 'hover' }));
		expect(screen.getByTestId('active')).toHaveTextContent('component-1');
		expect(screen.getByTestId('hovered')).toHaveTextContent('component-2');
	});

	it('clears the selection on Escape', async () => {
		render(
			<EditorSelectionProvider>
				<SelectionProbe />
			</EditorSelectionProvider>,
		);
		await userEvent.click(screen.getByRole('button', { name: 'select' }));
		await userEvent.keyboard('{Escape}');
		expect(screen.getByTestId('active')).toHaveTextContent('null');
	});

	it('ignores other keys and Escape inside dialogs', async () => {
		render(
			<EditorSelectionProvider>
				<div role="dialog">
					<SelectionProbe />
				</div>
			</EditorSelectionProvider>,
		);
		await userEvent.click(screen.getByRole('button', { name: 'select' }));
		await userEvent.keyboard('a');
		screen.getByRole('button', { name: 'select' }).focus();
		await userEvent.keyboard('{Escape}');
		expect(screen.getByTestId('active')).toHaveTextContent('component-1');
	});

	it('throws when used outside the provider', () => {
		vi.spyOn(console, 'error').mockImplementation(() => {});
		expect(() => render(<SelectionProbe />)).toThrow('Editable components must be inside EditorSelectionProvider.');
	});
});
