<main id="content">
	<article>
		<slot />
	</article>
</main>

<style lang="scss">
	@use '../scss/abstracts/mixins' as *;

	:global(.content-wrapper) {
		@include make-container('xxl');
		@include media-breakpoint-min('md') {
			display: grid;
			grid-template-areas: 'article toc';
			grid-template-columns: 1fr 15rem;
			gap: 2rem;
		}
	}

	main {
		grid-area: article;
	}

	article > :global(*) {
		margin-bottom: 0;
	}

	article > :global(* + *) {
		margin-top: 1.75em;
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
</style>
