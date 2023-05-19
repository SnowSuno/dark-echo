export type State = "title" | "game" | "restart" | "next";
export type Navigate = (state: State) => void;
