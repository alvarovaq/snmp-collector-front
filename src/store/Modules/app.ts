import { ActionCreatorWithPayload, createSlice,ReducerCreators,Slice } from "@reduxjs/toolkit";
import { AppState, Page, } from "models";

const initialState: AppState = {
    page: Page.DASHBOARD
};

export const appStatusSlice: Slice<AppState> = createSlice({
    name: "app",
    initialState,
    reducers: (create: ReducerCreators<AppState>) => ({
        setPage: create.reducer<Page>((state, action) => {
            state.page = action.payload;
        }),
    }),
});

const { setPage } = appStatusSlice.actions;

export const setPageAction = setPage as ActionCreatorWithPayload<Page>;

export const reducer = appStatusSlice.reducer;