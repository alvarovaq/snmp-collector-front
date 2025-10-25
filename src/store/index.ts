import { configureStore, EnhancedStore, ReducersMapObject } from "@reduxjs/toolkit";
import * as DevicesModule from "./Modules/devices";
import * as OidRecordsModule from "./Modules/oid-records";
import { Device, OidRecord } from "models";

export { DevicesModule, OidRecordsModule };

export interface ReduxState {
    devices: Device[],
    oidRecords: OidRecord[],
}

export const reducers: ReducersMapObject<ReduxState> = {
    devices: DevicesModule.reducer,
    oidRecords: OidRecordsModule.reducer,
};

export const store: EnhancedStore = configureStore({
    reducer: reducers
});