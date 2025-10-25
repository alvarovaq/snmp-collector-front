import { ActionCreatorWithPayload, createSlice,ReducerCreators,Slice } from "@reduxjs/toolkit";
import { Device } from "models";

const initialState: Device[] = [];

export const devicesSlice: Slice<Device[]> = createSlice({
    name: "devices",
    initialState,
    reducers: (create: ReducerCreators<Device[]>) => ({
        set: create.reducer<Device[]>((state, action) => {
            return action.payload;
        }),
        add: create.reducer<Device>((state, action) => {
            const index = state.findIndex((d) => d.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            } else {
                state.push(action.payload);
            }
        }),
        remove: create.reducer<number>((state, action) => {
            return state.filter((d) => d.id !== action.payload);
        }),
    }),
});

const { set, add, remove } = devicesSlice.actions;

export const setAction = set as ActionCreatorWithPayload<Device[]>;
export const addAction = add as ActionCreatorWithPayload<Device>;
export const removeDevice = remove as ActionCreatorWithPayload<number>;

export const reducer = devicesSlice.reducer;