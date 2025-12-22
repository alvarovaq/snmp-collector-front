import { Dispatch } from "@reduxjs/toolkit";
import { DevicesClient, OidRecordsClient } from "clients";
import { RulesClient } from "clients/rules.client";
import { Device, OidRecord, Rule } from "models";
import { DevicesModule, OidRecordsModule, RulesModule } from "store";

export const loadInitialData = async (dispatch: Dispatch): Promise<void> => {
    try {
        const [devices, records, rules]: [Device[], OidRecord[], Rule[]] = await Promise.all([
            DevicesClient.getAll(),
            OidRecordsClient.getAll(),
            RulesClient.getAll(),
        ]);
    
        dispatch(DevicesModule.setAction(devices));
        dispatch(OidRecordsModule.setAction(records));
        dispatch(RulesModule.setAction(rules));
    } catch (error) {
        console.error("Error al cargar datos iniciales: ", error);
    }
};
