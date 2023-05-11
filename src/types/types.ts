import type { p5 } from "p5-svelte";

export type Next<T> = (p5: p5) => (state: T) => T;
