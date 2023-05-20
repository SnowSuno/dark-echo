<script lang="ts">
  import { fade } from "svelte/transition";
  import P5 from "p5-svelte";

  import type { Navigate } from "~/types";
  import { game } from "~/game/index.js";
  import type { LazyMap } from "~/utils/map";

  export let navigate: Navigate;
  export let level: LazyMap;

  // let sketch;
  // onMount(() => {
  //   console.log(level);
  //   if (level) sketch = game(navigate, level);
  // });

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
    <P5 sketch={game(navigate, level)}/>
</main>
