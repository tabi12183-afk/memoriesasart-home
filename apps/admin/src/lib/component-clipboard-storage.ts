import type { CMSComponentData } from '@stormycms/core';
import type { ComponentClipboard } from './component-clipboard';
import type { ComponentDragContext } from './component-drag';

export const COMPONENT_CLIPBOARD_STORAGE_KEY = 'stormycms:component-clipboard:v1';

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isCMSComponentData(value: unknown): value is CMSComponentData {
	if (!isRecord(value)) return false;
	return (
		typeof value.id === 'string' &&
		typeof value.name === 'string' &&
		isRecord(value.props) &&
		isRecord(value.attrs) &&
		Object.values(value.attrs).every((attribute) => typeof attribute === 'string') &&
		(value.parentComponentId === null || typeof value.parentComponentId === 'string') &&
		Array.isArray(value.childComponents) &&
		value.childComponents.every(isCMSComponentData)
	);
}

function isComponentDragContext(value: unknown): value is ComponentDragContext {
	return value === 'page' || value === 'layout';
}

export function parseComponentClipboard(value: unknown): ComponentClipboard {
	if (!isRecord(value)) return null;
	if (value.kind === 'copy' && isCMSComponentData(value.component)) {
		return { kind: 'copy', component: value.component };
	}
	if (
		value.kind === 'cut' &&
		isCMSComponentData(value.component) &&
		isRecord(value.sourceEditor) &&
		typeof value.sourceEditor.id === 'string' &&
		isComponentDragContext(value.sourceEditor.context)
	) {
		return {
			kind: 'cut',
			component: value.component,
			sourceEditor: { id: value.sourceEditor.id, context: value.sourceEditor.context },
		};
	}
	return null;
}
