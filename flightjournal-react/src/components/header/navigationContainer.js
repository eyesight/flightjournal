import React, { Component } from 'react';
import NavigationMobile from './navigationMobile';
import Navigation from './navigation';
import {withRouter} from 'react-router-dom';
import * as routes from '../../constants/routes';

class NavigationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            direction:'',
            lastScrollPos:0
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(event) {
        if(this.state.lastScrollPos > event.currentTarget.pageYOffset) {
            this.setState({
                direction:'js-header--show',
                lastScrollPos:event.currentTarget.pageYOffset
            });
        } else if(this.state.lastScrollPos < event.currentTarget.pageYOffset) {
            this.setState({
                direction:'js-header--hide',
                lastScrollPos:event.currentTarget.pageYOffset
            });
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount(){
        window.addEventListener('scroll', this.handleScroll);
    }

    render() {
        //if Landingpage is home and the user is authorised show the hole navigation, else just show logout/login
        let isHome = (this.props.location.pathname === '/' || this.props.location.pathname === routes.HOME) ? true : false;
        return (
            <div className={"header "+ this.state.direction}>
                {isHome ? <NavigationMobile /> : null}
                <Navigation />
            </div>
        );
    }
}

export default withRouter(NavigationContainer);