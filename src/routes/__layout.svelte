<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { Page } from '$lib/types/pages';

	export const load: Load = async ({ fetch }) => {
		const response = await fetch('/api/v1/pages');

		return {
			props: {
				pages: response.ok && ((await response.json()) as Page[]),
				test: 'hello'
			}
		};
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import SiteSearch from '$lib/components/SiteSearch.svelte';
	import '../app.scss';

	export let pages: Page[];
	$: currentPage = pages.find((p) => p.href === $page.url.pathname);
</script>

<header>
	<nav class="main-nav">
		<div class="misc-wrapper">
			<SiteSearch {pages} />
		</div>
	</nav>
</header>

{#if currentPage}
	<nav class="breadcrumbs-container">
		<ol class="breadcrumbs" aria-label="breadcrumbs">
			{#each currentPage.breadcrumbs as pageId}
				{@const breadcrumbPage = pages[pageId - 1]}
				<li class="breadcrumb"><a href={breadcrumbPage.href}>{breadcrumbPage.title}</a></li>
			{/each}
		</ol>
	</nav>
{/if}

<slot />

<style lang="scss">
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

	.breadcrumbs-container {
		background: var(--secondary-bg-color);
		border-top: var(--border);
		border-bottom: var(--border);
		padding: 0.25rem 0;
	}

	.breadcrumbs {
		@include make-container('xxl');
		display: flex;
		list-style: none;
	}

	.breadcrumb + .breadcrumb {
		&::before {
			content: '>';
			margin: 0 1rem;
		}
	}

	.breadcrumb a {
		color: var(--accent-color);
	}
</style>
