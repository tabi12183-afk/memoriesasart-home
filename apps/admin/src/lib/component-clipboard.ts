import type { CMSComponentData, Placement } from '@stormycms/core';
import {
	insertComponent,
	getComponentDropError,
	getComponentInsertionError,
	moveComponent,
	type ComponentDragContext,
	type ComponentMetadataMap,
} from './component-drag';

export type ComponentClipboard =
	| { kind: 'copy'; component: CMSComponentData }
	| { kind: 'cut'; component: CMSComponentData; sourceEditor: { id: string; context: ComponentDragContext } }
	| null;

type PasteArgs = {
	components: CMSComponentData[];
	clipboard: Exclude<ComponentClipboard, null>;
	targetId: string;
	editorId: string;
	placement: Placement;
	context: ComponentDragContext;
	metadata: ComponentMetadataMap;
	createId: () => string;
};

type TargetLocation = { component: CMSComponentData; parentComponentId: string | null; index: number };

function locate(
	nodes: CMSComponentData[],
	targetId: string,
	parentComponentId: string | null = null,
): TargetLocation | null {
	for (const [index, component] of nodes.entries()) {
		if (component.id === targetId) return { component, parentComponentId, index };
		const nested = locate(component.childComponents, targetId, component.id);
		if (nested !== null) return nested;
	}
	return null;
}

function destination(args: Pick<PasteArgs, 'placement'>, target: TargetLocation) {
	if (args.placement === 'inside') {
		return { parentComponentId: target.component.id, index: target.component.childComponents.length };
	}
	return {
		parentComponentId: target.parentComponentId,
		index: target.index + (args.placement === 'after' ? 1 : 0),
	};
}

export function getPasteError(args: Omit<PasteArgs, 'createId'>): string | null {
	if (
		args.clipboard.kind === 'cut' &&
		(args.clipboard.sourceEditor.id !== args.editorId || args.clipboard.sourceEditor.context !== args.context)
	) {
		return 'This component was cut from another document. Return to its original editor to move it, or copy it to paste here.';
	}
	const target = locate(args.components, args.targetId);
	if (target === null) return 'The paste target no longer exists.';
	const slot = destination(args, target);
	if (args.clipboard.kind === 'cut') {
		return getComponentDropError({
			components: args.components,
			componentId: args.clipboard.component.id,
			...slot,
			context: args.context,
			metadata: args.metadata,
		});
	}
	return getComponentInsertionError({
		components: args.components,
		component: args.clipboard.component,
		...slot,
		context: args.context,
		metadata: args.metadata,
	});
}

export function canPasteComponent(args: Omit<PasteArgs, 'createId'>): boolean {
	return getPasteError(args) === null;
}

function cloneComponent(
	component: CMSComponentData,
	parentComponentId: string | null,
	createId: () => string,
): CMSComponentData {
	const id = createId();
	return {
		...component,
		id,
		parentComponentId,
		props: structuredClone(component.props),
		attrs: structuredClone(component.attrs),
		childComponents: component.childComponents.map((child) => cloneComponent(child, id, createId)),
	};
}

export function pasteComponent(args: PasteArgs): CMSComponentData[] {
	const target = locate(args.components, args.targetId);
	if (target === null) return args.components;
	if (!canPasteComponent(args)) return args.components;
	const slot = destination(args, target);
	if (args.clipboard.kind === 'cut') {
		return moveComponent({
			components: args.components,
			componentId: args.clipboard.component.id,
			...slot,
			context: args.context,
			metadata: args.metadata,
		});
	}
	const component = cloneComponent(args.clipboard.component, slot.parentComponentId, args.createId);
	return insertComponent({ components: args.components, component, ...slot });
}
