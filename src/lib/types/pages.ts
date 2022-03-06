export type Page = {
	id: number;
	href: string;
	breadcrumbs: { id: number; href: string; title: string }[];
	title?: string;
};
