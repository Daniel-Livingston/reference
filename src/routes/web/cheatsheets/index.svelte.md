---
title: Cheatsheets
layout: article
---

<script context="module">
  export async function load({ fetch, url }) {
    const response = await fetch('/api/v1/pages.json?parent=' + url.pathname);
    return {
      stuff: {
        title: 'Cheatsheets'
      },
      props: {
        pages: response.ok && (await response.json())
      }
    };
  }
</script>

<script lang="ts">
  export let pages;
</script>

# {title}

<ul>
  {#each pages as page}
    <li><a href={page.href}>{page.title}</a></li>
  {/each}
</ul>
