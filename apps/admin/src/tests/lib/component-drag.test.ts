import type { CMSComponentData } from '@stormycms/core';
import { describe, expect, it } from 'vitest';
import {
	getComponentDropError,
	getComponentInsertionError,
	isValidComponentDrop,
	isValidComponentInsertion,
	moveComponent,
} from '~/lib/component-drag';

const node = (id: string, children: CMSComponentData[] = []): CMSComponentData => ({
	id,
	name: 'Group',
	parentComponentId: null,
	props: { title: id },
	attrs: { title: id },
	childComponents: children.map((child) => ({ ...child, parentComponentId: id })),
});
const metadata = { Group: { noChildren: false, layoutOnly: false, unique: false } };
function freeze(nodes: CMSComponentData[]) {
	for (const component of nodes) {
		freeze(component.childComponents);
		Object.freeze(component.props);
		Object.freeze(component.attrs);
		Object.freeze(component);
	}
	Object.freeze(nodes);
	return nodes;
}

describe('moveComponent', () => {
	it('moves across deep branches without mutating the input or copying the moved descendants', () => {
		const components = freeze([
			node('left', [node('source', [node('child')])]),
			node('right', [node('destination')]),
			node('untouched'),
		]);
		const result = moveComponent({
			components,
			componentId: 'source',
			parentComponentId: 'destination',
			index: 0,
			context: 'page',
			metadata,
		});
		expect(result[0]?.childComponents).toEqual([]);
		const moved = result[1]?.childComponents[0]?.childComponents[0];
		expect(moved).toMatchObject({
			id: 'source',
			parentComponentId: 'destination',
			props: { title: 'source' },
			attrs: { title: 'source' },
		});
		expect(moved?.childComponents).toBe(components[0]?.childComponents[0]?.childComponents);
		expect(result[2]).toBe(components[2]);
		expect(components[0]?.childComponents[0]?.id).toBe('source');
	});

	it.each([0, 1])('returns the original tree when dropping beside itself at slot %s', (index) => {
		const components = freeze([node('source'), node('other')]);
		expect(
			moveComponent({ components, componentId: 'source', parentComponentId: null, index, context: 'page', metadata }),
		).toBe(components);
	});

	it.each([
		{ componentId: 'missing', parentComponentId: null, index: 0 },
		{ componentId: 'source', parentComponentId: 'missing', index: 0 },
		{ componentId: 'source', parentComponentId: 'source', index: 0 },
		{ componentId: 'source', parentComponentId: 'child', index: 0 },
		{ componentId: 'source', parentComponentId: null, index: -1 },
		{ componentId: 'source', parentComponentId: null, index: 3 },
		{ componentId: 'source', parentComponentId: null, index: 0.5 },
	])('preserves the tree for an invalid move: %j', (destination) => {
		const components = freeze([node('source', [node('child')]), node('other')]);
		expect(moveComponent({ components, ...destination, context: 'page', metadata })).toBe(components);
	});
});

describe('component insertion validation', () => {
	const components = [node('group', [node('child')]), node('other')];
	const insertArgs = {
		components,
		component: { ...node('new'), name: 'Leaf' },
		parentComponentId: null,
		index: 2,
		context: 'page' as const,
		metadata: {
			Group: { label: 'Group block', noChildren: false, layoutOnly: false, unique: false },
			Leaf: { noChildren: true, layoutOnly: false, unique: false },
			Layout: { noChildren: false, layoutOnly: true, unique: false },
			Singleton: { noChildren: true, layoutOnly: false, unique: true },
		},
	};

	it('validates public insertion predicates and reports missing metadata and targets', () => {
		expect(isValidComponentInsertion(insertArgs)).toBe(true);
		expect(getComponentInsertionError({ ...insertArgs, component: { ...insertArgs.component, name: 'Unknown' } })).toBe(
			'Unknown is no longer available in this editor.',
		);
		expect(getComponentInsertionError({ ...insertArgs, parentComponentId: 'missing' })).toBe(
			'The paste target no longer exists.',
		);
	});

	it('enforces layout-only and valid-parent rules for root insertion', () => {
		const layoutOnly = { ...insertArgs, component: { ...insertArgs.component, name: 'Layout' } };
		expect(getComponentInsertionError(layoutOnly)).toBe('Layout can only be placed in layouts.');
		expect(getComponentInsertionError({ ...layoutOnly, context: 'layout', index: 0 })).toBeNull();
		const constrained = {
			...insertArgs,
			component: { ...insertArgs.component, name: 'Leaf' },
			metadata: { ...insertArgs.metadata, Leaf: { ...insertArgs.metadata.Leaf, validParents: ['Group'] } },
		};
		expect(getComponentInsertionError(constrained)).toBe('Leaf can only be placed inside Group block.');
		expect(getComponentInsertionError({ ...constrained, context: 'layout' })).toBe(
			'Leaf can only be placed inside Group block.',
		);
	});

	it('checks parent metadata, child restrictions, and allowed parent names', () => {
		const child = {
			...insertArgs,
			parentComponentId: 'child',
			index: 0,
			metadata: { ...insertArgs.metadata, Leaf: { ...insertArgs.metadata.Leaf, validParents: ['other'] } },
		};
		expect(getComponentInsertionError(child)).toBe('Leaf can only be placed inside other.');
		expect(
			getComponentInsertionError({
				...child,
				parentComponentId: 'unknown-parent',
				components: [...components, { ...node('unknown-parent'), name: 'MissingMetadata' }],
			}),
		).toBe('MissingMetadata cannot contain components.');
		expect(
			getComponentInsertionError({
				...child,
				parentComponentId: 'other',
				metadata: { ...insertArgs.metadata, Group: { ...insertArgs.metadata.Group, noChildren: true } },
			}),
		).toBe('Group block does not accept child components.');
		expect(
			getComponentInsertionError({
				...child,
				parentComponentId: 'other',
				metadata: { ...insertArgs.metadata, Group: { ...insertArgs.metadata.Group, validChildren: [] } },
			}),
		).toBe('Group block does not accept Leaf as a child.');
		expect(
			getComponentInsertionError({
				...child,
				parentComponentId: 'other',
				metadata: { ...insertArgs.metadata, Leaf: { ...insertArgs.metadata.Leaf, validParents: ['other'] } },
			}),
		).toBe('Leaf can only be placed inside other.');
	});

	it('rejects duplicate singletons and unavailable insertion positions', () => {
		const singleton = { ...insertArgs, component: { ...insertArgs.component, name: 'Singleton' } };
		expect(getComponentInsertionError({ ...singleton, index: 0 })).toBeNull();
		const withSingleton = [...components, { ...node('existing'), name: 'Singleton' }];
		expect(getComponentInsertionError({ ...singleton, components: withSingleton, index: 0 })).toBe(
			'Page already contains a Singleton. Only one is allowed.',
		);
		expect(
			getComponentInsertionError({
				...singleton,
				components: [node('group', [{ ...node('existing'), name: 'Singleton' }])],
				parentComponentId: 'group',
				index: 0,
			}),
		).toBe('Group block already contains a Singleton. Only one is allowed.');
		expect(
			getComponentInsertionError({
				...singleton,
				context: 'layout',
				components: withSingleton,
				index: 0,
			}),
		).toBe('Layout already contains a Singleton. Only one is allowed.');
		expect(
			getComponentInsertionError({ ...singleton, components: withSingleton, excludeComponentId: 'existing', index: 0 }),
		).toBeNull();
		for (const index of [-1, 3, 0.5]) {
			expect(getComponentInsertionError({ ...insertArgs, index })).toBe(
				'The selected paste position is no longer available.',
			);
		}
		expect(isValidComponentInsertion({ ...insertArgs, index: -1 })).toBe(false);
	});

	it('exposes move errors and the public drop predicate', () => {
		const moveArgs = {
			components,
			componentId: 'child',
			parentComponentId: null,
			index: 0,
			context: 'page' as const,
			metadata: insertArgs.metadata,
		};
		expect(isValidComponentDrop(moveArgs)).toBe(true);
		expect(getComponentDropError({ ...moveArgs, componentId: 'missing' })).toBe(
			'The component to move no longer exists.',
		);
		expect(getComponentDropError({ ...moveArgs, parentComponentId: 'missing' })).toBe(
			'The paste target no longer exists.',
		);
		expect(getComponentDropError({ ...moveArgs, componentId: 'group', parentComponentId: 'child' })).toBe(
			'A component cannot be moved inside itself or one of its descendants.',
		);
		expect(isValidComponentDrop({ ...moveArgs, index: -1 })).toBe(false);
	});

	it('adjusts the insertion index when moving forward within the same parent', () => {
		const siblings = [node('first'), node('moving'), node('last')];
		const tree = [node('group', siblings)];
		const result = moveComponent({
			components: tree,
			componentId: 'moving',
			parentComponentId: 'group',
			index: 3,
			context: 'page',
			metadata: insertArgs.metadata,
		});
		expect(result[0]?.childComponents.map(({ id }) => id)).toEqual(['first', 'last', 'moving']);
	});
});
