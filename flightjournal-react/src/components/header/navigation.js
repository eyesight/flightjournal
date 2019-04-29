import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {Link, withRouter} from 'react-router-dom';
import * as routes from '../../constants/routes';
import { getUser, logout } from '../../actions/UserActions';
import { connect } from 'react-redux';
import Scrollspy from 'react-scrollspy';

class Navigation extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            authUser: false,
            isActiveNavi: 'section-flugplanung',
            classnameFlugplanung: 'main-nav__link section-flugplanung',
            classnameFluege: 'main-nav__link section-fluege',
            classnameStartplaetze: 'main-nav__link section-startplaetze'
        };
        this.doLogOut = this.doLogOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
    }
    componentWillMount() {
        this.props.getUser();
        
    }

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        this.setState({
            navlinks: [...node.querySelectorAll('li')],
            navigation: node.querySelector('.main-nav')
        });
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

    handleClick(e){
        if (this.state.navigation.classList.contains('js-mobile-nav--visible')) {
            this.state.navigation.classList.remove('js-mobile-nav--visible');
        }
        
        this.props.sendMobileBurgerState(false);
    }

    render() {
        //if Landingpage is home and the user is authorised show the hole navigation, else just show logout/login
        let isHome = (this.props.location.pathname === '/' || this.props.location.pathname === routes.LANDING) ? true : false;
        let navi; 

        if(!this.state.authUser && isHome){
            navi = <ul className="main-nav__wrapper main-nav__wrapper--single">
                      <li className="main-nav__link">
                          <Link to={routes.LOGIN}>Login</Link>
                       </li>
                    </ul>
        }else if(this.state.authUser && isHome){
            navi = <Scrollspy className="main-nav__wrapper" items={ ['section-1', 'section-2', 'section-3'] } currentClassName="active">
                        <li onClick={this.handleClick} className={this.state.classnameFlugplanung}>
                            <a href='#flugplanung'>Flugplanung</a>
                        </li>
                        <li onClick={this.handleClick} className={this.state.classnameFluege}>
                            <a href='#fluege'>Flüge</a>
                        </li>
                        <li onClick={this.handleClick} className={this.state.classnameStartplaetze}>
                            <a href='#startplaetze'>Startplätze</a>
                        </li>
                        <li onClick={this.handleClick} className="main-nav__link">
                            <Link onClick={() => {this.doLogOut();}} to={routes.LANDING}>Logout</Link>
                        </li>
                    </Scrollspy>;
        }else{
            navi = null
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
