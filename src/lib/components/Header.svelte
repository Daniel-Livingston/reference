<script lang="ts">
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import SiteSearch from '$lib/components/SiteSearch.svelte';
	import type { Page } from '$lib/types/pages';

	let { all: pages, current }: { all: Page[]; current: Page } = getContext('pages');
	$: current = pages.find((p) => p.href === $page.url.pathname);
</script>

<svelte:head>
	<title>{current.title} | Handbook</title>
</svelte:head>

<a class="skip-link" href="#content">Skip to content</a>
<header>
	<nav class="main-nav">
		<div class="misc-wrapper">
			<SiteSearch />
		</div>
	</nav>
</header>

{#if current}
	<Breadcrumbs page={current} />
{/if}

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
</style>
