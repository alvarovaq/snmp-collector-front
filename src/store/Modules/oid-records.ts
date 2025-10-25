import { ActionCreatorWithPayload, createSlice,ReducerCreators,Slice } from "@reduxjs/toolkit";
import { OidRecord, OidRecordID } from "models";

const initialState: OidRecord[] = [];

export const oidRecordsSlice: Slice<OidRecord[]> = createSlice({
    name: "oid-records",
    initialState,
    reducers: (create: ReducerCreators<OidRecord[]>) => ({
        set: create.reducer<OidRecord[]>((state, action) => {
            return action.payload;
        }),
        add: create.reducer<OidRecord>((state, action) => {
            const index = state.findIndex((d) => d.deviceId === action.payload.deviceId && d.oid === action.payload.oid);
            if (index !== -1) {
                state[index] = action.payload;
            } else {
                state.push(action.payload);
            }
        }),
        remove: create.reducer<OidRecordID>((state, action) => {
            return state.filter((d) => d.deviceId !== action.payload.deviceId || d.oid !== action.payload.oid);
        }),
    }),
});

const { set, add, remove } = oidRecordsSlice.actions;

export const setAction = set as ActionCreatorWithPayload<OidRecord[]>;
export const addAction = add as ActionCreatorWithPayload<OidRecord>;
export const removeDevice = remove as ActionCreatorWithPayload<OidRecordID>;

export const reducer = oidRecordsSlice.reducer;