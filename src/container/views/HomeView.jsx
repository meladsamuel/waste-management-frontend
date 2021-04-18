import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
// import PropTypes from 'prop-types';

const Home = () => {
  return (
    <>
      <Link component={RouterLink} to="/dashboard">
        dashboard
      </Link>
      <Link component={RouterLink} to="/register">
        SignUp
      </Link>
    </>
  );
};

Home.propTypes = {};

export default Home;
