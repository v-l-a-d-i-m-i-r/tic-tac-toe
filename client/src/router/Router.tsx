import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Games } from '../games/Games';
import { SignIn } from '../auth/SignIn';
import { SignUp } from '../auth/SignUp';
import { useAppSelector } from '../hooks/redux';
import { RoutePaths } from './route-paths';
import { Game } from '../game/Game';
import { authSelector } from '../store/store';

const PrivateRoute: React.FC = () => {
  const { user } = useAppSelector(authSelector);

  if (!user) {
    // not logged in so redirect to login page with the return url
    // return <Navigate to="/account/login" state={{ from: history.location }} />
    return <Navigate to={RoutePaths.SignIn} />;
  }

  // authorized so return outlet for child routes
  return <Outlet />;
};

export const Router: React.FC = () => (
  <Routes>
    <Route path={RoutePaths.SignIn} element={<SignIn />} />
    <Route path={RoutePaths.SignUp} element={<SignUp />} />

    <Route element={<PrivateRoute />}>
      <Route path={RoutePaths.Games} element={<Games />} />
      <Route path={RoutePaths.Game} element={<Game />} />
    </Route>

    <Route
      path="*"
      element={<Navigate to={RoutePaths.Games} replace />}
    />
  </Routes>
);
