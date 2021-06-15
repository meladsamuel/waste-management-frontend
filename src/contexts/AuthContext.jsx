import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext(undefined);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [error, onError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  async function signUp(formData) {
    try {
      const { data } = await axios.post('http://localhost:5000/api/users', formData,
        {headers: 'Access-Control-Allow-Origin: *'}
        );
      onError(null);
      setCurrentUser(data.user);
      return data.user;
    } catch (err) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      return null;
    }
  }
  const value = {
    currentUser,
    error,
    signUp,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
