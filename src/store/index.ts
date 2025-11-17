import { configureStore, EnhancedStore, ReducersMapObject } from "@reduxjs/toolkit";
import * as DevicesModule from "./modules/devices";
import * as OidRecordsModule from "./modules/oid-records";
import * as AuthModule from "./modules/auth";
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