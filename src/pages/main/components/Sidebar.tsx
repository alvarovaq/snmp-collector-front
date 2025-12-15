import React from 'react';
import Drawer from '@mui/material/Drawer';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Divider, useTheme, SvgIconProps, Avatar, Button, } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Page, User } from "models"

export interface SidebarMenuItem {
  text: string;
  icon: React.ReactElement<SvgIconProps>;
  page: Page;
}

interface SidebarComponentProps {
  menuItems: SidebarMenuItem[];
  page: Page;
  onNavigate: (page: Page) => void;
  user?: User | null;
  onLogout: () => void;
}

const drawerWidth = 260;

export const SidebarComponent = (props: SidebarComponentProps) => {
  const theme = useTheme();

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: SidebarMenuItem, index: number) => {
    props.onNavigate(item.page);
  };

  return (
    <Box component="nav" sx={{ width: drawerWidth, flexShrink: 0 }} aria-label="sidebar">
      <Drawer
        variant="permanent"
        open
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRight: theme.palette.mode === 'dark' ? '1px solid #333' : '1px solid #ddd',
          },
        }}
      >
        <Toolbar
          sx={{
            minHeight: '64px !important',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
          }}
        >
          <Typography
            variant="h5"
            noWrap
            sx={{
              fontWeight: 800,
              color: theme.palette.text.primary,
              textAlign: 'center',
            }}
          >
            SNMP Collector
          </Typography>
        </Toolbar>
        <Divider />
        <Box sx={{ flexGrow: 0, py: 1 }}>
          <List sx={{ p: 1 }}>
            {props.menuItems.map((item, index) => (
              <ListItem key={item.page} disablePadding sx={{ borderRadius: 1, mb: 0.5 }}>
                <ListItemButton
                  selected={props.page === item.page}
                  onClick={(event) => handleListItemClick(event, item, index)}
                  sx={{
                    borderRadius: 1,
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.primary,
                      '& .MuiListItemIcon-root': {
                        color: theme.palette.text.primary,
                      },
                      '&:hover': {
                        backgroundColor: theme.palette.background.paper,
                      },
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        props.page === item.page
                          ? theme.palette.text.primary
                          : theme.palette.text.secondary,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ fontWeight: 600 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ p: 2, borderTop: theme.palette.mode === 'dark' ? '1px solid #333' : '1px solid #ddd' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ mr: 1 }}>
              { props.user ? props.user.name.charAt(0).toUpperCase() : "-" }
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {props.user  ? props.user.name : "-"}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            color="error"
            fullWidth
            startIcon={<Logout />}
            onClick={props.onLogout}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};
