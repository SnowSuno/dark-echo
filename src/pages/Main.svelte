<script>
  import { link } from "svelte-spa-router";
</script>

<div>
    <h1>DARK ECHO</h1>
    <a href="/game/1" use:link>start</a>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        color: white;
    }
    h1 {
        font-size: 5rem;
        margin-bottom: 2rem;
    }
    a {
        font-size: 2.2rem;
        padding: 1rem 2rem;
        border: 1px solid #000;
        border-radius: 5px;
        text-decoration: none;
        color: white;
        font-weight: 300;
    }

    a:hover {
        text-decoration: underline;
    }
</style>
