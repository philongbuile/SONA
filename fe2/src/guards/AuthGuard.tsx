import React, { useState, useEffect } from 'react';
import { authApi } from '../api/authApi';
import { useLocation, RouteProps, Outlet, Navigate } from 'react-router-dom';
import { GuardEC } from '../models/Guard';

const Guard = ({ guardEntity }: GuardEC, { ...routeProps }: RouteProps) => {
  const [isAuth, setIsAuth] = useState<null | boolean>(null);

  const handleGuard = async () => {
    let data = await authApi.validateRole();
    if (data === guardEntity) setIsAuth(true);
    if (data !== guardEntity) setIsAuth(false);
  };

  useEffect(() => {
    handleGuard();
  }, []);

  if (isAuth === true) return <Outlet />;

  if (isAuth === false) return <Navigate to={'/'} />;

  return null;
};

export default Guard;
