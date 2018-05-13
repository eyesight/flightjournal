import React, { Component } from 'react';
import StartMain from './start-main';
import Header from './header/header';
import LoginFormContainer from './loginFormContainer/loginFormContainer';
import FlugdatenFormContainer from './flugdatenForms/flugdatenFormContainer';
import StartplaceFormContainer from './startplacesFormContainer/startplacesFormContainer';
import Flugdaten from './home-flightTable/test';
import PasswordForgetFormContainer from './passwordForgetFormContainer/passwordForgetFormContainer';
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

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

class App extends Component {
  render() {
    return (
        <Provider store={createStoreWithMiddleware(reducers)}>
            <Router>
                <div className="page">
                 <Header />
                 <Switch>
                    <Route exact path={routes.TEST} component={() => <Flugdaten />} />
                    <Route exact path={routes.STARTPLATZ_ERFASSEN} component={() => <StartplaceFormContainer />} />
                     <Route exact path={routes.FLUGDATEN_ERFASSEN} component={() => <FlugdatenFormContainer />} />
                     <Route exact path={routes.LOGIN} component={() => <LoginFormContainer />} />
                     <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetFormContainer />} />
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
