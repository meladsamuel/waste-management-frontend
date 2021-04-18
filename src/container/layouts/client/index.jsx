import React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, AppBar, Toolbar, Typography } from '@material-ui/core';

const ClientLayout = ({ children }) => {
  return (
    <div>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Waste Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '64px' }}>{children}</div>
    </div>
  );
};

ClientLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
export default ClientLayout;
