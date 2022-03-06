export type Page = {
	id: number;
	href: string;
	breadcrumbs: Breadcrumb[];
	title?: string;
};

export type Breadcrumb = {
	id: number;
	href: string;
	title?: string;
};
