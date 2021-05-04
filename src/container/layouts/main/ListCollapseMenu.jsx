import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';
import CollapseMenu from './CollapseMenu';

const NestedMenu = ({ drawerOpen, menuItems }) => {
  return (
    <List>
      {menuItems &&
        menuItems.map((items) => (
          <CollapseMenu drawerOpen={drawerOpen} key={items.key} items={items} />
        ))}
    </List>
  );
};
NestedMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.any).isRequired,
  drawerOpen: PropTypes.bool.isRequired,
};
export default NestedMenu;
