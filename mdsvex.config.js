import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import slug from 'rehype-slug';
import toc from '@jsdevtools/rehype-toc';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],
	layout: {
		article: './src/lib/layouts/Article.svelte',
		archive: './src/lib/layouts/Archive.svelte'
	},

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [],
	rehypePlugins: [
		slug,
		() =>
			toc({
				nav: false,
				headings: ['h2'],
				customizeTOC: (toc) => {
					const aside = {
						type: 'element',
						tagName: 'aside',
						properties: { className: 'toc-container' },
						children: [toc]
					};
					return aside;
				}
			})
	]
});

export default config;
