import { Dispatch } from "@reduxjs/toolkit";
import { DevicesClient, OidRecordsClient } from "clients";
import { Device, OidRecord } from "models";
import { DevicesModule, OidRecordsModule } from "store";

export const loadInitialData = async (dispatch: Dispatch): Promise<void> => {
    try {
        const [devices, records]: [Device[], OidRecord[]] = await Promise.all([
            DevicesClient.getAll(),
            OidRecordsClient.getAll(),
        ]);
    
        dispatch(DevicesModule.setAction(devices));
        dispatch(OidRecordsModule.setAction(records));
    } catch (error) {
        console.error("Error al cargar datos iniciales: ", error);
    }
};
