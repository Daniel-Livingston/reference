---
title: Getting started
layout: article
---

<script context="module">
  export function load() {
    return {
      stuff: {
        title: 'Getting Started - SvelteKit',
        layout: 'article'
      }
    };
  }
</script>

<script lang="ts">
  import Alert from '$lib/components/Alert.svelte';
</script>

# {title}

## Installation

Run the following commands:

```bash
npm init svelte@next my-app
cd my-app
npm install
npm run dev -- --open
```

## Changing the adapter

Say you wanted to change the adapter to `@sveltejs/adapter-static`. Run the following command:

```bash
npm i --save-dev @sveltejs/adapter-static@next
```

In the `svelte.config.js` file, make the following changes:

```git
-import adapter from '@sveltejs/adapter-auto';
+import adapter from '@sveltejs/adapter-static';
```

<Alert>
  <p>Many adapters are supported automatically by <code>adapter-auto</code>. These include the following:</p>

  <ul>
    <li><code>adapter-cloudflare</code></li>
    <li><code>adapter-netlify</code></li>
    <li><code>adapter-vercel</code></li>
  </ul>
</Alert>

## Adding path aliases

First, add the path alias to `svelte.config.js`:

```git
+import { resolve } from 'path';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
+   vite: {
+     resolve: {
+       alias: {
+         $components: path.resolve('./src/lib/components')
+       }
+     }
+   }
	}
};

export default config;

```

Then, add the path to `tsconfig.json`.

```git
{
  "extends": "./.svelte-kit/tsconfig.json",
+ "compilerOptions": {
+   "paths": {
+     "$components": ["src/components"],
+     "$components/*": ["src/components/*]
+   }
  }
}
```

<Alert>
  <p><code>$lib</code> is included as an alias by default.</p>
</Alert>
