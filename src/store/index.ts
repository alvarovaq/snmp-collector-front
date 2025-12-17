import { configureStore, EnhancedStore, ReducersMapObject } from "@reduxjs/toolkit";
import * as DevicesModule from "./modules/devices";
import * as OidRecordsModule from "./modules/oid-records";
import * as AuthModule from "./modules/auth";
import * as AppModule from "./modules/app";
import * as ReportsModule from "./modules/reports";
import * as RulesModule from "./modules/rules";
import { Device, OidRecord, AuthState, AppState, ReportFilter, Rule } from "models";

export { DevicesModule, OidRecordsModule, AuthModule, AppModule, ReportsModule, RulesModule };

export interface ReduxState {
    devices: Device[],
    oidRecords: OidRecord[],
    auth: AuthState,
    app: AppState,
    reports: ReportFilter,
    rules: Rule[],
}

export const reducers: ReducersMapObject<ReduxState> = {
    devices: DevicesModule.reducer,
    oidRecords: OidRecordsModule.reducer,
    auth: AuthModule.reducer,
    app: AppModule.reducer,    
    reports: ReportsModule.reducer,
    rules: RulesModule.reducer,
};

export const store: EnhancedStore = configureStore({
    reducer: reducers
});