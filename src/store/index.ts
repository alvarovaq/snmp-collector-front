import { configureStore, EnhancedStore, ReducersMapObject } from "@reduxjs/toolkit";
import * as DevicesModule from "./modules/devices";
import * as OidRecordsModule from "./modules/oid-records";
import * as AuthModule from "./modules/auth";
import * as AppModule from "./modules/app";
import * as ReportsModule from "./modules/reports";
import * as RulesModule from "./modules/rules";
import * as AlarmsModule from "./modules/alarms";
import { Device, OidRecord, AuthState, AppState, ReportFilter, Rule, Alarm } from "models";

export { DevicesModule, OidRecordsModule, AuthModule, AppModule, ReportsModule, RulesModule, AlarmsModule };

export interface ReduxState {
    devices: Device[],
    oidRecords: OidRecord[],
    auth: AuthState,
    app: AppState,
    reports: ReportFilter,
    rules: Rule[],
    alarms: Alarm[],
}

export const reducers: ReducersMapObject<ReduxState> = {
    devices: DevicesModule.reducer,
    oidRecords: OidRecordsModule.reducer,
    auth: AuthModule.reducer,
    app: AppModule.reducer,    
    reports: ReportsModule.reducer,
    rules: RulesModule.reducer,
    alarms: AlarmsModule.reducer,
};

export const store: EnhancedStore = configureStore({
    reducer: reducers
});