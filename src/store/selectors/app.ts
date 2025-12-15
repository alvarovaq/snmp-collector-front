import { ReduxState } from "..";
import { Page } from "models";

export const selectPage = (state: ReduxState): Page => state.app.page;