<script lang="ts">
  import type { Navigate } from "~/types";
  import { fade } from "svelte/transition";

  export let navigate: Navigate;


  setTimeout(() => navigate("game"), 3000);
</script>

<div transition:fade={{duration: 1500}}>
    <p>- I -</p>
    <p>Blind</p>
</div>

<style>
    div {
        z-index: 10;

        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 3%;
    }

    p {
        font-size: 400%;
        font-weight: 300;
        color: white;
    }
</style>
