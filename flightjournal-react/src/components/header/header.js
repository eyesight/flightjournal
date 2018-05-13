import React, { Component } from 'react';
import Logo from './logo';
import NavigationContainer from './navigationContainer';
import ReactTransitionGroup from 'react-addons-transition-group'

class Header extends Component {
    render() {
        return (
            <header>
                <NavigationContainer />
                <ReactTransitionGroup>
                    <Logo />
                </ReactTransitionGroup>
            </header>
        );
    }
}


export default Header;
