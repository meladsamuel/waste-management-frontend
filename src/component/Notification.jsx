import React, { useEffect, useState } from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Badge, List, ListItem, ListItemText } from '@material-ui/core';
import { useSocket } from '../contexts/SocketContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
    maxHeight: 200,
  },
  inline: {
    display: 'inline',
  },
  notificationSection: {
    marginRight: theme.spacing(5),
    maxHeight: 400,
    maxWidth: 500,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '8px',
    },

    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.grey[400],
      borderRadius: theme.spacing(1),
    },
  },
}));

const Notification = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [notificationData, setNotificationData] = React.useState([]);
  const [audio] = useState(new Audio('/bell-sound.wav'));
  const socket = useSocket();
  const anchorRef = React.useRef(null);

  useEffect(() => {
    audio.addEventListener('ended', () => audio.pause());
    return () => {
      audio.removeEventListener('ended', () => audio.pause());
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('notification', (data) => {
      audio.play();
      setNotificationData((oldData) => [data, ...oldData]);
    });
  }, [socket]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <IconButton
          color="inherit"
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Badge badgeContent={notificationData.length} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'top right' : 'right bottom',
              }}
            >
              <Paper className={classes.notificationSection} elevation={6}>
                <ClickAwayListener onClickAway={handleClose}>
                  <List>
                    {notificationData.map((notification) => (
                      <ListItem button divider>
                        <ListItemText
                          primary={notification.title}
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                {notification.primary}
                              </Typography>
                              {` -- ${notification.secondary}`}
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default Notification;
