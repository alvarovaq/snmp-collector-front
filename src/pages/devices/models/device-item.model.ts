import { Device } from "models";

export enum Status {
    Connected,
    Disconnected,
}

export interface DeviceItem extends Device {
    status: Status
}