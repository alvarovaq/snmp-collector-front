import { configureStore, EnhancedStore, ReducersMapObject } from "@reduxjs/toolkit";
import * as DevicesModule from "./Modules/devices";
import * as OidRecordsModule from "./Modules/oid-records";
import * as AuthModule from "./Modules/auth";
import { Device, OidRecord, AuthState } from "models";

export { DevicesModule, OidRecordsModule, AuthModule };

export interface ReduxState {
    devices: Device[],
    oidRecords: OidRecord[],
    auth: AuthState,
}

export const reducers: ReducersMapObject<ReduxState> = {
    devices: DevicesModule.reducer,
    oidRecords: OidRecordsModule.reducer,
    auth: AuthModule.reducer,
};

export const store: EnhancedStore = configureStore({
    reducer: reducers
});