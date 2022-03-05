<script lang="ts">
	import { page } from '$app/stores';
</script>

<main>
	<article>
		<h1>{$page.stuff.title}</h1>
		<slot />
	</article>
</main>

<style lang="scss">
	.article-wrapper {
		@include make-container('xxl');
	}
</style>
