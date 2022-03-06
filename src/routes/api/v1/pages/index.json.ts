import type { RequestHandler } from '@sveltejs/kit';
import type { Breadcrumb, Page } from '$lib/types/pages';

/**
 * Get a list of all the pages in the site.
 */
export const get: RequestHandler = async ({ url: { searchParams: params } }) => {
	const pages: Page[] = [];
	const modules = import.meta.glob('../../../**/*.svelte(.md)?');
	const sortedModules = sortModules(modules);

	let id = 1;
	const breadcrumbs: Breadcrumb[] = [];
	for (const { href, importFn } of sortedModules) {
		const { metadata } = await importFn();

		while (breadcrumbs.length > 0) {
			const prevBreadcrumb = breadcrumbs.pop();
			if (href.includes(prevBreadcrumb.href)) {
				breadcrumbs.push(prevBreadcrumb);
				break;
			}
		}

		const title = metadata && metadata.title;
		breadcrumbs.push({ id, href, title });
		const page = {
			id,
			href,
			title,
			breadcrumbs: [...breadcrumbs]
		};

		// If all pages are wanted, add to the pile no matter what
		if (!params.get('parent')) {
			pages.push(page);
			id++;
			continue;
		}

		const parentPattern = new RegExp(
			`^${decodeURIComponent(params.get('parent'))}(?=/[a-zA-Z])`,
			'i'
		);

		if (href.match(parentPattern)) {
			pages.push(page);
			id++;
		}
	}

	return {
		body: pages
	};
};

type ModuleMap = { href: string; importFn: () => Promise<{ [key: string]: any }> }[];

function sortModules(
	modules: Record<
		string,
		() => Promise<{
			[key: string]: any;
		}>
	>
): ModuleMap {
	const sortedModules: ModuleMap = [];
	for (const [filePath, importFn] of Object.entries(modules)) {
		const href = filePath
			.replace('../../../', '/') // Get rid of the beginning of every route
			.replace(/.svelte(?:.md)?/, '') // Remove the file ending
			.replace(/index$/, '')
			.replace(/(?<=\w)\/$/, ''); // Change indexes to the base route

		if (href.match(/\/_/)) continue;

		sortedModules.push({ href, importFn });
	}

	return sortedModules.sort((first, second) => {
		if (first.href < second.href) return -1;
		if (first.href > second.href) return 1;
		return 0;
	});
}
