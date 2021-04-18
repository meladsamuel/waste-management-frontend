import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';
import CollapseMenu from './CollapseMenu';

const NestedMenu = ({ menuItems }) => {
  return (
    <List>
      {menuItems &&
        menuItems.map(({ key, label, icons, subMenu }) => (
          <CollapseMenu key={key} label={label} icons={icons} items={subMenu} />
        ))}
    </List>
  );
};
NestedMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default NestedMenu;
