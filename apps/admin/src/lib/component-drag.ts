import type { CMSComponentData } from '@stormycms/core';

export type ComponentDragContext = 'page' | 'layout';
export type ComponentMetadata = {
	label?: string;
	noChildren: boolean;
	layoutOnly: boolean;
	validChildren?: string[];
	validParents?: string[];
	unique: boolean;
};
export type ComponentMetadataMap = Record<string, ComponentMetadata>;

type MoveComponentArgs = {
	components: CMSComponentData[];
	componentId: string;
	parentComponentId: string | null;
	index: number;
	context: ComponentDragContext;
	metadata: ComponentMetadataMap;
};

export type ComponentInsertionArgs = {
	components: CMSComponentData[];
	component: CMSComponentData;
	parentComponentId: string | null;
	index: number;
	context: ComponentDragContext;
	metadata: ComponentMetadataMap;
	excludeComponentId?: string;
};

function findNode(nodes: CMSComponentData[], id: string): CMSComponentData | undefined {
	return findLocation(nodes, id)?.component;
}

function findLocation(
	nodes: CMSComponentData[],
	id: string,
): { component: CMSComponentData; index: number } | undefined {
	for (const [index, component] of nodes.entries()) {
		if (component.id === id) return { component, index };
		const nested = findLocation(component.childComponents, id);
		if (nested !== undefined) return nested;
	}
}

function contains(node: CMSComponentData, id: string): boolean {
	return node.id === id || node.childComponents.some((child) => contains(child, id));
}

function componentLabel(name: string, metadata: ComponentMetadataMap): string {
	return metadata[name]?.label ?? name;
}

export function getComponentDropError(args: MoveComponentArgs): string | null {
	const source = findNode(args.components, args.componentId);
	if (source === undefined) return 'The component to move no longer exists.';
	const parent = args.parentComponentId === null ? undefined : findNode(args.components, args.parentComponentId);
	if (args.parentComponentId !== null && parent === undefined) return 'The paste target no longer exists.';
	if (parent !== undefined && contains(source, parent.id))
		return 'A component cannot be moved inside itself or one of its descendants.';
	return getComponentInsertionError({ ...args, component: source, excludeComponentId: source.id });
}

export function isValidComponentDrop(args: MoveComponentArgs): boolean {
	return getComponentDropError(args) === null;
}

export function getComponentInsertionError(args: ComponentInsertionArgs): string | null {
	const parent = args.parentComponentId === null ? undefined : findNode(args.components, args.parentComponentId);
	if (args.parentComponentId !== null && parent === undefined) return 'The paste target no longer exists.';
	const componentLabelText = componentLabel(args.component.name, args.metadata);
	const componentMeta = args.metadata[args.component.name];
	if (componentMeta === undefined) return `${componentLabelText} is no longer available in this editor.`;
	const validParents = componentMeta.validParents ?? Object.keys(args.metadata);
	if (args.context === 'page' && componentMeta.layoutOnly)
		return `${componentLabelText} can only be placed in layouts.`;
	if (parent === undefined && componentMeta.validParents !== undefined) {
		const parentLabel = validParents.map((name) => componentLabel(name, args.metadata)).join(' or ');
		return `${componentLabelText} can only be placed inside ${parentLabel}.`;
	}
	if (parent !== undefined) {
		const parentMeta = args.metadata[parent.name];
		const parentLabel = componentLabel(parent.name, args.metadata);
		if (parentMeta === undefined) return `${parentLabel} cannot contain components.`;
		if (parentMeta.noChildren) return `${parentLabel} does not accept child components.`;
		if (!(parentMeta.validChildren ?? Object.keys(args.metadata)).includes(args.component.name)) {
			return `${parentLabel} does not accept ${componentLabelText} as a child.`;
		}
		if (!validParents.includes(parent.name)) {
			return `${componentLabelText} can only be placed inside ${validParents
				.map((name) => componentLabel(name, args.metadata))
				.join(' or ')}.`;
		}
	}
	const destination = parent?.childComponents ?? args.components;
	if (
		componentMeta.unique === true &&
		destination.some((node) => node.name === args.component.name && node.id !== args.excludeComponentId)
	)
		return `${parent === undefined ? (args.context === 'page' ? 'Page' : 'Layout') : componentLabel(parent.name, args.metadata)} already contains a ${componentLabelText}. Only one is allowed.`;
	if (!Number.isInteger(args.index) || args.index < 0 || args.index > destination.length)
		return 'The selected paste position is no longer available.';
	return null;
}

export function isValidComponentInsertion(args: ComponentInsertionArgs): boolean {
	return getComponentInsertionError(args) === null;
}

export function insertComponent(args: {
	components: CMSComponentData[];
	component: CMSComponentData;
	parentComponentId: string | null;
	index: number;
}): CMSComponentData[] {
	const { components, component, parentComponentId, index } = args;
	if (parentComponentId === null) return [...components.slice(0, index), component, ...components.slice(index)];
	return components.map((node) =>
		node.id === parentComponentId
			? {
					...node,
					childComponents: insertComponent({
						components: node.childComponents,
						component,
						parentComponentId: null,
						index,
					}),
				}
			: node.childComponents.some((child) => contains(child, parentComponentId))
				? {
						...node,
						childComponents: insertComponent({ components: node.childComponents, component, parentComponentId, index }),
					}
				: node,
	);
}

export function moveComponent(args: MoveComponentArgs): CMSComponentData[] {
	const location = findLocation(args.components, args.componentId);
	if (location === undefined) return args.components;
	if (!isValidComponentDrop(args)) return args.components;
	const { component: source, index: oldIndex } = location;
	const oldParentId = source.parentComponentId;
	if (oldParentId === args.parentComponentId && (oldIndex === args.index || oldIndex + 1 === args.index))
		return args.components;
	const remove = (nodes: CMSComponentData[]): CMSComponentData[] =>
		nodes.flatMap((node) => {
			if (node.id === source.id) return [];
			if (node.childComponents.some((child) => contains(child, source.id)))
				return [{ ...node, childComponents: remove(node.childComponents) }];
			return [node];
		});
	const adjustedIndex = oldParentId === args.parentComponentId && oldIndex < args.index ? args.index - 1 : args.index;
	const detached = { ...source, parentComponentId: args.parentComponentId };
	return insertComponent({
		components: remove(args.components),
		component: detached,
		parentComponentId: args.parentComponentId,
		index: adjustedIndex,
	});
}
