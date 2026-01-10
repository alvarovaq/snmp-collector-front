import { Alarm } from "models";
import { ReduxState } from "store";

export const selectAlarmsUnreaded = (state: ReduxState): Alarm[] => state.alarms.filter(a => !a.readed);