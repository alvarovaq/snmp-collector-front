import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, } from "@mui/material";
import { Lock, People } from "@mui/icons-material";
import { ChangePasswordForm } from "./change-password-form";
import { UsersPage } from "./users.page";

interface SettingsSection {
  id: string;
  label: string;
  icon: React.ReactElement;
  component: React.ReactElement;
}

const settingsSections: SettingsSection[] = [
  {
    id: "change-password",
    label: "Cambiar contraseña",
    icon: <Lock />,
    component: <ChangePasswordForm />,
  },
  {
    id: "users",
    label: "Usuarios",
    icon: <People />,
    component: <UsersPage />
  }
];

export const SettingsPage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState(settingsSections[0].id);

  const currentSection = settingsSections.find((s) => s.id === selectedSection);

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Box sx={{ width: 300, borderRight: 1, borderColor: "divider" }}>
        <Typography variant="h5" sx={{ p: 2 }}>Configuración</Typography>
        <Divider />
        <List>
          {settingsSections.map((section) => (
            <ListItemButton
              key={section.id}
              selected={section.id === selectedSection}
              onClick={() => setSelectedSection(section.id)}
            >
              <ListItemIcon>{section.icon}</ListItemIcon>
              <ListItemText primary={section.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        {currentSection?.component}
      </Box>
    </Box>
  );
};
