import React, { Component } from 'react';

class NavigationMobile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isshowBurger: this.props.testBurgerState
        }

        this.showBurger.bind(this);
    }
    
    showBurger = (event) => {
        event.preventDefault(); 
        
        if (this.props.testBurgerState === true) {
            this.setState({
                isshowBurger: false
            })
            this.props.sendMobileBurgerState(false);
        } else {
            this.setState({
                isshowBurger: true
            })
            this.props.sendMobileBurgerState(true);
        }

    }

    render() {
        return (
            <div className="mobile-toggle" onClick={(event) => this.showBurger(event)}>
                <div className="mobile-toggle__burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="mobile-toggle__menu"></div>
            </div>
        );
    }
}

export default NavigationMobile;
