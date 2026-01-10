import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import DnsIcon from '@mui/icons-material/Dns';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Alarm, Device, OidRecord, OidRecordID, WSEvent } from "models";
import { AlarmsModule, AppModule, DevicesModule, OidRecordsModule, ReportsModule, RulesModule } from "store";
import { useNotification, useWS } from "context";
import { DashboardPage } from "pages/dashboard";
import { DevicePage } from "pages/devices";
import { AlarmsPage } from "pages/alarms";
import { SettingsPage } from "pages/settings";
import { loadInitialData } from "../utils/LoaderData";
import { SidebarMenuItem, SidebarComponent, LoadingComponent } from "../components";
import { Page, User, Rule } from "models";
import { authService } from "services";
import { selectPage, selectUser } from "store/selectors";
import { ReportsPage } from "pages/reports";

const appMenuItems: SidebarMenuItem[] = [
  { text: 'Inicio', icon: <HomeIcon />, page: Page.DASHBOARD },
  { text: 'Dispositivos', icon: <DnsIcon />, page: Page.DEVICES },
  { text: 'Alertas', icon: <NotificationsIcon />, page: Page.ALERTS },
  { text: 'Históricos', icon: <TimelineIcon />, page: Page.REPORTS },
  { text: 'Configuración', icon: <SettingsIcon />, page: Page.SETTINGS },
];

export const MainPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  
  const user: User | null = useSelector(selectUser);
  const page: Page = useSelector(selectPage);

  const { notify } = useNotification();

  const dispatch = useDispatch();
  const { addHandler } = useWS();
  
  useEffect(() => {
    loadInitialData(dispatch)
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const rmUpdateRecords = addHandler(WSEvent.UpdateRecords, (data) => {
      dispatch(OidRecordsModule.addAction(data as OidRecord[]));
    });

    const rmRemoveRecords = addHandler(WSEvent.RemoveRecords, (data) => {
      dispatch(OidRecordsModule.removeAction(data as OidRecordID[]));
    });

    const rmUpdateDevice = addHandler(WSEvent.UpdateDevice, (data) => {
      dispatch(DevicesModule.addAction(data as Device));
    });

    const rmRemoveDevice = addHandler(WSEvent.RemoveDevice, (data) => {
      dispatch(DevicesModule.removeAction(data as number));
    });

    const rmUpdateRule = addHandler(WSEvent.UpdateRule, (data) => {
      dispatch(RulesModule.addAction(data as Rule));
    });

    const rmRemoveRule = addHandler(WSEvent.RemoveRule, (data) => {
      dispatch(RulesModule.removeAction(data as number));
      dispatch(DevicesModule.removeRuleAction(data as number));
    });

    const rmUpdateAlarm = addHandler(WSEvent.UpdateAlarm, (data) => {
      notify("Nueva alerta", "warning");
      dispatch(AlarmsModule.addAction(data as Alarm));
    });

    const rmRemoveAlarm = addHandler(WSEvent.RemoveAlarm, (data) => {
      dispatch(AlarmsModule.removeAction(data as number));
    });

    return () => {
      rmUpdateRecords();
      rmRemoveRecords();
      rmUpdateDevice();
      rmRemoveDevice();
      rmUpdateRule();
      rmRemoveRule();
      rmUpdateAlarm();
      rmRemoveAlarm();
    };
  }, [addHandler, dispatch]);

  const onLogout = (): void => {
    authService.logout();
  };

  const onNavigate = (page: Page): void => {
    if (page === Page.REPORTS)
      dispatch(ReportsModule.resetAction());
    dispatch(AppModule.setPageAction(page));
  };

  if (loading) return (<LoadingComponent />);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <SidebarComponent menuItems={appMenuItems} page={page} onNavigate={onNavigate} user={user} onLogout={onLogout} />
      <Box sx={{ flewGrow: 1, width: "100%" }}>
        {
          page === Page.DASHBOARD ?
            (<DashboardPage />) :
            page === Page.DEVICES ?
              (<DevicePage />) :
              page === Page.ALERTS ?
                (<AlarmsPage />) :
                page === Page.REPORTS ?
                  (<ReportsPage />) :
                  page === Page.SETTINGS ?
                    (<SettingsPage />) :
                    (<p>Página no encontrada</p>)
        }
      </Box>
    </Box>
  );
};