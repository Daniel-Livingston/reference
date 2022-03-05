import type { RequestHandler } from '@sveltejs/kit';
import type { Page } from '$lib/types/pages';

/**
 * Get a list of all the pages in the site.
 */
export const get: RequestHandler = async () => {
	const modules = import.meta.glob('../../../**/*.svelte(.md)?');
	const pages: Page[] = [];

	let id = 1;
	const breadcrumbs = [];

	for (const path in modules) {
		const mod = await modules[path]();
		if (mod.metadata && mod.metadata.excludeFromSearch) continue;

		const href = path
			.replace('../../../', '/') // Get rid of the beginning of every route
			.replace(/.svelte(?:.md)?/, '') // Remove the file ending
			.replace(/index$/, '')
			.replace(/(?<=\w)\/$/, ''); // Change indexes to the base route

		if (href.match(/\/_/)) continue;

		while (breadcrumbs.length > 0) {
			const lastBreadcrumbId = breadcrumbs.pop();
			const lastBreadcrumbIndex = lastBreadcrumbId - 1;
			if (href.includes(pages[lastBreadcrumbIndex].href)) {
				breadcrumbs.push(lastBreadcrumbId);
				break;
			}
		}

		pages.push({ id, href, title: mod.metadata.title, breadcrumbs: [...breadcrumbs] });
		breadcrumbs.push(id);
		id++;
	}

	return {
		body: pages
	};
};
