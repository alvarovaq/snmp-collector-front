import { configureStore, EnhancedStore, ReducersMapObject } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import * as DevicesModule from "./Modules/devices";
import { Device } from "models";

export { DevicesModule };

export interface ReduxState {
    devices: Device[],
}

export const reducers: ReducersMapObject<ReduxState> = {
    devices: DevicesModule.reducer,
};

export const store: EnhancedStore = configureStore({
    reducer: reducers
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();