import React, { Component } from 'react';

class NavigationMobile extends Component {

    componentDidMount() {
        const burger = document.querySelector('.mobile-toggle');
        const navigation = document.querySelector('.main-nav');
        const logo = document.querySelector('.logo');
        let navlinks = document.querySelectorAll('.main-nav__link');

        burger.addEventListener('click', function (event){
            event.preventDefault();
            if (navigation.classList.contains('js-mobile-nav--visible')) {
                navigation.classList.remove('js-mobile-nav--visible');
                burger.classList.remove('js-mobile-toggle--active'); 
            } else {
                navigation.classList.add('js-mobile-nav--visible');
                burger.classList.add('js-mobile-toggle--active');
            }

            if (logo.classList.contains('js-mobile-logo--visible')) {
                logo.classList.remove('js-mobile-logo--visible');
            } else {
                logo.classList.add('js-mobile-logo--visible');
            }
        });
        navlinks = [].slice.call(navlinks);
        navlinks.forEach(function (e) {
            e.addEventListener('click', function (e) {
                if (navigation.classList.contains('js-mobile-nav--visible') && logo.classList.contains('js-mobile-logo--visible')) {
                    navigation.classList.remove('js-mobile-nav--visible');
                    logo.classList.remove('js-mobile-logo--visible');
                }
            });
        });
    }

    render() {
        return (
            <div className="mobile-toggle">
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
