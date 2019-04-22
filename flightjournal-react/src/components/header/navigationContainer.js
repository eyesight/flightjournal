import React, { Component } from 'react';

import NavigationMobile from './navigationMobile';
import Navigation from './navigation';
import {withRouter} from 'react-router-dom';
import * as routes from '../../constants/routes';
import ReactDOM from "react-dom";


class NavigationContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowBurger: false
        }
    }

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        this.setState({
            burger: node.querySelector('.mobile-toggle'),
            navigation: node.querySelector('.main-nav')
        });    
    }

    getMobileBurgerState = (burgerstate) => {      
        this.setState({
            isShowBurger: burgerstate
        });

        if (burgerstate === false) {
            this.state.navigation.classList.remove('js-mobile-nav--visible');
            this.state.burger.classList.remove('js-mobile-toggle--active'); 
            this.state.burger.classList.add('js-mobile-toggle--notactive'); 
            this.setState({
                isshowBurger: false
            })
        } else {
            this.state.navigation.classList.add('js-mobile-nav--visible');
            this.state.burger.classList.add('js-mobile-toggle--active');
            this.state.burger.classList.remove('js-mobile-toggle--notactive'); 
            this.setState({
                isshowBurger: true
            })
        }
    }
    render() {
        //if Landingpage is home and the user is authorised show the hole navigation, else just show logout/login
        let isHome = (this.props.location.pathname === '/' || this.props.location.pathname === routes.LANDING) ? true : false;
        return (
            <div className="header__nav-container"> 
                {isHome ? <NavigationMobile 
                    testBurgerState={this.state.isShowBurger}
                    sendMobileBurgerState={this.getMobileBurgerState.bind(this)}
                /> : null}
                <Navigation 
                    sendMobileBurgerState={this.getMobileBurgerState.bind(this)}
                />
            </div>
        );
    }
}

export default withRouter(NavigationContainer);