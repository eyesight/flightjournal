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
        let isForm = (this.props.location.pathname === routes.FLUGDATEN_ERFASSEN) ? true : false;
        let isFormStartplatz = (this.props.location.pathname === routes.STARTPLATZ_ERFASSEN) ? true : false;
        let isFormStartarea = (this.props.location.pathname === routes.STARTAREA_ERFASSEN) ? true : false;
        let navi;

        if(!this.state.authUser){
            navi = <ul className="main-nav__wrapper main-nav__wrapper--single">
                      <li className="main-nav__link">
                          <Link to={routes.LOGIN}>Login</Link>
                       </li>
                    </ul>
        }else if(this.state.authUser && isHome){
            navi = <ul className="main-nav__wrapper">
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
                            <Link onClick={() => {this.doLogOut();}} to={routes.LANDING}>Logout</Link>
                        </li>
                    </ul>;
        }else if(this.state.authUser && isForm){
            navi = <ul className="main-nav__wrapper main-nav__wrapper--single">
                        <li className="main-nav__link">
                            <Link className="main-nav__link-close-icon" to={routes.HOME}>
                            <div className="main-nav__icon-text">Abbrechen</div>
                                <div className="main-nav__icon">
                                    <span></span>
                                    <span></span>
                                </div>
                            </Link>
                        </li> 
                    </ul>
        }else if(this.state.authUser && isFormStartplatz){
            navi = <ul className="main-nav__wrapper main-nav__wrapper--single">
                        <li className="main-nav__link">
                            <Link className="main-nav__link-close-icon" to={routes.FLUGDATEN_ERFASSEN}>
                            <div className="main-nav__icon-text">Abbrechen</div>
                                <div className="main-nav__icon">
                                    <span></span>
                                    <span></span>
                                </div>
                            </Link>
                        </li> 
                    </ul>
        }else if(this.state.authUser && isFormStartarea){
            navi = <ul className="main-nav__wrapper main-nav__wrapper--single">
                        <li className="main-nav__link">
                            <Link className="main-nav__link-close-icon" to={this.props.history.goBack}>
                            <div className="main-nav__icon-text">Abbrechen</div>
                                <div className="main-nav__icon">
                                    <span></span>
                                    <span></span>
                                </div>
                            </Link>
                        </li> 
                    </ul>
        }else{
            navi = <ul className="main-nav__wrapper main-nav__wrapper--single">
                        <li className="main-nav__link">
                            <Link className="main-nav__link-back-icon" to={routes.HOME}>
                                <div className="main-nav__icon-text">Zurück zur Übersicht</div>
                                <div className="main-nav__icon">
                                    <span></span>
                                    <span></span>
                                </div>
                            </Link>
                        </li> 
                    </ul>
        }
        return (
            <div className="header__menu">
                <nav className="main-nav">
                    {navi}
                </nav>
             </div>
        );
    }
}
function mapStateToProps(state) {
    return { user: state.user };
}

export default withRouter(connect(mapStateToProps, { getUser, logout })(Navigation));
