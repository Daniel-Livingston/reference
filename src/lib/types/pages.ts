export type Page = {
	id: number;
	href: string;
	breadcrumbs: Breadcrumb[];
	title?: string;
	layout?: string;
	type?: string;
};

export type Breadcrumb = {
	id: number;
	href: string;
	title?: string;
};
