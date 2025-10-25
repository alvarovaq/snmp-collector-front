import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { Page } from '../models/pages.model';

export interface SidebarMenuItem {
  text: string;
  icon: React.ReactElement<SvgIconProps>;
  page: Page;
}

interface ProfessionalSidebarProps {
  menuItems: SidebarMenuItem[];
  onNavigate: (page: Page) => void;
}

const drawerWidth = 260;

function ProfessionalSidebar({ menuItems, onNavigate }: ProfessionalSidebarProps) {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: SidebarMenuItem, index: number) => {
    setSelectedIndex(index);
    onNavigate(item.page);
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
            {menuItems.map((item, index) => (
              <ListItem key={item.page} disablePadding sx={{ borderRadius: 1, mb: 0.5 }}>
                <ListItemButton
                  selected={selectedIndex === index}
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
                        selectedIndex === index
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
      </Drawer>
    </Box>
  );
}

export default ProfessionalSidebar;
