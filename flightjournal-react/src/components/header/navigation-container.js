import React, { Component } from 'react';
import NavigationMobile from './navigation-mobile';
import Navigation from './navigation';

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
        return (
            <div className={"header "+ this.state.direction}>
                <NavigationMobile />
                <Navigation />
            </div>
        );
    }
}


export default NavigationContainer;
