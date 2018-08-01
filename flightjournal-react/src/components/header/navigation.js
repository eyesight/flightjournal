import React, { Component } from 'react';
import Scrollchor from 'react-scrollchor';
import {Link, withRouter} from 'react-router-dom';
import * as routes from '../../constants/routes';
import { getUser, logout } from '../../actions/UserActions';
import { connect } from 'react-redux';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: false
        };
        this.doLogOut = this.doLogOut.bind(this);
    }
    componentWillMount() {
        this.props.getUser();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.email !== undefined) {
            this.setState({
                authUser: true
            });
        }else{
            this.setState({
                authUser: false
            });
        }
    }

    doLogOut(){
        this.setState({
            authUser: false
        });
        this.props.logout();
    }

    render() {
        //if Landingpage is home and the user is authorised show the hole navigation, else just show logout/login
        let isHome = (this.props.location.pathname === '/' || this.props.location.pathname === routes.HOME) ? true : false;
        return (
            <div className="header__menu">
                <nav className="main-nav">
                    {this.state.authUser && isHome ?
                    <ul className="main-nav__wrapper">
                        <li className="main-nav__link">
                            <Scrollchor to="flugplanung">Flugplanung</Scrollchor>
                        </li>
                        <li className="main-nav__link">
                            <Scrollchor to="fluege">Flüge</Scrollchor>
                        </li>
                        {/* <li className="main-nav__link">
                            <Scrollchor to="startplaetze">Startplätze</Scrollchor>
                        </li> */}
                        <li className="main-nav__link">
                            <Link onClick={() => {this.doLogOut();}} to={routes.LANDING}>Logout</Link>
                         </li>
                    </ul>
                            :
                    <ul className="main-nav__wrapper main-nav__wrapper--single">
                    {this.state.authUser ?
                        <li className="main-nav__link">
                            <Link onClick={() => {this.doLogOut();}} to={routes.LANDING}>Logout</Link>
                        </li> :
                        <li className="main-nav__link">
                            <Link to={routes.LOGIN}>Login</Link>
                        </li>
                        }
                    </ul>
                        }
                </nav>
             </div>
        );
    }
}
function mapStateToProps(state) {
    return { user: state.user };
}

export default withRouter(connect(mapStateToProps, { getUser, logout })(Navigation));
