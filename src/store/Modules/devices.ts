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
            state.push(action.payload);
        }),
        update: create.reducer<Device>((state, action) => {}),
        remove: create.reducer<number>((state, action) => {}),
    }),
});

const { set, add, update, remove } = devicesSlice.actions;

export const setAction = set as ActionCreatorWithPayload<Device[]>;
export const addAction = add as ActionCreatorWithPayload<Device>;
export const updateAction = update as ActionCreatorWithPayload<Device>;
export const removeDevice = remove as ActionCreatorWithPayload<number>;

export const reducer = devicesSlice.reducer;