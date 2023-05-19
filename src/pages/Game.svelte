<script lang="ts">
  import { fade } from "svelte/transition";
  import P5 from "p5-svelte";
  import { game } from "~/game";
  import type { State, Navigate } from "~/types";

  import Title from "~/pages/Game/Title.svelte";
  import Transition from "~/pages/Game/Transition.svelte";

  let state: State = "title";
  const navigate: Navigate = newState => {
    state = newState;
  };

  export let params = {};
</script>

{#key state}
    {#if state === "title"}
        <Title {navigate}/>
    {:else if state === "game"}
        <main in:fade={{delay: 1200, duration: 1000}}>
            <P5 sketch={game(navigate, params.level)}/>
        </main>
    {:else if state === "restart"}
        <Transition {navigate}/>
    {:else if state === "next"}
        <Transition {navigate} next/>
    {/if}
{/key}
