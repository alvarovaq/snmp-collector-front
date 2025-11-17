import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import DnsIcon from '@mui/icons-material/Dns';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { Device, OidRecord, OidRecordID, WSEvent } from "models";
import { DevicesModule, OidRecordsModule } from "store";
import { useWS } from "context";
import { DashboardPage } from "pages/dashboard";
import { DevicePage } from "pages/devices";
import { AlertsPage } from "pages/alerts";
import { SettingsPage } from "pages/settings";
import { loadInitialData } from "../utils/LoaderData";
import { SidebarMenuItem, SidebarComponent, LoadingComponent } from "../components";
import { Page } from "../models";
import { User } from "models";
import { authService } from "services";
import { selectUser } from "store/selectors";

const appMenuItems: SidebarMenuItem[] = [
  { text: 'Inicio', icon: <HomeIcon />, page: Page.DASHBOARD },
  { text: 'Dispositivos', icon: <DnsIcon />, page: Page.DEVICES },
  { text: 'Alertas', icon: <NotificationsIcon />, page: Page.ALERTS },
  { text: 'Configuración', icon: <SettingsIcon />, page: Page.SETTINGS },
];

export const MainPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  
  const user: User | null = useSelector(selectUser);

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

    return () => {
      rmUpdateRecords();
      rmRemoveRecords();
      rmUpdateDevice();
      rmRemoveDevice();
    };
  }, [addHandler, dispatch]);

  const onLogout = (): void => {
    authService.logout();
  };

  if (loading) return (<LoadingComponent />);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <SidebarComponent menuItems={appMenuItems} onNavigate={(page) => setCurrentPage(page)} user={user} onLogout={onLogout} />
      <Box sx={{ flewGrow: 1, p: 4, width: "100%" }}>
        {
          currentPage === Page.DASHBOARD ?
            (<DashboardPage />) :
            currentPage === Page.DEVICES ?
              (<DevicePage />) :
              currentPage === Page.ALERTS ?
                (<AlertsPage />) :
                currentPage === Page.SETTINGS ?
                  (<SettingsPage />) :
                  (<p>Página no encontrada</p>)
        }
      </Box>
    </Box>
  );
};