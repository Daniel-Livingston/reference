<script>
	import '../app.scss';
</script>

<div class="article-wrapper">
	<main>
		<article>
			<slot />
		</article>
	</main>
</div>

<style lang="scss">
	.article-wrapper {
		@include media-breakpoint-min('xl') {
		}
	}
</style>
