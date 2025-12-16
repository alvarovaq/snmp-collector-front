export enum Page {
    DASHBOARD = 0,
    DEVICES,
    ALERTS,
    REPORTS,
    SETTINGS
}

export interface AppState {
    page: Page;
}