import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';
import CollapseMenu from './CollapseMenu';

const NestedMenu = ({ menuItems }) => {
  return (
    <List>
      {menuItems &&
        menuItems.map((items) => <CollapseMenu key={items.key} items={items} />)}
    </List>
  );
};
NestedMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default NestedMenu;
