import React, { Component } from 'react';
import { getUser } from '../../actions/UserActions';
import { getFlights} from '../../actions/FlightActions';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as routes from '../../constants/routes';
import  _ from 'lodash';

class FlightDetailContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flighttime: '',
            date: '',
            name: '',
            landeplatz: '',
            startplatz: '',
            flughoehe: ''
        };
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        this.props.getFlights();
        this.props.getUser();
        if (this.props.user.loading === false && this.props.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loading === false && nextProps.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          }
          
        if( nextProps.flight!== undefined){
            const currentFlight = nextProps.flight;
            this.setState({
                flighttime: currentFlight.flighttime,
                date: currentFlight.date,
                landeplatz: currentFlight.landingplace,
                startplatz: currentFlight.startplace,
                flughoehe: currentFlight.maxaltitude
            })
        }
    }

    render() {
        return (
            <main className="main">
                <section className="centered-layout">
                    <div>test Detail</div>
                    <div>{this.state.flighttime}</div>
                    <div>{this.state.date}</div>
                    <div>{this.state.name}</div>
                    <div>{this.state.landeplatz}</div>
                    <div>{this.state.startplatz}</div>
                    <div>{this.state.flughoehe}</div>
                </section>
            </main>
        );
    }
}

function mapStateToProps(state, props) {
    const key = props.match.params.id;
    return { 
        user: state.user,
        flight: _.get(state.flights, key),
    };
} 

export default withRouter(connect(mapStateToProps, { getUser, getFlights })(FlightDetailContainer));