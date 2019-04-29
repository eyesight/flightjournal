import React, { Component } from 'react';
import FlightTable from './home-flightTable/flightTable';
import StartingPlaces from './home-startingplaces/startingplaces';
import { getUser } from '../actions/UserActions';
import { connect } from 'react-redux';
import { configureAnchors } from 'react-scrollable-anchor';
import Flugplanung from './home-flugplanung/flugplanung';

class StartMainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: false,
            heightOfFirstEl: 0,
            heightOfSecondEl: 0,
            heightOfThirdEl: 0
        };
    }

    componentWillMount() { 
        configureAnchors({offset: -100, scrollDuration: 600});
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
    render() {
        return (
            <main className="main">
                {this.state.authUser ?
                  <div>
                    <Flugplanung />
                    <FlightTable />
                    <StartingPlaces />
                  </div> :
                  <div className="start-container--logged-out">
                     <Flugplanung />
                  </div>
                }

            </main>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps, { getUser }) (StartMainContainer);
