import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

import * as routes from '../../constants/routes';

const isAuthenticated = false;

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
            isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
            pathname: routes.LOGIN,
            state: { from: props.location }
        }} />
    )} />
);

export default PrivateRoute