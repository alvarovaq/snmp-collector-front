import { ActionCreatorWithPayload, createSlice,ReducerCreators,Slice } from "@reduxjs/toolkit";
import { Alarm } from "models";

const initialState: Alarm[] = [];

export const alarmsSlice: Slice<Alarm[]> = createSlice({
    name: "alarms",
    initialState,
    reducers: (create: ReducerCreators<Alarm[]>) => ({
        set: create.reducer<Alarm[]>((state, action) => {
            return action.payload;
        }),
        add: create.reducer<Alarm>((state, action) => {
            const index = state.findIndex((r) => r.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            } else {
                state.push(action.payload);
            }
        }),
        remove: create.reducer<number>((state, action) => {
            return state.filter((r) => r.id !== action.payload);
        }),
    }),
});

const { set, add, remove } = alarmsSlice.actions;

export const setAction = set as ActionCreatorWithPayload<Alarm[]>;
export const addAction = add as ActionCreatorWithPayload<Alarm>;
export const removeAction = remove as ActionCreatorWithPayload<number>;

export const reducer = alarmsSlice.reducer;