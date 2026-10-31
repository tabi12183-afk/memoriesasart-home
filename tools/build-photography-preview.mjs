/**
 * The existing Sites host serves static files. This export renders and hydrates
 * the same editable React component used by Stormy's public route and editor;
 * it is a deployment adapter, never a second hand-authored page implementation.
 */
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const vitestRequire = createRequire(require.resolve('vitest/package.json'));
const { build } = await import(vitestRequire.resolve('vite'));
const output = resolve(root, 'dist');
const content = JSON.parse(
	await readFile(resolve(root, 'packages/components/src/lib/photography/content.json'), 'utf8'),
);
const origin = (process.env.SITE_ORIGIN || 'https://memories-as-art.photosbytabi.chatgpt.site').replace(/\/$/, '');
const escape = (value) =>
	String(value).replace(
		/[&<>"']/g,
		(char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
	);
await mkdir(output, { recursive: true });
await cp(resolve(root, 'apps/site/public/assets'), resolve(output, 'assets'), { recursive: true });
await writeFile(
	resolve(output, 'assets/photography.css'),
	(await readFile(resolve(root, 'packages/theme/theme.css'), 'utf8')) +
		'\n' +
		(await readFile(resolve(root, 'packages/components/dist/styles.css'), 'utf8')),
);
const common = {
	define: { 'process.env.NODE_ENV': JSON.stringify('production') },
	resolve: {
		alias: {
			'react': resolve(root, 'packages/components/node_modules/react'),
			'react-dom': resolve(root, 'packages/components/node_modules/react-dom'),
		},
	},
	configFile: false,
	root,
	logLevel: 'warn',
	oxc: { jsx: { runtime: 'automatic' } },
};
await build({
	...common,
	build: {
		outDir: 'dist/assets',
		emptyOutDir: false,
		lib: { entry: resolve(root, 'tools/preview/client.tsx'), formats: ['es'], fileName: () => 'photography.mjs' },
		minify: true,
		sourcemap: false,
	},
});
await build({
	...common,
	ssr: { noExternal: true },
	build: {
		outDir: '.preview-renderer',
		emptyOutDir: true,
		ssr: resolve(root, 'tools/preview/server.tsx'),
		rollupOptions: { output: { entryFileNames: 'server.mjs' } },
	},
});
const { render } = await import(pathToFileURL(resolve(root, '.preview-renderer/server.mjs')).href);
for (const [path, page] of Object.entries(content.pages)) {
	const directory = resolve(output, '.' + path);
	await mkdir(directory, { recursive: true });
	const canonical = origin + path;
	const schema = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'PhotographyBusiness',
		'name': 'Memories as Art Photography',
		'url': origin + '/',
		'areaServed': ['Greensburg, Pennsylvania', 'Westmoreland County, Pennsylvania', 'Pittsburgh, Pennsylvania'],
	}).replaceAll('<', '\\u003c');
	const html = `<!doctype html><html lang="en" class="site-root__html"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}"><meta name="robots" content="noindex,follow,max-image-preview:large"><link rel="canonical" href="${escape(canonical)}"><meta property="og:title" content="${escape(page.title)}"><meta property="og:description" content="${escape(page.description)}"><meta property="og:url" content="${escape(canonical)}"><meta property="og:image" content="${escape(origin + page.image)}"><link rel="icon" href="/assets/favicon.svg"><link rel="stylesheet" href="/assets/photography.css"><script type="application/ld+json">${schema}</script></head><body class="site-root__body"><div id="photography-preview" data-page-path="${escape(path)}">${render(path)}</div><script type="module" src="/assets/photography.mjs"></script></body></html>`;
	await writeFile(resolve(directory, 'index.html'), html);
}
for (const [from, to] of Object.entries(content.aliases || {})) {
	const directory = resolve(output, '.' + from);
	await mkdir(directory, { recursive: true });
	await writeFile(
		resolve(directory, 'index.html'),
		`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${escape(to)}"><title>Memories as Art</title><link rel="canonical" href="${escape(origin + to)}"></head><body><a href="${escape(to)}">Continue to Memories as Art</a></body></html>`,
	);
}
await cp(resolve(output, 'not-found/index.html'), resolve(output, '404.html'));
await writeFile(resolve(output, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
const sitemap = Object.entries(content.pages)
	.filter(([path, page]) => path !== '/not-found/' && !page.preview)
	.map(([path]) => `<url><loc>${escape(origin + path)}</loc></url>`)
	.join('');
await writeFile(
	resolve(output, 'sitemap.xml'),
	`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap}</urlset>`,
);
await rm(resolve(root, '.preview-renderer'), { recursive: true, force: true });
console.log(`Exported ${Object.keys(content.pages).length} pages from the shared native React photography component.`);
