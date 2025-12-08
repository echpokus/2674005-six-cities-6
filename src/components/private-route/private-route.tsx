import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { selectAuthorizationStatus } from '../../store/selectors/user-selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.NoAuth) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
