<script lang="ts">
  import { fade } from "svelte/transition";
  import P5, { type Sketch } from "p5-svelte";

  import type { Navigate } from "~/types";
  import { game } from "~/game/index.js";
  import { onDestroy, onMount } from "svelte";

  export let navigate: Navigate;
  export let level: number;

  let sketch = game(navigate, level);
  // onDestroy(() => {
  //   delete this.sketch;
  //   // sketch = undefined;
  // });

  //
  // onMount(() => {
  //   sketch =
  // });

</script>

<main in:fade={{delay: 1200, duration: 1000}}>
    <P5 {sketch}/>
</main>
