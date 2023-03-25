import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  ListItemText,
  Stack,
  ListItemIcon,
  ListItemButton,
  ListItem,
  IconButton,
  Divider,
  Typography,
  CssBaseline,
  List,
  Toolbar,
  Box,
} from '@mui/material';

import {
  IconEngine,
  IconManualGearbox,
  IconChartLine,
  IconChartArcs,
  IconWaveSine,
  IconChartDots,
  IconSettings,
} from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import FistTimeOpenDialog from './FirstTimeOpenDialog';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MenuDrawer({ children }: any) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  const menuVariable = [
    { icon: <IconEngine />, name: 'Двигатель', path: '/' },
    {
      icon: <IconManualGearbox />,
      name: 'Шестерентчатый насос',
      path: '/system',
    },
    { icon: <IconChartArcs />, name: 'Героторный насос', path: '/diagramm' },
    {
      icon: <IconChartLine />,
      name: 'Пластинтчатый насос',
      path: '/forms',
    },
    // ,
    // { icon: <IconWaveSine />, name: 'Резонансные режимы', path: '/resonance' },
    // { icon: <IconChartDots />, name: 'Напряжение', path: '/strain' },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ height: '50px', backgroundColor: 'black' }}
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Расчет масляного насоса
          </Typography>
        </Toolbar>
        <Typography variant="h6" noWrap component="div">
          Расчет масляного насоса
        </Typography>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Stack
          sx={{
            height: '50px',
            flexDirection: 'row-reverse',
            alignItems: 'center',
          }}
        >
          <IconButton
            onClick={handleDrawerClose}
            sx={{ height: '25px', width: '25px', mr: '10px' }}
          >
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </Stack>
        <Divider />
        <List>
          {/* Bug open menu, need to fix */}
          {menuVariable.map((elem) => (
            <ListItem key={elem.name} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 55,
                  maxHeight: 55,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleClick(elem.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {elem.icon}
                </ListItemIcon>
                <ListItemText
                  primary={elem.name}
                  sx={{
                    opacity: open ? 1 : 0,
                    whiteSpace: 'pre-wrap',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 55,
              maxHeight: 55,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => handleClick('/settings')}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <IconSettings />
            </ListItemIcon>
            <ListItemText
              primary="Настройки"
              sx={{
                opacity: open ? 1 : 0,
                whiteSpace: 'pre-wrap',
              }}
            />
          </ListItemButton>
        </ListItem>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <FistTimeOpenDialog />
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
