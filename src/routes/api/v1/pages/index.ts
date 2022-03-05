import type { RequestHandler } from '@sveltejs/kit';
import type { Page } from '$lib/types/pages';

/**
 * Get a list of all the pages in the site.
 */
export const get: RequestHandler = async () => {
	const modules = import.meta.glob('../../../**/*.svelte(.md)?');
	const pages: Page[] = [];

	for (const path in modules) {
		const mod = await modules[path]();
		if (mod.metadata && mod.metadata.excludeFromSearch) continue;

		const href = path
			.replace('../../../', '/') // Get rid of the beginning of every route
			.replace(/.svelte(?:.md)?/, '') // Remove the file ending
			.replace(/index$/, '') // Change indexes to the base route
			.replace(/([^/])$/, '$1/'); // Add a trailing backslash

		if (href.match(/\/_/)) continue;

		pages.push({ href, title: mod.metadata ? mod.metadata.title : '' });
	}

	return {
		body: pages
	};
};
