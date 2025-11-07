import { createContext, ReactNode, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Severity = "success" | "error" | "info" | "warning";

interface NotificationContextProps {
  notify: (message: string, severity?: Severity) => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  notify: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<Severity>("success");
  const [message, setMessage] = useState("");

  const notify = (msg: string, sev: Severity = "info") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={severity} onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
