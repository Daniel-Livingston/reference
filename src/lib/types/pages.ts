export type Page = {
	id: number;
	href: string;
	title: string;
	breadcrumbs: { id: number; href: string; title: string }[];
};
