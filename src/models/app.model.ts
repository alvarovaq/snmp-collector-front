export enum Page {
    DEVICES = 0,
    ALERTS,
    REPORTS,
    SETTINGS
}

export interface AppState {
    page: Page;
}