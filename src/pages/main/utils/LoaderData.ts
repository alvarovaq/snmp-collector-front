import { Dispatch } from "@reduxjs/toolkit";
import { AlarmsClient, DevicesClient, OidRecordsClient } from "clients";
import { RulesClient } from "clients/rules.client";
import { Alarm, Device, OidRecord, Rule } from "models";
import { DevicesModule, OidRecordsModule, RulesModule, AlarmsModule } from "store";

export const loadInitialData = async (dispatch: Dispatch): Promise<void> => {
    try {
        const [devices, records, rules, alarms]: [Device[], OidRecord[], Rule[], Alarm[]] = await Promise.all([
            DevicesClient.getAll(),
            OidRecordsClient.getAll(),
            RulesClient.getAll(),
            AlarmsClient.getAll(),
        ]);
    
        dispatch(DevicesModule.setAction(devices));
        dispatch(OidRecordsModule.setAction(records));
        dispatch(RulesModule.setAction(rules));
        dispatch(AlarmsModule.setAction(alarms));
    } catch (error) {
        console.error("Error al cargar datos iniciales: ", error);
    }
};
