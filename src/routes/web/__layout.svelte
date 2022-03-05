<script lang="ts">
	import { page } from '$app/stores';
</script>

<main>
	<article>
		<h1>{$page.stuff.title}</h1>
		<slot />
	</article>
</main>
