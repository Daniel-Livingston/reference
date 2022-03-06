<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { Page } from '$lib/types/pages';

	export const load: Load = async ({ fetch }) => {
		const response = await fetch('/api/v1/pages.json');

		return {
			props: {
				pages: response.ok && ((await response.json()) as Page[])
			}
		};
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import SiteSearch from '$lib/components/SiteSearch.svelte';
	import '../app.scss';

	export let pages: Page[];
	$: currentPage = pages.find((p) => p.href === $page.url.pathname);
</script>

<svelte:head>
	<title>{$page.stuff.title} | Handbook</title>
</svelte:head>

<a class="skip-link" href="#content">Skip to content</a>
<header>
	<nav class="main-nav">
		<div class="misc-wrapper">
			<SiteSearch {pages} />
		</div>
	</nav>
</header>

{#if currentPage}
	<Breadcrumbs page={currentPage} />
{/if}

<div class="article-wrapper">
	<slot />
</div>

<style lang="scss">
	.skip-link {
		@include visually-hidden-focusable();
		text-decoration: none;

		&:focus {
			box-shadow: var(--focus-shadow);
			color: var(--accent-color);
			padding: 1rem;
			position: absolute;
			top: 0.25rem;
			left: 0.25rem;
		}
	}

	header {
		padding: 1rem 0;
	}
	.main-nav {
		@include make-container('xxl');
		display: flex;
	}

	.misc-wrapper {
		margin-left: auto;
	}

	.article-wrapper {
		@include make-container('xxl');
		@include media-breakpoint-min('md') {
			display: grid;
			grid-template-areas: 'article toc';
			grid-template-columns: 1fr 15rem;
			gap: 2rem;
		}
	}
</style>
