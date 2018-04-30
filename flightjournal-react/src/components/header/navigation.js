import React, { Component } from 'react';
import Scrollchor from 'react-scrollchor';

class Navigation extends Component {
    render() {
        return (
        <div className="header__menu">
            <nav className="main-nav">
                <ul className="main-nav__wrapper">
                    <li className="main-nav__link">
                        <Scrollchor to="flugplanung">Flugplanung</Scrollchor>
                    </li>
                    <li className="main-nav__link">
                        <Scrollchor to="fluege">Flüge</Scrollchor>
                    </li>
                    <li className="main-nav__link">
                        <Scrollchor to="startplaetze">Startplätze</Scrollchor>
                    </li>
                    <li className="main-nav__link">
                        <a href="#x">Pilotenseite</a>
                    </li>
                </ul>
            </nav>
         </div>
        );
    }
}

export default Navigation;
