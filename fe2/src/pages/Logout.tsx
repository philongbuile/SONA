import React from 'react';
import { authApi } from '../api/authApi';
// import { useNavigate } from "react-router-dom";

/**
 * functions that redirect to login page and delete cookies.
 */
export const LogOut = () => {
  authApi.logout().then((status) => {
    if (status) {
      window.location.href = '/';
    } else {
      throw new Error('Network response was not ok.');
    }
  });
};
