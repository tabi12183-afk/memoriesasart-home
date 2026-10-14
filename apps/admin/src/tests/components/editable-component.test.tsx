import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { CMSComponentData } from '@stormycms/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { pageCtx, layoutCtx } = vi.hoisted(() => {
	const makeCtx = () => ({
		id: 'entity-1',
		initialData: { name: 'Entity', slug: 'entity' },
		components: [] as unknown[],
		layoutId: undefined as string | undefined,
		parentLayoutId: undefined as string | undefined,
		updateComponent: vi.fn(),
		removeComponent: vi.fn(),
		addComponent: vi.fn(),
		addFirstComponent: vi.fn(),
		setLayoutId: vi.fn(),
		setParentLayoutId: vi.fn(),
	});
	return { pageCtx: makeCtx(), layoutCtx: makeCtx() };
});

vi.mock('@stormycms/react/cms/client', () => ({
	useCMSPage: () => pageCtx,
	useCMSLayout: () => layoutCtx,
}));

vi.mock('~/components/markdown-editor', () => ({
	MarkdownEditor: ({
		id,
		label,
		value,
		onChange,
	}: {
		id: string;
		label: string;
		value: string;
		onChange: (v: string) => void;
	}) => (
		<div>
			<label htmlFor={id}>{label}</label>
			<input id={id} value={value} onChange={(e) => onChange(e.target.value)} data-testid="markdown-editor" />
		</div>
	),
}));

vi.mock('~/components/media-library', () => ({
	MediaLibrary: ({
		onSelect,
		renderTrigger,
	}: {
		onSelect: (items: unknown[]) => void;
		renderTrigger?: (onClick: () => void) => React.ReactNode;
	}) => (
		<div>
			{notNullish(renderTrigger) ? renderTrigger(() => {}) : null}
			<button type="button" onClick={() => onSelect([])}>
				select-nothing
			</button>
			<button
				type="button"
				onClick={() =>
					onSelect([
						{
							id: 'media-1',
							url: '/uploads/pic.png',
							name: 'pic.png',
							metadata: { alt: 'A pic', tags: ['a', 'b'] },
						},
					])
				}
			>
				select-media
			</button>
			<button
				type="button"
				onClick={() =>
					onSelect([
						{
							id: 'media-2',
							url: '/uploads/no-meta.png',
							name: 'no-meta.png',
							metadata: {},
						},
					])
				}
			>
				select-media-no-meta
			</button>
		</div>
	),
}));

import { AddComponentDialog, CMSFieldInput, EditableComponent } from '~/components/editable-component';
import { EditorSelectionProvider } from '~/components/editor-selection';
import { notNullish, nullish } from '~/lib/utils';

const component = (
	id: string,
	name: string,
	props: Record<string, unknown> = {},
	childComponents: CMSComponentData[] = [],
	parentComponentId: string | null = null,
): CMSComponentData => ({ id, name, props, attrs: {}, parentComponentId, childComponents });

const renderEditable = (data: CMSComponentData, index = 0, context: 'page' | 'layout' = 'page') =>
	render(
		<EditorSelectionProvider>
			<EditableComponent
				id={data.id}
				index={index}
				parentComponentId={data.parentComponentId}
				name={data.name}
				initialProps={data.props}
				childComponents={data.childComponents}
				context={context}
			/>
		</EditorSelectionProvider>,
	);

beforeEach(() => {
	pageCtx.components = [];
	layoutCtx.components = [];
	for (const ctx of [pageCtx, layoutCtx]) {
		ctx.updateComponent.mockClear();
		ctx.removeComponent.mockClear();
		ctx.addComponent.mockClear();
		ctx.addFirstComponent.mockClear();
	}
});

describe('EditableComponent', () => {
	it('renders a known CMS component with its label chip', () => {
		const text = component('t1', 'Text', { content: 'Hello world' });
		pageCtx.components = [text];
		renderEditable(text);
		expect(screen.getByText('Hello world')).toBeInTheDocument();
		expect(screen.getByText('Text')).toBeInTheDocument();
		expect(screen.getByTestId('cms-component-text')).toBeInTheDocument();
	});

	it('falls back to a plain container for unknown component names', () => {
		const unknown = component('u1', 'Mystery');
		pageCtx.components = [unknown];
		renderEditable(unknown);
		expect(screen.getByText('Unknown')).toBeInTheDocument();
		expect(screen.getByTestId('cms-component-mystery')).toBeInTheDocument();
	});

	it('renders the outlet placeholder in layout context', () => {
		const outlet = component('o1', 'Outlet');
		layoutCtx.components = [outlet];
		renderEditable(outlet, 0, 'layout');
		expect(screen.getByTestId('cms-outlet-placeholder')).toBeInTheDocument();
	});

	it('renders a normal component in layout context', () => {
		const text = component('t1', 'Text', { content: 'Layout text' });
		layoutCtx.components = [text];
		renderEditable(text, 0, 'layout');
		expect(screen.getByText('Layout text')).toBeInTheDocument();
	});

	it('locks selection on click and clears it with the deselect control', async () => {
		const text = component('t1', 'Text', { content: 'Click me' });
		pageCtx.components = [text];
		renderEditable(text);
		const editable = screen.getByTestId('cms-editable-component-t1');
		await userEvent.click(screen.getByText('Click me'));
		expect(editable).toHaveAttribute('data-cms-active', 'true');

		await userEvent.click(screen.getByRole('button', { name: 'Clear component selection' }));
		expect(editable).not.toHaveAttribute('data-cms-active');
	});

	it('navigates the tree with arrow keys from the hovered component', async () => {
		const heading = component('h1', 'Heading', { text: 'Title' }, [], 'sec1');
		const text = component('t1', 'Text', { content: 'Body' }, [], 'sec1');
		const section = component('sec1', 'Section', {}, [heading, text]);
		const sibling = component('t2', 'Text', { content: 'After section' });
		pageCtx.components = [section, sibling];

		render(
			<EditorSelectionProvider>
				<EditableComponent
					id="sec1"
					index={0}
					parentComponentId={null}
					name="Section"
					initialProps={{}}
					childComponents={[heading, text]}
					context="page"
				/>
				<EditableComponent
					id="t2"
					index={1}
					parentComponentId={null}
					name="Text"
					initialProps={{ content: 'After section' }}
					childComponents={[]}
					context="page"
				/>
			</EditorSelectionProvider>,
		);

		// Hover the heading, then walk: up to the section, down to the first child,
		// right to the text sibling, left back to the heading.
		fireEvent.mouseOver(screen.getByText('Title'));
		fireEvent.keyDown(window, { key: 'ArrowUp' });
		expect(screen.getByTestId('cms-editable-component-sec1')).toHaveAttribute('data-cms-active', 'true');

		fireEvent.keyDown(window, { key: 'ArrowDown' });
		expect(screen.getByTestId('cms-editable-component-h1')).toHaveAttribute('data-cms-active', 'true');

		fireEvent.keyDown(window, { key: 'ArrowRight' });
		expect(screen.getByTestId('cms-editable-component-t1')).toHaveAttribute('data-cms-active', 'true');

		fireEvent.keyDown(window, { key: 'ArrowLeft' });
		expect(screen.getByTestId('cms-editable-component-h1')).toHaveAttribute('data-cms-active', 'true');
	});

	it('offers navigator buttons for parent, child, and siblings', async () => {
		const heading = component('h1', 'Heading', { text: 'One' }, [], 'sec1');
		const text = component('t1', 'Text', { content: 'Two' }, [], 'sec1');
		const section = component('sec1', 'Section', {}, [heading, text]);
		pageCtx.components = [section];

		renderEditable(section);
		const inComponent = (id: string) => within(screen.getByTestId(`cms-editable-component-${id}`));
		await userEvent.click(inComponent('sec1').getByRole('button', { name: 'Select child Heading' }));
		expect(screen.getByTestId('cms-editable-component-h1')).toHaveAttribute('data-cms-active', 'true');

		await userEvent.click(inComponent('h1').getByRole('button', { name: 'Select parent Section' }));
		expect(screen.getByTestId('cms-editable-component-sec1')).toHaveAttribute('data-cms-active', 'true');

		await userEvent.click(inComponent('h1').getByRole('button', { name: 'Select next sibling Text' }));
		expect(screen.getByTestId('cms-editable-component-t1')).toHaveAttribute('data-cms-active', 'true');

		await userEvent.click(inComponent('t1').getByRole('button', { name: 'Select previous sibling Heading' }));
		expect(screen.getByTestId('cms-editable-component-h1')).toHaveAttribute('data-cms-active', 'true');
	});

	it('does not hijack arrow keys typed into form fields', async () => {
		const text = component('t1', 'Text', { content: 'Body' });
		pageCtx.components = [text];
		renderEditable(text);
		fireEvent.mouseOver(screen.getByText('Body'));

		const outside = document.createElement('input');
		document.body.appendChild(outside);
		outside.focus();
		fireEvent.keyDown(outside, { key: 'ArrowUp' });
		expect(screen.getByTestId('cms-editable-component-t1')).not.toHaveAttribute('data-cms-active');
		outside.remove();
	});

	it('falls back to clientWidth when ResizeObserver provides no entry', () => {
		class MockResizeObserver implements ResizeObserver {
			callback: ResizeObserverCallback;
			constructor(callback: ResizeObserverCallback) {
				this.callback = callback;
			}
			observe(_target: Element) {
				this.callback([], new MockResizeObserver(this.callback) as unknown as ResizeObserver);
			}
			unobserve() {}
			disconnect() {}
		}
		const OriginalResizeObserver = window.ResizeObserver;
		window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

		try {
			const text = component('t1', 'Text', { content: 'Body' });
			pageCtx.components = [text];
			const { container } = renderEditable(text);

			expect(container.querySelector('[data-cms-compact-controls]')).toBeInTheDocument();
		} finally {
			window.ResizeObserver = OriginalResizeObserver;
		}
	});

	it('preserves hover state when leaving a different component', async () => {
		const one = component('t1', 'Text', { content: 'One' });
		const two = component('t2', 'Text', { content: 'Two' });
		pageCtx.components = [one, two];

		render(
			<EditorSelectionProvider>
				<EditableComponent
					id="t1"
					index={0}
					parentComponentId={null}
					name="Text"
					initialProps={{ content: 'One' }}
					childComponents={[]}
					context="page"
				/>
				<EditableComponent
					id="t2"
					index={1}
					parentComponentId={null}
					name="Text"
					initialProps={{ content: 'Two' }}
					childComponents={[]}
					context="page"
				/>
			</EditorSelectionProvider>,
		);

		fireEvent.mouseOver(screen.getByText('One'));
		fireEvent.mouseLeave(screen.getByText('One'));

		fireEvent.mouseOver(screen.getByText('One'));
		fireEvent.mouseOver(screen.getByText('Two'));
		fireEvent.mouseLeave(screen.getByText('One'));
	});

	it('handles a missing parent component gracefully', () => {
		const text = component('t1', 'Text', { content: 'Orphan' });
		pageCtx.components = [text];
		render(
			<EditorSelectionProvider>
				<EditableComponent
					id="t1"
					index={0}
					parentComponentId="missing-parent"
					name="Text"
					initialProps={{ content: 'Orphan' }}
					childComponents={[]}
					context="page"
				/>
			</EditorSelectionProvider>,
		);
		expect(screen.getByRole('button', { name: 'Select parent component' })).toBeInTheDocument();
	});

	it('ignores non-navigation keys when a component is current', () => {
		const text = component('t1', 'Text', { content: 'Body' });
		pageCtx.components = [text];
		renderEditable(text);

		fireEvent.mouseOver(screen.getByText('Body'));
		fireEvent.keyDown(window, { key: 'Enter' });
		expect(screen.getByTestId('cms-editable-component-t1')).not.toHaveAttribute('data-cms-active');
	});

	it('removes a component without clearing selection when not active', async () => {
		const text = component('t1', 'Text', { content: 'Doomed' });
		pageCtx.components = [text];
		renderEditable(text);

		await userEvent.click(screen.getByRole('button', { name: 'Remove component' }));
		await userEvent.click(await screen.findByRole('button', { name: 'Remove' }));

		expect(pageCtx.removeComponent).toHaveBeenCalledWith('t1', null);
	});

	it('initializes form values with fallbacks for missing fields', async () => {
		const hero = component('h1', 'Hero', {});
		pageCtx.components = [hero];
		renderEditable(hero);

		await userEvent.click(screen.getByRole('button', { name: /Edit/ }));
		const inputs = screen.getAllByRole('textbox');
		expect(inputs.length).toBeGreaterThan(0);
	});

	it('edits component fields and saves the new props', async () => {
		const text = component('t1', 'Text', { content: 'Original' });
		pageCtx.components = [text];
		renderEditable(text);

		await userEvent.click(screen.getByRole('button', { name: /Edit/ }));
		const textarea = await screen.findByLabelText('Content');
		await userEvent.clear(textarea);
		await userEvent.type(textarea, 'Updated');
		await userEvent.click(screen.getByRole('button', { name: 'Update' }));

		expect(pageCtx.updateComponent).toHaveBeenCalledWith('t1', { content: 'Updated' });
	});

	it('removes the component after confirmation and clears its selection', async () => {
		const text = component('t1', 'Text', { content: 'Doomed' });
		pageCtx.components = [text];
		renderEditable(text);

		await userEvent.click(screen.getByText('Doomed'));
		await userEvent.click(screen.getByRole('button', { name: 'Remove component' }));
		await userEvent.click(await screen.findByRole('button', { name: 'Remove' }));

		expect(pageCtx.removeComponent).toHaveBeenCalledWith('t1', null);
		expect(screen.getByTestId('cms-editable-component-t1')).not.toHaveAttribute('data-cms-active');
	});

	it('cancelling the remove dialog keeps the component', async () => {
		const text = component('t1', 'Text', { content: 'Safe' });
		pageCtx.components = [text];
		renderEditable(text);

		await userEvent.click(screen.getByRole('button', { name: 'Remove component' }));
		await userEvent.click(await screen.findByRole('button', { name: 'Cancel' }));
		expect(pageCtx.removeComponent).not.toHaveBeenCalled();
	});

	it('hides the add-child control for components that allow no children', () => {
		const heading = component('h1', 'Heading', { text: 'Solo' });
		pageCtx.components = [heading];
		renderEditable(heading);
		expect(within(screen.getByTestId('cms-editor-controls')).queryByText('Child')).not.toBeInTheDocument();
	});

	it('adds a child component through the add dialog', async () => {
		const section = component('sec1', 'Section');
		pageCtx.components = [section];
		renderEditable(section);

		await userEvent.click(within(screen.getByTestId('cms-editor-controls')).getByRole('button', { name: /Child/ }));
		const palette = await screen.findByTestId('cms-add-component-palette');
		await userEvent.click(within(palette).getByRole('button', { name: 'Heading' }));
		await userEvent.click(screen.getByRole('button', { name: 'Add Component' }));

		expect(pageCtx.addComponent).toHaveBeenCalledWith(
			expect.objectContaining({
				name: 'Heading',
				parentComponentId: 'sec1',
				props: expect.objectContaining({ text: 'Heading' }),
			}),
			'inside',
			0,
		);
	});

	it('adds siblings before and after the component', async () => {
		const text = component('t1', 'Text', { content: 'Anchor' });
		pageCtx.components = [text];
		renderEditable(text, 3);

		await userEvent.click(screen.getByRole('button', { name: /Add before/ }));
		let palette = await screen.findByTestId('cms-add-component-palette');
		await userEvent.click(within(palette).getByRole('button', { name: 'Text' }));
		await userEvent.click(screen.getByRole('button', { name: 'Add Component' }));
		expect(pageCtx.addComponent).toHaveBeenLastCalledWith(expect.objectContaining({ name: 'Text' }), 'before', 3);

		await userEvent.click(screen.getByRole('button', { name: /Add after/ }));
		palette = await screen.findByTestId('cms-add-component-palette');
		await userEvent.click(within(palette).getByRole('button', { name: 'Text' }));
		await userEvent.click(screen.getByRole('button', { name: 'Add Component' }));
		expect(pageCtx.addComponent).toHaveBeenLastCalledWith(expect.objectContaining({ name: 'Text' }), 'after', 3);
	});
});

describe('AddComponentDialog', () => {
	const noop = () => {};

	it('uses addFirstComponent when the tree is empty', async () => {
		pageCtx.components = [];
		render(<AddComponentDialog open onOpenChange={noop} parentComponentId={null} placement="after" context="page" />);
		const palette = screen.getByTestId('cms-add-component-palette');
		await userEvent.click(within(palette).getByRole('button', { name: 'Hero' }));
		await userEvent.click(screen.getByRole('button', { name: 'Add Component' }));
		expect(pageCtx.addFirstComponent).toHaveBeenCalledWith(expect.objectContaining({ name: 'Hero' }));
	});

	it('excludes layout-only components on pages and singleton components that already exist', async () => {
		const regionHeader = component('rh1', 'RegionHeader', {}, [], 'r1');
		const region = component('r1', 'Region', {}, [regionHeader]);
		layoutCtx.components = [region];

		render(<AddComponentDialog open onOpenChange={noop} parentComponentId="r1" placement="inside" context="layout" />);
		const palette = screen.getByTestId('cms-add-component-palette');
		expect(within(palette).queryByRole('button', { name: 'Region Header' })).not.toBeInTheDocument();
		expect(within(palette).getByRole('button', { name: 'Region Footer' })).toBeInTheDocument();
	});

	it('hides layout-only components in page context but shows them for layouts', () => {
		pageCtx.components = [component('x1', 'Text')];
		layoutCtx.components = [component('x2', 'Text')];
		const { unmount } = render(
			<AddComponentDialog open onOpenChange={noop} parentComponentId={null} placement="after" context="page" />,
		);
		expect(screen.queryByRole('button', { name: 'Outlet' })).not.toBeInTheDocument();
		unmount();

		render(<AddComponentDialog open onOpenChange={noop} parentComponentId={null} placement="after" context="layout" />);
		expect(screen.getByRole('button', { name: 'Outlet' })).toBeInTheDocument();
	});

	it('shows an empty palette message when every option is taken', () => {
		const children = ['RegionHeader', 'RegionAside', 'RegionMain', 'RegionFooter'].map((name, i) =>
			component(`c${i}`, name, {}, [], 'r1'),
		);
		layoutCtx.components = [component('r1', 'Region', {}, children)];
		render(<AddComponentDialog open onOpenChange={noop} parentComponentId="r1" placement="inside" context="layout" />);
		expect(screen.getByText('No components can be added here.')).toBeInTheDocument();
	});

	it('shows a no-fields note for components without configuration', async () => {
		layoutCtx.components = [component('x2', 'Text')];
		render(<AddComponentDialog open onOpenChange={noop} parentComponentId={null} placement="after" context="layout" />);
		await userEvent.click(screen.getByRole('button', { name: 'Outlet' }));
		expect(screen.getByText('This component has no fields to configure.')).toBeInTheDocument();
	});

	it('disables submission until a component is chosen', () => {
		pageCtx.components = [component('x1', 'Text')];
		render(<AddComponentDialog open onOpenChange={noop} parentComponentId={null} placement="after" context="page" />);
		expect(screen.getByText('Choose a component from the list to configure it.')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Add Component' })).toBeDisabled();
	});

	it('handles a missing parent in the add dialog', () => {
		render(
			<AddComponentDialog
				open
				onOpenChange={noop}
				parentComponentId="missing-parent"
				placement="inside"
				context="page"
			/>,
		);
		expect(screen.getByTestId('cms-add-component-palette')).toBeInTheDocument();
	});

	it('does nothing when submitting without a selected component', async () => {
		pageCtx.components = [component('x1', 'Text')];
		render(<AddComponentDialog open onOpenChange={noop} parentComponentId={null} placement="after" context="page" />);

		const form = screen.getByRole('button', { name: 'Add Component' }).closest('form');
		if (nullish(form)) throw new Error('Form not found');
		fireEvent.submit(form);

		expect(pageCtx.addComponent).not.toHaveBeenCalled();
		expect(pageCtx.addFirstComponent).not.toHaveBeenCalled();
	});

	it('edits field values before adding a component', async () => {
		pageCtx.components = [component('x1', 'Text')];
		render(
			<AddComponentDialog
				open
				onOpenChange={noop}
				parentComponentId={null}
				placement="after"
				context="page"
				index={1}
			/>,
		);

		await userEvent.click(screen.getByRole('button', { name: 'Hero' }));
		const titleInput = screen.getByLabelText('Title');
		await userEvent.clear(titleInput);
		await userEvent.type(titleInput, 'New Title');
		await userEvent.click(screen.getByRole('button', { name: 'Add Component' }));

		expect(pageCtx.addComponent).toHaveBeenCalledWith(
			expect.objectContaining({ name: 'Hero', props: expect.objectContaining({ title: 'New Title' }) }),
			'after',
			1,
		);
	});
});

describe('CMSFieldInput', () => {
	it('renders a markdown editor for markdown fields', async () => {
		const onChange = vi.fn();
		render(
			<CMSFieldInput
				field={{ label: 'Content', prop: 'content', field: 'markdown' as never, required: true }}
				value="**bold**"
				onChange={onChange}
			/>,
		);
		const editor = screen.getByTestId('markdown-editor');
		expect(editor).toHaveValue('**bold**');
		fireEvent.change(editor, { target: { value: 'new' } });
		expect(onChange).toHaveBeenCalledWith('new');
	});

	it('renders an image picker that maps selected media to an image asset', async () => {
		const onChange = vi.fn();
		render(
			<CMSFieldInput
				field={{ label: 'Image', prop: 'image', field: 'image', required: false }}
				value={{ src: '/existing.png', alt: 'Existing' }}
				onChange={onChange}
			/>,
		);
		expect(screen.getByTestId('cms-image-preview')).toHaveAttribute('src', '/existing.png');

		await userEvent.click(screen.getByRole('button', { name: 'select-nothing' }));
		expect(onChange).not.toHaveBeenCalled();

		await userEvent.click(screen.getByRole('button', { name: 'select-media' }));
		expect(onChange).toHaveBeenCalledWith({
			src: '/uploads/pic.png',
			alt: 'A pic',
			mediaId: 'media-1',
			name: 'pic.png',
			tags: ['a', 'b'],
		});
		expect(screen.getByTestId('cms-image-preview')).toHaveAttribute('src', '/uploads/pic.png');
	});

	it('renders selects for select and radio fields', async () => {
		const onChange = vi.fn();
		render(
			<CMSFieldInput
				field={{
					label: 'Level',
					prop: 'level',
					field: 'select',
					options: ['h1', 'h2'],
					required: false,
					defaultValue: 'h2',
				}}
				onChange={onChange}
			/>,
		);
		await userEvent.click(screen.getByRole('combobox'));
		await userEvent.click(await screen.findByRole('option', { name: 'h1' }));
		expect(onChange).toHaveBeenCalledWith('h1');
	});

	it('manages key/value rows for keyValueList fields', async () => {
		const onChange = vi.fn();
		render(
			<CMSFieldInput
				field={{ label: 'Links', prop: 'links', field: 'keyValueList', required: false }}
				value={{ Home: '/' }}
				onChange={onChange}
			/>,
		);
		expect(screen.getByDisplayValue('Home')).toBeInTheDocument();

		await userEvent.click(screen.getByRole('button', { name: /Add Links/ }));
		await userEvent.type(screen.getByLabelText('Links name 2'), 'About');
		await userEvent.type(screen.getByLabelText('Links value 2'), '/about');
		expect(onChange).toHaveBeenLastCalledWith({ Home: '/', About: '/about' });

		// Remove the first row. The trash controls are the icon-only buttons (an svg
		// and no text); the "Add Links" button has text and must be excluded.
		const removeButtons = screen
			.getAllByRole('button')
			.filter((b) => notNullish(b.querySelector('svg')) && b.textContent.trim() === '');
		if (removeButtons[0] === undefined) {
			throw new Error('Remove button not found');
		}
		await userEvent.click(removeButtons[0]);
		expect(onChange).toHaveBeenLastCalledWith({ About: '/about' });
	});

	it('starts keyValueList empty for non-object values', () => {
		render(
			<CMSFieldInput field={{ label: 'Links', prop: 'links', field: 'keyValueList', required: false }} value="" />,
		);
		expect(screen.queryByPlaceholderText('Label')).not.toBeInTheDocument();
	});

	it.each([
		[true, true],
		['true', true],
		['on', true],
		[false, false],
	])('renders checkbox fields with value %j checked=%s', (value, checked) => {
		render(
			<CMSFieldInput field={{ label: 'Enabled', prop: 'enabled', field: 'checkbox', required: false }} value={value} />,
		);
		const checkbox = screen.getByRole('checkbox', { name: 'Enabled' });
		expect(checkbox).toHaveAttribute('data-state', checked ? 'checked' : 'unchecked');
	});

	it('emits boolean changes from checkbox fields', async () => {
		const onChange = vi.fn();
		render(
			<CMSFieldInput
				field={{ label: 'Enabled', prop: 'enabled', field: 'checkbox', required: false, defaultValue: false }}
				onChange={onChange}
			/>,
		);
		await userEvent.click(screen.getByRole('checkbox', { name: 'Enabled' }));
		expect(onChange).toHaveBeenCalledWith(true);
	});

	it('renders noop fields as hidden inputs', () => {
		const { container } = render(
			<CMSFieldInput
				field={{ label: 'Hidden', prop: 'secret', field: 'noop', required: false, fn: () => 'keep' }}
				value="keep"
			/>,
		);
		const hidden = container.querySelector('input[type="hidden"]') as HTMLInputElement;
		expect(hidden).toHaveValue('keep');
	});

	it('renders textarea fields with defaults', async () => {
		const onChange = vi.fn();
		render(
			<CMSFieldInput
				field={{ label: 'Body', prop: 'body', field: 'textarea', required: false, defaultValue: 'fallback' }}
				onChange={onChange}
			/>,
		);
		const textarea = screen.getByLabelText('Body');
		expect(textarea).toHaveValue('fallback');
		await userEvent.type(textarea, '!');
		expect(onChange).toHaveBeenCalledWith('fallback!');
	});

	it('renders text inputs for everything else, stringifying numbers', async () => {
		const onChange = vi.fn();
		render(
			<CMSFieldInput
				field={{ label: 'Count', prop: 'count', field: 'input', required: false }}
				value={42}
				onChange={onChange}
			/>,
		);
		const input = screen.getByLabelText('Count');
		expect(input).toHaveValue('42');
		await userEvent.type(input, '0');
		expect(onChange).toHaveBeenCalledWith('420');
	});

	it('falls back to empty markdown values when value is not a string', () => {
		render(
			<CMSFieldInput field={{ label: 'Body', prop: 'body', field: 'markdown' as never, required: true }} value={42} />,
		);
		expect(screen.getByTestId('markdown-editor')).toHaveValue('');
	});

	it('renders select fields without value or default as empty', () => {
		render(
			<CMSFieldInput
				field={{ label: 'Level', prop: 'level', field: 'select', options: ['h1', 'h2'], required: false }}
			/>,
		);
		expect(screen.getByRole('combobox')).toHaveValue('');
	});

	it('renders textarea fields without value or default as empty', () => {
		render(<CMSFieldInput field={{ label: 'Body', prop: 'body', field: 'textarea', required: false }} />);
		expect(screen.getByLabelText('Body')).toHaveValue('');
	});

	it('renders noop fields without value or default as empty', () => {
		const { container } = render(
			<CMSFieldInput field={{ label: 'Hidden', prop: 'secret', field: 'noop', required: false, fn: () => '' }} />,
		);
		const hidden = container.querySelector('input[type="hidden"]') as HTMLInputElement;
		expect(hidden).toHaveValue('');
	});

	it('renders input fields with neither string nor number values as empty', () => {
		render(<CMSFieldInput field={{ label: 'Count', prop: 'count', field: 'input', required: false }} value={null} />);
		expect(screen.getByLabelText('Count')).toHaveValue('');
	});

	it('filters out empty keys when emitting keyValueList changes', async () => {
		const onChange = vi.fn();
		render(
			<CMSFieldInput
				field={{ label: 'Links', prop: 'links', field: 'keyValueList', required: false }}
				onChange={onChange}
			/>,
		);
		await userEvent.click(screen.getByRole('button', { name: /Add Links/ }));
		await userEvent.type(screen.getByLabelText('Links value 1'), '/about');
		expect(onChange).toHaveBeenLastCalledWith({});
	});

	it('renders image fields with missing alt as default label', async () => {
		const onChange = vi.fn();
		render(
			<CMSFieldInput
				field={{ label: 'Image', prop: 'image', field: 'image', required: false }}
				value={{ src: '/existing.png' }}
				onChange={onChange}
			/>,
		);
		await userEvent.click(screen.getByRole('button', { name: 'select-media-no-meta' }));
		expect(screen.getByTestId('cms-image-preview')).toHaveAttribute('alt', 'Selected');
		expect(onChange).toHaveBeenCalledWith(
			expect.objectContaining({ src: '/uploads/no-meta.png', alt: undefined, tags: undefined }),
		);
	});
});
