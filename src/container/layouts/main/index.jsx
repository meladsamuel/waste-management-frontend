import React from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  useTheme,
  Drawer,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
} from '@material-ui/core';
import { ChevronLeft, Menu, ChevronRight } from '@material-ui/icons';
import PropTypes from 'prop-types';
import NestedMenu from './NestedMenu';

const drawerWidth = 240;
const menuItems = [
  {
    key: 1,
    label: 'Baskets',
    icons: 'Delete',
    subMenu: [
      {
        key: 11,
        label: 'Show Basket',
        icons: 'Visibility',
        link: '/baskets/show',
      },
      {
        key: 12,
        label: 'Add New Basket',
        icons: 'Add',
        link: '/baskets/add',
      },
      {
        key: 13,
        label: 'Edit Basket',
        icons: 'Edit',
        link: '/baskets/update',
      },
    ],
  },
  {
    key: 2,
    label: 'Employees',
    icons: 'PeopleAlt',
    subMenu: [
      {
        key: 21,
        label: 'Show Employee',
        icons: 'Visibility',
        link: '/employees/show',
      },
      {
        key: 22,
        label: 'Add Employee',
        icons: 'Add',
        link: '/employees/add',
      },
    ],
  },
  {
    key: 3,
    label: 'Update Device',
    icons: 'SystemUpdateAlt',
    subMenu: [
      {
        key: 31,
        label: 'Upload File',
        icons: 'AttachFile',
        link: '/update',
      },
      {
        key: 32,
        label: 'Update Device',
        icons: 'Delete',
        link: '/baskets/update_software',
      },
    ],
  },
  {
    key: 4,
    label: 'Home Page',
    icons: 'Home',
    subMenu: [
      {
        key: 41,
        label: 'dashboard',
        icons: 'Home',
        link: '/dashboard',
      },
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    height: '100%',
  },
  hasPadding: { padding: theme.spacing(2) },
}));

const AuthLayout = ({ children, hasPadding }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Waste Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <NestedMenu menuItems={menuItems} />
      </Drawer>
      <main
        className={clsx({
          [classes.content]: true,
          [classes.hasPadding]: hasPadding,
        })}
      >
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
AuthLayout.defaultProps = {
  hasPadding: true,
};
AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
  hasPadding: PropTypes.bool,
};
export default AuthLayout;
