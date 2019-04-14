import React, { Component } from 'react';
import NavigationContainer from './navigationContainer';

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
                <NavigationContainer />
            </header>
        );
    }
}


export default Header;
