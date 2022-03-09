<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const metadata = {
		title: 'Search',
		layout: 'article',
		excludeFromSearch: true
	};

	export const load: Load = async ({ fetch, url }) => {
		const response = await fetch('/api/v1/pages?q=' + url.searchParams.get('q'));
		const data = await response.json();

		return { status: 200, props: { ...data } };
	};
</script>

<script lang="ts">
	import Article from '$lib/layouts/Article.svelte';
	import type { Page } from '$lib/types/pages';

	export let pages: Page[];
	export let q: string;
</script>

<Article>
	<h1>Search results for <em>"{q}"</em></h1>
	{#if pages.length > 0}
		<ul>
			{#each pages as { title, href }}
				<li>
					<h2><a {href}>{title}</a></h2>
					<p><a {href}>{href}</a></p>
				</li>
			{/each}
		</ul>
	{/if}
</Article>

<style lang="scss">
	li {
		padding: 1rem 0;
	}

	h2 {
		margin: 0;
	}

	a:focus {
		box-shadow: var(--focus-shadow);
		outline: none;
	}

	h2 > a {
		color: var(--primary-color);
	}

	p > a {
		color: var(--accent-color);
	}
</style>
