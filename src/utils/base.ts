import type { p5 } from "p5-svelte";
import type { GameState } from "~/state/interface";

type BaseState = Record<string, any>;

interface Dependency<S> {
  state: S;
  p5: p5;
}

// Dependency Injection with currying
type Reducer<S, B = GameState> = (deps: Dependency<B>) => (prev: S) => S;

type Spec<S extends BaseState, B> = {
  [K in keyof S]: Reducer<S[K], B>;
}

const objOf = <K extends string, V>(key: K, value: V) => ({ [key]: value });

export const spec = <S extends BaseState, B = GameState>(spec: Spec<S, B>): Reducer<S, B> =>
  ({ state, p5 }: Dependency<B>) => (prev: S) =>
    Object.entries(spec)
      .map(([key, reducer]) => objOf(key, reducer({ state, p5 })(prev)))
      .reduce((acc, curr) => ({ ...acc, ...curr })) as S;

export const map = <S extends BaseState, B = GameState>(reducer: Reducer<S, B>) =>
  ({ state, p5 }: Dependency<B>) => (prev: S[]) =>
    prev.map(reducer({ state, p5 }));
