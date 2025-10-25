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
        add: create.reducer<OidRecord[]>((state, action) => {
            action.payload.forEach((record) => {
                const index = state.findIndex((d) => d.deviceId === record.deviceId && d.oid === record.oid);
                if (index !== -1) {
                    state[index] = record;
                } else {
                    state.push(record);
                }
            });
        }),
        remove: create.reducer<OidRecordID[]>((state, action) => {
            action.payload.forEach((id) => {
                const index = state.findIndex((d) => d.deviceId === id.deviceId && d.oid === id.oid);
                if (index !== -1) {
                    state.splice(index, 1);
                }
            });
        }),
    }),
});

const { set, add, remove } = oidRecordsSlice.actions;

export const setAction = set as ActionCreatorWithPayload<OidRecord[]>;
export const addAction = add as ActionCreatorWithPayload<OidRecord[]>;
export const removeAction = remove as ActionCreatorWithPayload<OidRecordID[]>;

export const reducer = oidRecordsSlice.reducer;