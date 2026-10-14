import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/dialog';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '~/components/drawer';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '~/components/dropdown-menu';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from '~/components/select';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '~/components/sheet';

describe('Dialog', () => {
	it('opens from its trigger and closes again', async () => {
		render(
			<Dialog>
				<DialogTrigger>Open dialog</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Dialog title</DialogTitle>
						<DialogDescription>Dialog description</DialogDescription>
					</DialogHeader>
					body
					<DialogFooter>
						<DialogClose>Cancel</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>,
		);
		await userEvent.click(screen.getByRole('button', { name: 'Open dialog' }));
		expect(await screen.findByRole('dialog')).toBeInTheDocument();
		expect(screen.getByText('Dialog title')).toBeInTheDocument();
		await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
});

describe('Sheet', () => {
	it('opens with a close button by default', async () => {
		render(
			<Sheet>
				<SheetTrigger>Open sheet</SheetTrigger>
				<SheetContent side="left">
					<SheetHeader>
						<SheetTitle>Sheet title</SheetTitle>
						<SheetDescription>Sheet description</SheetDescription>
					</SheetHeader>
					sheet body
					<SheetFooter>
						<SheetClose>Dismiss</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>,
		);
		await userEvent.click(screen.getByRole('button', { name: 'Open sheet' }));
		expect(await screen.findByText('Sheet title')).toBeInTheDocument();
		expect(screen.getByText('sheet body')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
		await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
		expect(screen.queryByText('Sheet title')).not.toBeInTheDocument();
	});

	it('can hide the built-in close button', async () => {
		render(
			<Sheet defaultOpen>
				<SheetContent showCloseButton={false} aria-describedby={undefined}>
					<SheetTitle>Bare sheet</SheetTitle>
				</SheetContent>
			</Sheet>,
		);
		expect(await screen.findByText('Bare sheet')).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
	});
});

describe('Drawer', () => {
	it('renders drawer content when open', async () => {
		render(
			<Drawer defaultOpen>
				<DrawerTrigger>Open drawer</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Drawer title</DrawerTitle>
						<DrawerDescription>Drawer description</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>
						<DrawerClose>Close drawer</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>,
		);
		expect(await screen.findByText('Drawer title')).toBeInTheDocument();
		expect(screen.getByText('Drawer description')).toBeInTheDocument();
	});
});

describe('DropdownMenu', () => {
	it('renders items, checkboxes, radios, labels, and submenus', async () => {
		const onSelect = vi.fn();
		render(
			<DropdownMenu>
				<DropdownMenuTrigger>Menu</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel inset>Section</DropdownMenuLabel>
					<DropdownMenuGroup>
						<DropdownMenuItem onSelect={onSelect}>
							Do thing
							<DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem variant="destructive" inset>
							Delete
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem checked>Checked option</DropdownMenuCheckboxItem>
					<DropdownMenuRadioGroup value="a">
						<DropdownMenuRadioItem value="a">Option A</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="b" inset>
							Option B
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger inset>More</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuItem>Nested action</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				</DropdownMenuContent>
			</DropdownMenu>,
		);

		await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
		expect(await screen.findByText('Section')).toBeInTheDocument();
		expect(screen.getByRole('menuitemcheckbox', { name: 'Checked option' })).toHaveAttribute('data-state', 'checked');
		expect(screen.getByRole('menuitemradio', { name: 'Option A' })).toHaveAttribute('data-state', 'checked');
		expect(screen.getByRole('menuitemradio', { name: 'Option B' })).toHaveAttribute('data-state', 'unchecked');

		const subTrigger = screen.getByText('More');
		await userEvent.hover(subTrigger);
		expect(await screen.findByText('Nested action')).toBeInTheDocument();

		await userEvent.click(screen.getByText('Do thing'));
		expect(onSelect).toHaveBeenCalled();
	});

	it('supports a custom portal wrapper', async () => {
		render(
			<DropdownMenu>
				<DropdownMenuTrigger>Menu</DropdownMenuTrigger>
				<DropdownMenuPortal>
					<DropdownMenuContent>
						<DropdownMenuItem>Portaled</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenuPortal>
			</DropdownMenu>,
		);
		await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
		expect(await screen.findByRole('menuitem', { name: 'Portaled' })).toBeInTheDocument();
	});
});

describe('Select', () => {
	it('opens and selects an item', async () => {
		const onValueChange = vi.fn();
		render(
			<Select onValueChange={onValueChange}>
				<SelectTrigger size="sm">
					<SelectValue placeholder="Pick one" />
				</SelectTrigger>
				<SelectContent position="popper">
					<SelectGroup>
						<SelectLabel>Fruits</SelectLabel>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectSeparator />
						<SelectItem value="pear">Pear</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>,
		);

		await userEvent.click(screen.getByRole('combobox'));
		expect(await screen.findByText('Fruits')).toBeInTheDocument();
		await userEvent.click(screen.getByRole('option', { name: 'Apple' }));
		expect(onValueChange).toHaveBeenCalledWith('apple');
	});

	it('supports the default item-aligned position', async () => {
		render(
			<Select defaultValue="one" open>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="one">One</SelectItem>
				</SelectContent>
			</Select>,
		);
		expect((await screen.findAllByText('One')).length).toBeGreaterThan(0);
	});
});
