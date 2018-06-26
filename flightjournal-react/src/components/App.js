import React, { Component } from 'react';
import StartMainContainer from './startMainContainer';
import Header from './header/header';
import LoginFormContainer from './loginFormContainer/loginFormContainer';
import FlugdatenFormContainer from './flugdatenForms/flugdatenFormContainer';
import StartplaceFormContainer from './startplacesFormContainer/startplacesFormContainer';
import FlightDetailContainer from './flightDetailContainer/flightDetailContainer';
import ProfilePage from './flugdatenForms/fileupload'
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
                 <Route exact path={routes.TEST} component={() => <ProfilePage />} />
                    <Route exact path={routes.STARTPLATZ_ERFASSEN} component={() => <StartplaceFormContainer />} />
                    <Route exact path={routes.FLUGDATEN_DETAIL} component={() => <FlightDetailContainer/>} />
                     <Route exact path={routes.FLUGDATEN_ERFASSEN} component={() => <FlugdatenFormContainer />} />
                     <Route exact path={routes.LOGIN} component={() => <LoginFormContainer />} />
                     <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetFormContainer />} />
                     <Route exact path={routes.HOME} component={() => <StartMainContainer />} />
                     <Route path={routes.LANDING} component={() => <StartMainContainer />} />
                 </Switch>
                </div>
             </Router>
        </Provider>
    );
  }
}

export default App;
