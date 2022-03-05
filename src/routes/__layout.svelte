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
	import SiteSearch from '$lib/components/SiteSearch.svelte';
	import '../app.scss';

	export let pages: Page[];
</script>

<header>
	<nav>
		<div class="misc-wrapper">
			<SiteSearch {pages} />
		</div>
	</nav>
</header>

<slot />

<style lang="scss">
	nav {
		@include make-container('xxl');
		display: flex;
	}

	.misc-wrapper {
		margin-left: auto;
	}
</style>
