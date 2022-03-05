<main>
	<article>
		<slot />
	</article>
</main>

<style lang="scss">
	main {
		grid-area: article;
	}

	:global(.toc-container) {
		grid-area: toc;
		padding: 3rem 1rem 1rem 1rem;
		position: relative;
	}

	:global(.toc) {
		position: -webkit-sticky;
		position: sticky;
		top: 3rem;
	}

	:global(h2:first-child) {
		margin-top: 3rem;
	}
</style>
