import React, { Component } from 'react';
import Logo from './logo';
import NavigationMobile from './navigation-mobile';
import Navigation from './navigation';

class Header extends Component {
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
        return (
            <header className={"header "+ this.state.direction}>
                <Logo />
                <NavigationMobile />
                <Navigation />
            </header>
        );
    }
}


export default Header;
