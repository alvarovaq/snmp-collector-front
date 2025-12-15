import { configureStore, EnhancedStore, ReducersMapObject } from "@reduxjs/toolkit";
import * as DevicesModule from "./modules/devices";
import * as OidRecordsModule from "./modules/oid-records";
import * as AuthModule from "./modules/auth";
import * as AppModule from "./modules/app";
import * as ReportsModule from "./modules/reports";
import { Device, OidRecord, AuthState, AppState, ReportFilter } from "models";

export { DevicesModule, OidRecordsModule, AuthModule, AppModule, ReportsModule };

export interface ReduxState {
    devices: Device[],
    oidRecords: OidRecord[],
    auth: AuthState,
    app: AppState,
    reports: ReportFilter,
}

export const reducers: ReducersMapObject<ReduxState> = {
    devices: DevicesModule.reducer,
    oidRecords: OidRecordsModule.reducer,
    auth: AuthModule.reducer,
    app: AppModule.reducer,    
    reports: ReportsModule.reducer,
};

export const store: EnhancedStore = configureStore({
    reducer: reducers
});