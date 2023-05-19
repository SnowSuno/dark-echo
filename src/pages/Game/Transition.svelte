<script lang="ts">
  import { fade } from "svelte/transition";
  import type { Navigate } from "~/types";

  export let next: boolean = false;
  export let navigate: Navigate;

  setTimeout(() => navigate("game"), 1000);
</script>

<div
        out:fade={{duration: 1500}}
        style="background-color: {next ? 'white' : 'red'}"
></div>

<style>
    div {
        z-index: 10;

        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        opacity: 0.8;
    }
</style>
