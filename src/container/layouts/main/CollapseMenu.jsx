import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  Divider,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icons from '../../../hooks/Icons';

const CollapseMenu = ({ key, label, icons, items }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <ListItem onClick={handleOpen} button key={key}>
        <ListItemIcon>{Icons(icons)}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          {items.map(({ key: itemKey, label: itemLabel, icons: subIcons, link }) => (
            <ListItem button component={Link} key={itemKey} to={link}>
              <ListItemIcon>{Icons(subIcons)}</ListItemIcon>
              <ListItemText secondary={itemLabel} />
            </ListItem>
          ))}
        </List>
      </Collapse>
      <Divider />
    </>
  );
};
CollapseMenu.propTypes = {
  key: PropTypes.objectOf(Number).isRequired,
  label: PropTypes.objectOf(String).isRequired,
  icons: PropTypes.objectOf(String).isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default CollapseMenu;
