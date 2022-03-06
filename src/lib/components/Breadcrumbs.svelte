<script lang="ts">
	import type { Page } from '$lib/types/pages';

	export let page: Page;
</script>

<nav class="breadcrumbs-container">
	<ol class="breadcrumbs" aria-label="breadcrumbs">
		{#each page.breadcrumbs as { id, title, href }}
			{#if page.id === id}
				<li class="breadcrumb">{title}</li>
			{:else}
				<li class="breadcrumb">
					<a {href}>{title}</a>
				</li>
			{/if}
		{/each}
	</ol>
</nav>

<style lang="scss">
	.breadcrumbs-container {
		background: var(--secondary-bg-color);
		border-top: var(--border);
		border-bottom: var(--border);
		padding: 0.25rem 0;
	}

	.breadcrumbs {
		@include make-container('xxl');
		display: flex;
		flex-wrap: wrap;
		list-style: none;
	}

	.breadcrumb + .breadcrumb {
		&::before {
			content: '>';
			margin: 0 1rem;
		}
	}

	.breadcrumb a {
		@include make-link();
	}
</style>
