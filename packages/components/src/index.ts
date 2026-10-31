import { Outlet, withCMS, type CMSExportsMap } from '@stormycms/react/cms';
import { CallToAction } from './lib/call-to-action';
import { Card, CardGroup } from './lib/card';
import { Figure } from './lib/figure';
import { Group } from './lib/group';
import { Heading } from './lib/heading';
import { Hero } from './lib/hero';
import { Image } from './lib/image';
import { Navigation } from './lib/navigation';
import { MemoriesPortfolio } from './lib/photography/memories-portfolio';
import { memoriesPagePaths } from './lib/photography/content';

export { MemoriesPortfolio, safeMediaUrl } from './lib/photography/memories-portfolio';
export type { MemoriesPortfolioProps } from './lib/photography/memories-portfolio';
export { photographyContent, memoriesPages, memoriesPagePaths } from './lib/photography/content';
export type { MemoriesPage, PhotographyContent } from './lib/photography/content';
import { Region, RegionAside, RegionFooter, RegionHeader, RegionMain } from './lib/region';
import { RichText } from './lib/rich-text';
import { Section } from './lib/section';
import { SiteInfo } from './lib/site-info';
import { Text } from './lib/text';
import { ThemeToggle } from './lib/theme-toggle';

export default {
	MemoriesPortfolio: withCMS(
		{
			export: 'MemoriesPortfolio',
			label: 'Memories as Art Portfolio',
			fields: [
				{ prop: 'pagePath', label: 'Page collection', field: 'select', options: memoriesPagePaths, defaultValue: '/' },
				{ prop: 'heading', label: 'Heading', field: 'input', defaultValue: '' },
				{ prop: 'intro', label: 'Introduction', field: 'textarea', defaultValue: '' },
				{ prop: 'heroImage', label: 'Hero photograph or video poster', field: 'image', defaultValue: '' },
				{ prop: 'heroVideo', label: 'Hero video URL', field: 'input', defaultValue: '' },
				{
					prop: 'galleryImages',
					label: 'Gallery photographs (URL | description, one per line)',
					field: 'textarea',
					defaultValue: '',
				},
				{ prop: 'clientGalleryUrl', label: 'Client gallery provider URL', field: 'input', defaultValue: '' },
			],
			noChildren: true,
		},
		MemoriesPortfolio,
	),
	Group: withCMS(
		{
			export: 'Group',
			label: 'Group',
			fields: [
				{
					label: 'Density',
					prop: 'density',
					field: 'radio',
					options: ['default', 'compact'],
					required: false,
					defaultValue: 'default',
				},
			],
		},
		Group,
	),
	Section: withCMS(
		{
			export: 'Section',
			label: 'Section',
			fields: [
				{
					label: 'Label',
					prop: 'label',
					field: 'input',
					required: false,
					defaultValue: '',
				},
			],
			validChildren: [
				'MemoriesPortfolio',
				'Heading',
				'Text',
				'RichText',
				'Image',
				'Figure',
				'CallToAction',
				'Group',
				'Card',
				'CardGroup',
				'Hero',
				'ThemeToggle',
			],
		},
		Section,
	),
	Heading: withCMS(
		{
			export: 'Heading',
			label: 'Heading',
			fields: [
				{
					label: 'Text',
					prop: 'text',
					field: 'input',
					required: true,
					defaultValue: 'Heading',
				},
				{
					label: 'Level',
					prop: 'level',
					field: 'select',
					options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
					required: false,
					defaultValue: 'h2',
				},
			],
			noChildren: true,
		},
		Heading,
	),
	Text: withCMS(
		{
			export: 'Text',
			label: 'Text',
			fields: [
				{
					label: 'Content',
					prop: 'content',
					field: 'textarea',
					required: true,
					defaultValue: 'Add body copy.',
				},
			],
			noChildren: true,
		},
		Text,
	),
	RichText: withCMS(
		{
			export: 'RichText',
			label: 'Rich Text',
			fields: [
				{
					label: 'Content',
					prop: 'content',
					// Runtime value is "markdown"; the cast keeps compatibility until the
					// next @stormycms/core release containing the new field union is installed.
					field: 'markdown' as 'textarea',
					required: true,
					defaultValue: 'Add **rich** text with [links](https://example.com).',
				},
			],
			noChildren: true,
		},
		RichText,
	),
	Image: withCMS(
		{
			export: 'Image',
			label: 'Image',
			fields: [
				{
					label: 'Image',
					prop: 'image',
					field: 'image',
					required: false,
					defaultValue: '',
				},
			],
			noChildren: true,
		},
		Image,
	),
	Figure: withCMS(
		{
			export: 'Figure',
			label: 'Figure',
			fields: [
				{
					label: 'Image',
					prop: 'image',
					field: 'image',
					required: false,
					defaultValue: '',
				},
				{
					// Answering this picks the framing. Nothing here names a border,
					// a corner or a shadow, so the whole site can be restyled later
					// without anyone revisiting their images.
					label: 'What does this show?',
					prop: 'depicts',
					field: 'select',
					options: ['photograph', 'illustration', 'screenshot', 'diagram', 'portrait', 'logo'],
					required: false,
					defaultValue: 'photograph',
				},
				{
					label: 'Does it carry meaning?',
					prop: 'role',
					field: 'radio',
					options: ['informative', 'decorative'],
					required: false,
					defaultValue: 'informative',
				},
				{
					label: 'Caption',
					prop: 'caption',
					field: 'input',
					required: false,
					defaultValue: '',
				},
				{
					label: 'Credit',
					prop: 'credit',
					field: 'input',
					required: false,
					defaultValue: '',
				},
			],
			noChildren: true,
		},
		Figure,
	),
	ThemeToggle: withCMS(
		{
			export: 'ThemeToggle',
			label: 'Theme Toggle',
			fields: [
				{
					label: 'Label',
					prop: 'label',
					field: 'input',
					required: false,
					defaultValue: 'Dark mode',
				},
			],
			noChildren: true,
		},
		ThemeToggle,
	),
	CallToAction: withCMS(
		{
			export: 'CallToAction',
			label: 'Call to Action',
			fields: [
				{
					label: 'Label',
					prop: 'label',
					field: 'input',
					required: true,
					defaultValue: 'Learn More',
				},
				{
					label: 'Link URL',
					prop: 'href',
					field: 'input',
					required: true,
					defaultValue: '/',
				},
				{
					label: 'Priority',
					prop: 'priority',
					field: 'select',
					options: ['primary', 'secondary'],
					required: false,
					defaultValue: 'primary',
				},
			],
			noChildren: true,
		},
		CallToAction,
	),
	Card: withCMS(
		{
			export: 'Card',
			label: 'Card',
			fields: [
				{
					label: 'Title',
					prop: 'title',
					field: 'input',
					required: false,
					defaultValue: '',
				},
			],
			validChildren: ['Heading', 'Text', 'RichText', 'Image', 'Figure', 'CallToAction'],
		},
		Card,
	),
	CardGroup: withCMS(
		{
			export: 'CardGroup',
			label: 'Card Group',
			fields: [],
			validChildren: ['Card'],
		},
		CardGroup,
	),
	Hero: withCMS(
		{
			export: 'Hero',
			label: 'Hero',
			fields: [
				{
					label: 'Background Image',
					prop: 'backgroundImage',
					field: 'image',
					required: false,
				},
				{ label: 'Title', prop: 'title', field: 'input', required: true, defaultValue: 'A clear, meaningful promise' },
				{ label: 'Subtitle', prop: 'subtitle', field: 'textarea', required: false, defaultValue: '' },
				{ label: 'Action Label', prop: 'actionLabel', field: 'input', required: false, defaultValue: 'Learn More' },
				{ label: 'Action Link', prop: 'actionHref', field: 'input', required: false, defaultValue: '/' },
			],
			noChildren: true,
		},
		Hero,
	),
	Region: withCMS(
		{
			export: 'Region',
			label: 'Region',
			// No fields: whether a region fills the screen is decided by whether it
			// stands alone, not by an author checkbox. Saved content that still
			// carries the old `page` prop is ignored harmlessly.
			fields: [],
			validChildren: ['RegionHeader', 'RegionAside', 'RegionMain', 'RegionFooter'],
		},
		Region,
	),
	// Region slots are singletons: a region holds 0 or 1 of each. `unique` is
	// attached via Object.assign until the next @stormycms/react release adds
	// it to the withCMS config options.
	RegionHeader: Object.assign(
		withCMS(
			{
				export: 'RegionHeader',
				label: 'Region Header',
				fields: [],
				validParents: ['Region'],
			},
			RegionHeader,
		),
		{ unique: true },
	),
	RegionAside: Object.assign(
		withCMS(
			{
				export: 'RegionAside',
				label: 'Region Aside',
				fields: [],
				validParents: ['Region'],
			},
			RegionAside,
		),
		{ unique: true },
	),
	RegionMain: Object.assign(
		withCMS(
			{
				export: 'RegionMain',
				label: 'Region Main',
				fields: [],
				validParents: ['Region'],
			},
			RegionMain,
		),
		{ unique: true },
	),
	RegionFooter: Object.assign(
		withCMS(
			{
				export: 'RegionFooter',
				label: 'Region Footer',
				fields: [],
				validParents: ['Region'],
			},
			RegionFooter,
		),
		{ unique: true },
	),
	Navigation: withCMS(
		{
			export: 'Navigation',
			label: 'Navigation',
			fields: [
				{
					label: 'Links',
					prop: 'links',
					field: 'keyValueList',
					required: false,
					defaultValue: '',
				},
				{
					// Screen readers announce this to distinguish one navigation from
					// another when a page has several. It is never shown on screen.
					label: 'What is this menu for?',
					prop: 'purpose',
					field: 'input',
					required: false,
					defaultValue: 'Main',
				},
			],
			noChildren: true,
		},
		Navigation,
	),
	SiteInfo: withCMS(
		{
			export: 'SiteInfo',
			label: 'Site Info',
			fields: [
				{
					label: 'Organization',
					prop: 'organization',
					field: 'input',
					required: false,
					defaultValue: '',
				},
				{
					label: 'Email',
					prop: 'email',
					field: 'input',
					required: false,
					defaultValue: '',
				},
				{
					label: 'Phone',
					prop: 'phone',
					field: 'input',
					required: false,
					defaultValue: '',
				},
				{
					label: 'Address',
					prop: 'address',
					field: 'input',
					required: false,
					defaultValue: '',
				},
				{
					label: 'Links',
					prop: 'links',
					field: 'keyValueList',
					required: false,
					defaultValue: '',
				},
			],
			noChildren: true,
		},
		SiteInfo,
	),
	Outlet,
} satisfies CMSExportsMap;
