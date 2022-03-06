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

<div class="content-wrapper {$page.stuff.layout}">
	<slot />
</div>

<footer>
	<div class="footer-inner">This is a reference handbook made by Daniel Livingston.</div>
</footer>

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

	footer {
		background-color: var(--secondary-bg-color);
		border-top: var(--border);
		margin-top: 2rem;
	}

	.footer-inner {
		@include make-container('xxl');
		padding: 1rem;
	}
</style>
