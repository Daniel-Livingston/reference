<script lang="ts">
	import { getContext } from 'svelte';
	import type { Page } from '$lib/types/pages';
	import Fuse from 'fuse.js';

	let { all: pages }: { all: Page[]; current: Page } = getContext('pages');

	const fuse = new Fuse(pages, {
		keys: [
			{ name: 'title', weight: 2 },
			{ name: 'tags', weight: 1 }
		],
		includeMatches: true
	});
	let value: string = '';

	$: searchResults = fuse.search(value).slice(0, 10);
	$: expanded = !!value;
	$: hasResults = searchResults.length > 0;

	function clearSearchField() {
		value = '';
	}

	function changeFocusOnArrows(e: KeyboardEvent) {
		const menu = document.querySelector('#site-search-menu');
		const node = <HTMLElement>e.target;
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			const firstResult = <HTMLElement>menu.querySelector('.result-item');
			if (node.classList.contains('result-item')) {
				const nextResult = <HTMLElement>node.nextSibling;
				return nextResult ? nextResult.focus() : firstResult.focus();
			} else {
				return firstResult.focus();
			}
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			const lastResult = <HTMLElement>menu.querySelector('.result-item:last-child');
			if (node.classList.contains('result-item')) {
				const previousResult = <HTMLElement>node.previousSibling;
				return previousResult ? previousResult.focus() : lastResult.focus();
			} else {
				return lastResult.focus();
			}
		}
	}
</script>

<form
	id="site-search-form"
	class:expanded
	class:has-results={hasResults}
	action="/search?q={value}"
	method="get"
	role="search"
	aria-haspopup="listbox"
	aria-owns="site-search-menu"
	aria-expanded={expanded}
	on:keydown={changeFocusOnArrows}
>
	<label id="site-search-label" class="search-input-wrapper">
		<input
			type="search"
			id="site-q"
			name="q"
			placeholder="Search... "
			aria-autocomplete="list"
			aria-controls="site-search-menu"
			required
			bind:value
		/>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			class="search-icon"
			fill="currentColor"
			viewBox="0 0 16 16"
			aria-hidden="true"
		>
			<path
				d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
			/>
		</svg>
	</label>

	<div id="site-search-menu" class="search-menu" role="listbox" aria-labelledby="site-search-label">
		{#if expanded && hasResults}
			<div class="search-results">
				{#each searchResults as result}
					<a class="result-item" href={result.item.href} on:click={clearSearchField}>
						<div class="result-item-title">{result.item.title}</div>
						<div class="result-item-breadcrumbs">
							{#each result.item.breadcrumbs as breadcrumb}
								<span class="result-item-breadcrumb">{breadcrumb.title}</span>
							{/each}
						</div>
					</a>
				{/each}
			</div>
		{:else if expanded}
			<div class="result-item">No documents found.</div>
		{/if}
	</div>
</form>

<style lang="scss">
	form {
		position: relative;
	}

	.search-input-wrapper {
		background: var(--secondary-bg-color);
		border: var(--border);
		border-radius: 100vw;
		display: flex;
		align-items: center;
		font: inherit;
		padding: 0.25rem 1rem;

		&:focus-within {
			box-shadow: var(--focus-shadow);
		}
	}

	input {
		background: none;
		border: none;
		color: inherit;
		width: calc(100% - 1rem);
		font: inherit;
		outline: none;
	}

	.search-icon {
		display: block;
		height: auto;
		width: 1rem;
	}

	.expanded > .search-menu {
		background-color: var(--secondary-bg-color);
		border: var(--border);
		border-radius: 0.25rem;
		position: absolute;
		top: 125%;
		width: 100%;
		z-index: 1000;
	}

	.result-item {
		color: inherit;
		display: block;
		font-weight: 500;
		padding: 1em;
		text-decoration: none;
	}

	a.result-item:hover {
		background-color: var(--secondary-hover-bg-color);
	}

	a.result-item:focus {
		box-shadow: var(--focus-shadow);
	}

	.result-item + .result-item {
		border-top: var(--border);
	}

	.result-item-breadcrumbs {
		font-size: 0.9rem;
		margin-top: 0.5rem;
		opacity: 0.5;
		display: flex;
		flex-wrap: wrap;
	}

	.result-item-breadcrumb + .result-item-breadcrumb {
		&::before {
			content: '>';
			margin: 0 0.25rem;
		}
	}
</style>
