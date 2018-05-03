import React, { Component } from 'react';
import StartMain from './start-main';
import Header from './header/header';
import LoginForm from './forms/loginForm';
import FlugdatenForm from './forms/flugdatenForm';
import PasswordForgetForm from './forms/passwordForgetForm';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import * as routes from '../constants/routes';

import PrivateRoute from './protectedRoutes/protected-routes'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

class App extends Component {
  render() {
    return (
        <Provider store={createStoreWithMiddleware(reducers)}>
            <Router>
                <div className="page">
                 <Header />
                 <Switch>
                     <PrivateRoute exact path={routes.FLUGDATEN_ERFASSEN} component={() => <FlugdatenForm />} />
                     <Route exact path={routes.LOGIN} component={() => <LoginForm />} />
                     <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetForm />} />
                     <Route exact path={routes.HOME} component={() => <StartMain />} />
                     <Route path={routes.LANDING} component={() => <StartMain />} />
                 </Switch>
                </div>
             </Router>
        </Provider>
    );
  }
}

export default App;
