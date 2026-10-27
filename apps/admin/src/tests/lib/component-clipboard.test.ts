import type { CMSComponentData } from '@stormycms/core';
import { describe, expect, it, vi } from 'vitest';
import { canPasteComponent, getPasteError, pasteComponent } from '~/lib/component-clipboard';

const node = (id: string, children: CMSComponentData[] = []): CMSComponentData => ({
	id,
	name: 'Group',
	props: { options: { color: 'blue' } },
	attrs: { title: id },
	parentComponentId: null,
	childComponents: children.map((child) => ({ ...child, parentComponentId: id })),
});
const metadata = { Group: { noChildren: false, layoutOnly: false, unique: false } };
function freeze(components: CMSComponentData[]) {
	for (const component of components) {
		freeze(component.childComponents);
		Object.freeze(component.props);
		Object.freeze(component.attrs);
		Object.freeze(component);
	}
	Object.freeze(components);
	return components;
}

describe('component clipboard operations', () => {
	it('creates independently owned props, attributes, child arrays, and IDs for every pasted subtree', () => {
		const snapshot = node('source', [node('child')]);
		const components = freeze([node('target')]);
		let sequence = 0;
		const args = {
			components,
			clipboard: { kind: 'copy', component: snapshot },
			targetId: 'target',
			placement: 'inside',
			context: 'page',
			editorId: 'page',
			metadata,
		} as const;
		const first = pasteComponent({ ...args, createId: () => `first-${++sequence}` });
		const second = pasteComponent({ ...args, createId: () => `second-${++sequence}` });
		const copy = first[0]?.childComponents[0];
		expect(copy).toMatchObject({
			id: 'first-1',
			parentComponentId: 'target',
			childComponents: [{ id: 'first-2', parentComponentId: 'first-1' }],
		});
		expect(copy?.props).not.toBe(snapshot.props);
		expect(copy?.props.options).not.toBe(snapshot.props.options);
		expect(copy?.attrs).not.toBe(snapshot.attrs);
		expect(copy?.childComponents[0]?.props).not.toBe(snapshot.childComponents[0]?.props);
		expect(copy?.props).not.toBe(second[0]?.childComponents[0]?.props);
		expect(components[0]?.childComponents).toEqual([]);
	});

	it('rejects stale cut sources and missing targets without allocating IDs or changing the tree', () => {
		const components = freeze([node('target')]);
		const createId = vi.fn(() => 'new-id');
		const cut = {
			components,
			clipboard: { kind: 'cut', component: node('deleted'), sourceEditor: { id: 'page', context: 'page' } },
			targetId: 'target',
			placement: 'inside',
			context: 'page',
			editorId: 'page',
			metadata,
			createId,
		} as const;
		expect(canPasteComponent(cut)).toBe(false);
		expect(pasteComponent(cut)).toBe(components);
		const missing = { ...cut, clipboard: { kind: 'copy', component: node('source') }, targetId: 'missing' } as const;
		expect(canPasteComponent(missing)).toBe(false);
		expect(pasteComponent(missing)).toBe(components);
		expect(createId).not.toHaveBeenCalled();
	});

	it('rejects cuts from another editor or context without allocating IDs or changing the tree', () => {
		const components = freeze([node('target')]);
		const createId = vi.fn(() => 'new-id');
		const args = {
			components,
			clipboard: { kind: 'cut', component: node('source'), sourceEditor: { id: 'page', context: 'page' } },
			targetId: 'target',
			placement: 'inside',
			context: 'page',
			editorId: 'another-page',
			metadata,
			createId,
		} as const;
		expect(getPasteError(args)).toBe(
			'This component was cut from another document. Return to its original editor to move it, or copy it to paste here.',
		);
		expect(canPasteComponent(args)).toBe(false);
		expect(pasteComponent(args)).toBe(components);
		expect(getPasteError({ ...args, editorId: 'page', context: 'layout' })).toBe(
			'This component was cut from another document. Return to its original editor to move it, or copy it to paste here.',
		);
		expect(createId).not.toHaveBeenCalled();
	});

	it('does not allocate new IDs for cut subtrees', () => {
		const source = node('source', [node('child')]);
		const components = freeze([source, node('target')]);
		const createId = vi.fn(() => 'new-id');
		const result = pasteComponent({
			components,
			clipboard: { kind: 'cut', component: source, sourceEditor: { id: 'page', context: 'page' } },
			targetId: 'target',
			placement: 'inside',
			context: 'page',
			editorId: 'page',
			metadata,
			createId,
		});
		expect(result).toEqual([node('target', [source])]);
		expect(createId).not.toHaveBeenCalled();
	});

	it('validates slots after nested targets and supports before and after placement', () => {
		const components = [node('root', [node('target')])];
		const args = {
			components,
			clipboard: { kind: 'copy', component: node('source') },
			targetId: 'target',
			editorId: 'page',
			context: 'page',
			metadata,
		} as const;
		expect(getPasteError({ ...args, placement: 'before' })).toBeNull();
		expect(getPasteError({ ...args, placement: 'after' })).toBeNull();
	});

	it('rejects copying layout-only components into a page', () => {
		const components = [node('target')];
		const args = {
			components,
			clipboard: { kind: 'copy', component: { ...node('layout-only'), name: 'LayoutOnly' } },
			targetId: 'target',
			placement: 'before',
			context: 'page',
			editorId: 'page',
			metadata: { ...metadata, LayoutOnly: { noChildren: false, layoutOnly: true, unique: false } },
		} as const;
		expect(canPasteComponent(args)).toBe(false);
	});
});
