<div class="article-wrapper">
	<main>
		<article>
			<slot />
		</article>
	</main>
</div>

<style lang="scss">
	.article-wrapper {
		@include make-container('xxl');
	}
</style>
