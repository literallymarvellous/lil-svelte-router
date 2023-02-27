<script>
  import { onMount } from "svelte";

  export let shopId;
  export let itemId;

  // let timer = 0;
  // onMount(() => {
  //   setInterval(() => {
  //     timer++
  //   }, 1000)
  // })
</script>

<h1>Shop {shopId}</h1>
<h2>Item {itemId}</h2>

<a href="/item/2/3">Go to shop 2, item 3</a>

<!-- {timer} -->