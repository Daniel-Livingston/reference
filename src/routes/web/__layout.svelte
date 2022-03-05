<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="article-wrapper">
	<main>
		<article>
			<h1>{$page.stuff.title}</h1>
			<slot />
		</article>
	</main>
</div>

<style lang="scss">
	.article-wrapper {
		@include make-container('xxl');
	}
</style>
