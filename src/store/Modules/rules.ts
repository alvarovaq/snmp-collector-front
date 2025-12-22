import { ActionCreatorWithPayload, createSlice,ReducerCreators,Slice } from "@reduxjs/toolkit";
import { Rule } from "models";

const initialState: Rule[] = [];

export const rulesSlice: Slice<Rule[]> = createSlice({
    name: "rules",
    initialState,
    reducers: (create: ReducerCreators<Rule[]>) => ({
        set: create.reducer<Rule[]>((state, action) => {
            return action.payload;
        }),
        add: create.reducer<Rule>((state, action) => {
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

const { set, add, remove } = rulesSlice.actions;

export const setAction = set as ActionCreatorWithPayload<Rule[]>;
export const addAction = add as ActionCreatorWithPayload<Rule>;
export const removeAction = remove as ActionCreatorWithPayload<number>;

export const reducer = rulesSlice.reducer;