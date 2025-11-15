import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createSlice,ReducerCreators,Slice } from "@reduxjs/toolkit";
import { AuthState } from "models";

const initialState: AuthState = {
    token: localStorage.getItem("token"),
};

export const authSlice: Slice<AuthState> = createSlice({
    name: "auth",
    initialState,
    reducers: (create: ReducerCreators<AuthState>) => ({
        setToken: create.reducer<string>((state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        }),
        logout: create.reducer((state) => {
            state.token = null;
            localStorage.removeItem("token");
        }),
    }),
});

const { setToken, logout } = authSlice.actions;

export const setTokenAction = setToken as ActionCreatorWithPayload<string>;
export const logoutAction = logout as ActionCreatorWithoutPayload;

export const reducer = authSlice.reducer;