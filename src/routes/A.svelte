<script>
  let showMoreLinks = false
</script>

<h1>A</h1>

<input type="checkbox" bind:checked={showMoreLinks}>

<a href="/b">Go to B</a>

{#if showMoreLinks}
  <a href="/c">Go to C</a>
{/if}