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
            isShowBurger: false,
            burger: ''
        }
        this.burger = React.createRef();
    }

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        this.setState({
            burger: node,
            navigation: node.querySelector('.main-nav')
        });    
    }

    getMobileBurgerState = (burgerstate) => {      
        let burgerli = this.state.burger.querySelector('.mobile-toggle');
        this.setState({
            isShowBurger: burgerstate
        });
        if (burgerstate === false && this.state.burger) {
            this.state.navigation.classList.remove('js-mobile-nav--visible');
            burgerli.classList.remove('js-mobile-toggle--active'); 
            burgerli.classList.add('js-mobile-toggle--notactive'); 
            this.setState({
                isshowBurger: false
            })
        } else {
            this.state.navigation.classList.add('js-mobile-nav--visible');
            burgerli.classList.add('js-mobile-toggle--active');
            burgerli.classList.remove('js-mobile-toggle--notactive'); 
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