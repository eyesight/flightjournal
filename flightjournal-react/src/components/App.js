import React, { Component } from 'react';
import StartMainContainer from './startMainContainer';
import Header from './header/header';
import LoginFormContainer from './loginFormContainer/loginFormContainer';
import FlugdatenFormContainer from './flugdatenForms/flugdatenFormContainer';
import StartplaceFormContainer from './startplacesFormContainer/startplacesFormContainer';
import FlightDetail from './flightDetail/flightDetail';
import StartplaceDetail from './startplaceDetail/startplaceDetail';
import PasswordForgetFormContainer from './passwordForgetFormContainer/passwordForgetFormContainer';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Logo from './header/logo'; 
import ReactTransitionGroup from 'react-addons-transition-group'

import {
    BrowserRouter as Router,
    Route,
    Switch 
} from 'react-router-dom';
import * as routes from '../constants/routes';
 
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

class App extends Component {
  render() {
    return ( 
        <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
            <Router>
                <div className="page">
                <ReactTransitionGroup component="div" className="logo">
                        <Logo />
                </ReactTransitionGroup>
                 <Header />
                 <Switch>
                    <Route path={routes.STARTPLATZ} component={() => <StartplaceDetail />} />
                    <Route exact path={routes.STARTPLATZ_ERFASSEN} component={() => <StartplaceFormContainer />} />
                    <Route exact path={routes.STARTPLATZ_DETAIL_ERFASSEN} component={() => <StartplaceFormContainer />} />
                    <Route exact path={routes.STARTPLATZ_STARTAREA_DETAIL_ERFASSEN} component={() => <StartplaceFormContainer />} />
                    <Route path={routes.FLUGDATEN_DETAIL} component={() => <FlightDetail/>} />
                     <Route exact path={routes.FLUGDATEN_ERFASSEN} component={() => <FlugdatenFormContainer />} />
                     <Route exact path={routes.FLUGDATEN_DETAIL_ERFASSEN} component={() => <FlugdatenFormContainer />} />
                     <Route exact path={routes.LOGIN} component={() => <LoginFormContainer />} />
                     <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetFormContainer />} />
                     <Route path={routes.LANDING} component={() => <StartMainContainer />} />
                     <Route component={() => <StartMainContainer />} />
                 </Switch>
                </div>
             </Router>
        </Provider>
    );
  }
}

export default App;
