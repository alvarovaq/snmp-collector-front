import { ReduxState } from "../";
import { User } from "models";

export const selectToken = (state: ReduxState): string | null => state.auth.token;
export const selectUser = (state: ReduxState): User | null => state.auth.user;