<script lang="ts">
  import Router from "svelte-spa-router";
  import { Main, Levels, Game } from "~/pages";


  const routes = {
    "/": Main,
    "/levels": Levels,
    "/game/:level": Game,
  };
</script>

<Router {routes}/>
