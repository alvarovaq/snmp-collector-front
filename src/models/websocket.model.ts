export enum WSEvent {
    UpdateRecords = "UpdateRecords",
    RemoveRecords = "RemoveRecords",
    UpdateDevice = "UpdateDevice",
    RemoveDevice = "RemoveDevice",
    Other = "Other",
}

export interface WSMessage {
    event: WSEvent;
    data: any;
}

export enum WSStatus {
    CONNECTING = 0,
    OPEN,
    CLOSED,
    ERROR,
}