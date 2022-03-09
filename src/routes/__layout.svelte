<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { Page } from '$lib/types/pages';

	export const load: Load = async ({ fetch }) => {
		const response = await fetch('/api/v1/pages');
		const data = await response.json();

		if (response.ok) {
			return { status: 200, props: { pages: data.pages } };
		} else {
			return { status: 400, props: { pages: [] } };
		}
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { setContext } from 'svelte';

	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';

	import '../app.scss';

	export let pages: Page[];
	$: currentPage = pages.find((p) => p.href === $page.url.pathname);

	setContext('pages', { all: pages, current: currentPage });
</script>

<Header />

<div class="content-wrapper {currentPage.layout}">
	<slot />
</div>

<Footer />
