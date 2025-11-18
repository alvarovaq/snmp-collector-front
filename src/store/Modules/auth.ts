import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createSlice,ReducerCreators,Slice } from "@reduxjs/toolkit";
import { AuthState, User } from "models";

const initialState: AuthState = {
    token: localStorage.getItem("token"),
    user: null,
};

export const authSlice: Slice<AuthState> = createSlice({
    name: "auth",
    initialState,
    reducers: (create: ReducerCreators<AuthState>) => ({
        setToken: create.reducer<string>((state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        }),
        setUser: create.reducer<User>((state, action) => {
            state.user = action.payload;
        }),
        logout: create.reducer((state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        }),
    }),
});

const { setToken, setUser, logout } = authSlice.actions;

export const setTokenAction = setToken as ActionCreatorWithPayload<string>;
export const setUserAction = setUser as ActionCreatorWithPayload<User>;
export const logoutAction = logout as ActionCreatorWithoutPayload;

export const reducer = authSlice.reducer;