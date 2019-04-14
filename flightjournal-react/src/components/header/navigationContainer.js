import React, { Component } from 'react';
import NavigationMobile from './navigationMobile';
import Navigation from './navigation';
import {withRouter} from 'react-router-dom';
import * as routes from '../../constants/routes';

class NavigationContainer extends Component {
    render() {
        //if Landingpage is home and the user is authorised show the hole navigation, else just show logout/login
        let isHome = (this.props.location.pathname === '/' || this.props.location.pathname === routes.HOME) ? true : false;
        return (
            <div className="header__nav-container"> 
                {isHome ? <NavigationMobile /> : null}
                <Navigation />
            </div>
        );
    }
}

export default withRouter(NavigationContainer);