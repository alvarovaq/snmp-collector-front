import { useEffect, useState } from "react";
import { Device, OidRecord, OidRecordID, WSEvent } from "models";
import { DevicesModule, OidRecordsModule } from "store";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { loadInitialData } from "../utils/LoaderData";
import { useWS } from "context";
import Sidebar, { SidebarMenuItem } from "../components/Sidebar";
import HomeIcon from '@mui/icons-material/Home';
import DnsIcon from '@mui/icons-material/Dns';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { Page } from "../models/pages.model";
import { DevicePage } from "pages/devices";

const appMenuItems: SidebarMenuItem[] = [
  { text: 'Inicio', icon: <HomeIcon />, page: Page.DASHBOARD },
  { text: 'Dispositivos', icon: <DnsIcon />, page: Page.DEVICES },
  { text: 'Alertas', icon: <NotificationsIcon />, page: Page.ALERTS },
  { text: 'Configuración', icon: <SettingsIcon />, page: Page.SETTINGS },
];

export const MainPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  
  const dispatch = useDispatch();
  const { addHandler } = useWS();
  
  useEffect(() => {
    loadInitialData(dispatch)
      .finally(() => setLoading(false));
  }, []);

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
  }, [addHandler]);

  if (loading) return <p>Cargando dispositivos...</p>

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar menuItems={appMenuItems} onNavigate={(page) => setCurrentPage(page)}/>
      <Box sx={{ flewGrow: 1, p: 4 }}>
        {
          currentPage === Page.DEVICES ?
            (<DevicePage />) :
            (<p>{currentPage}</p>)
        }
      </Box>
    </Box>
  );
};