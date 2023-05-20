<script lang="ts">
  import { game } from "~/game";
  import type { State, Navigate } from "~/types";

  import Title from "~/pages/Game/Title.svelte";
  import Transition from "~/pages/Game/Transition.svelte";
  import Level from "~/pages/Game/Level.svelte";
  import { push } from "svelte-spa-router";
  import { levels } from "~/levels";

  import { DEBUG } from "~/constants";

  let state: State = DEBUG ? "game" : "title";
  const navigate: Navigate = newState => {
    state = newState;
  };

  export let params = {} as { level?: string };

  $: level = levels.at(parseInt(params.level) - 1);
  // if (!level) push("/");

  // $:.level) {}
  const next = () => {

    navigate("title");
    push(`/game/${parseInt(params.level) + 1}`);
  };

</script>

{#key `${params.level}-${state}`}
    {#if state === "title"}
        <Title {navigate} title={level.title} number={level.number}/>
    {:else if state === "game"}
        <Level {navigate} level={level.map}/>
    {:else if state === "restart"}
        <Transition {navigate}/>s
    {:else if state === "next"}
        <Transition {navigate} {next}/>
    {/if}
{/key}
