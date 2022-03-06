import type { RequestHandler } from '@sveltejs/kit';
import type { Page } from '$lib/types/pages';

/**
 * Get a list of all the pages in the site.
 */
export const get: RequestHandler = async ({ url: { searchParams: params } }) => {
	const modules = import.meta.glob('../../../**/*.svelte(.md)?');
	const pages: Page[] = [];

	let id = 1;
	const breadcrumbs: { id: number; title: string; href: string }[] = [];

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
			const lastBreadcrumb = breadcrumbs.pop();
			if (href.includes(lastBreadcrumb.href)) {
				breadcrumbs.push(lastBreadcrumb);
				break;
			}
		}

		const title = mod.metadata && mod.metadata.title;

		breadcrumbs.push({ id, href, title });
		if (params.get('parent')) {
			const parentPattern = new RegExp(
				`^${decodeURIComponent(params.get('parent'))}(?=/[a-zA-Z])`,
				'i'
			);
			if (href.match(parentPattern)) {
				pages.push({
					id,
					href,
					title,
					breadcrumbs: [...breadcrumbs]
				});
			}
		} else {
			pages.push({
				id,
				href,
				title,
				breadcrumbs: [...breadcrumbs]
			});
		}
		id++;
	}

	return {
		body: pages
	};
};
