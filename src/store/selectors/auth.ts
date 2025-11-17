import { ReduxState } from "../";
import { User, Role } from "models";

export const selectToken = (state: ReduxState): string | null => state.auth.token;
export const selectUser = (state: ReduxState): User | null => state.auth.user;
export const selectIsAdmin = (state: ReduxState): boolean => state.auth.user?.role === Role.ADMIN;