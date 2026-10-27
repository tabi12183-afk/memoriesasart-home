import { describe, expect, it } from 'vitest';
import { parseComponentClipboard } from '~/lib/component-clipboard-storage';

const component = {
	id: 'source',
	name: 'Group',
	props: { title: 'Copied' },
	attrs: {},
	parentComponentId: null,
	childComponents: [],
};

describe('stored component clipboard', () => {
	it('restores copied data and cut source identities', () => {
		const copy = { kind: 'copy', component };
		const cut = { kind: 'cut', component, sourceEditor: { id: 'page', context: 'page' } };
		expect(parseComponentClipboard(copy)).toEqual(copy);
		expect(parseComponentClipboard(cut)).toEqual(cut);
	});

	it.each([
		null,
		[],
		{ kind: 'unknown' },
		{ kind: 'copy', component: {} },
		{ kind: 'copy', component: { ...component, childComponents: [null] } },
		{ kind: 'copy', component: { ...component, props: 'invalid' } },
		{ kind: 'copy', component: { ...component, attrs: [] } },
		{ kind: 'copy', component: { ...component, attrs: { title: 12 } } },
		{ kind: 'copy', component: { ...component, id: 12 } },
		{ kind: 'cut', componentId: 'source' },
		{ kind: 'cut', component, sourceEditor: { id: 'page', context: 'invalid' } },
		{ kind: 'cut', componentId: 'source', sourceEditor: { id: 'page', context: 'page' } },
		{
			kind: 'cut',
			component: { ...component, childComponents: [null] },
			sourceEditor: { id: 'page', context: 'page' },
		},
	])('ignores invalid stored clipboard data: %j', (value) => {
		expect(parseComponentClipboard(value)).toBeNull();
	});
});
