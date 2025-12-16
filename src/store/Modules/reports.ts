import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createSlice,ReducerCreators,Slice } from "@reduxjs/toolkit";
import { ReportFilter, } from "models";

const initialState: ReportFilter = {
    deviceId: null,
    oid: null,
    date: null,
    range: 15 * 60
};

export const reportsSlice: Slice<ReportFilter> = createSlice({
    name: "reports",
    initialState,
    reducers: (create: ReducerCreators<ReportFilter>) => ({
        set: create.reducer<ReportFilter>((state, action) => {
            return action.payload;
        }),
        reset: create.reducer<void>((state) => {
            return initialState;
        }),
    }),
});

const { set, reset } = reportsSlice.actions;

export const setAction = set as ActionCreatorWithPayload<ReportFilter>;
export const resetAction = reset as ActionCreatorWithoutPayload;

export const reducer = reportsSlice.reducer;