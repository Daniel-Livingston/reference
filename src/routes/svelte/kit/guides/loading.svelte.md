---
title: Loading
layout: article
---

# {title}

A component that defines a **page or a layout** can export a `load` function that runs before the component is created. Runs both during SSR and CSR and allows you to fetch and manipulate data before the page is rendered.

```svelte
<script context="module">
	/** @type {import('./[slug]').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const url = `https://cms.example.com/article/${params.slug}.json`;
		const response = await fetch(url);

		return {
			status: response.status,
			props: {
				article: response.ok && (await response.json())
			}
		};
	}
</script>
```
