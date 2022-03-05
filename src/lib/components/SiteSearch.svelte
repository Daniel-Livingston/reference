<script lang="ts">
	import type { Page } from '$lib/types/pages';
	import Fuse from 'fuse.js';

	export let pages: Page[];

	const fuse = new Fuse(pages, { keys: ['title'], includeMatches: true });
	let value: string = '';

	$: searchResults = fuse.search(value);
	$: expanded = !!value;
	$: hasResults = searchResults.length > 0;
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
					<a class="result-item" href={result.item.href}>
						<div>{result.item.title}</div>
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
		border: 2px solid rgba(0, 0, 0, 0.2);
		border-radius: 100vw;
		display: flex;
		align-items: center;
		font: inherit;
		padding: 0.25rem 1rem;

		&:focus-within {
			box-shadow: 0 0 3px 3px blue;
		}
	}

	input {
		border: none;
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
		background-color: #fff;
		border: 2px solid rgba(0, 0, 0, 0.2);
		position: absolute;
		top: 125%;
		width: 100%;
	}

	.result-item {
		color: inherit;
		display: block;
		padding: 1em;
		text-decoration: none;
	}

	a.result-item:hover {
		background-color: #eee;
	}

	.result-item + .result-item {
		border-top: 2px solid rgba(0, 0, 0, 0.2);
	}
</style>
