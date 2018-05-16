import React, { Component } from 'react';
import { getUser } from '../../actions/UserActions';
import { getFlights} from '../../actions/FlightActions';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as routes from '../../constants/routes';

class FlightDetailContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        //if history.location.state is set (if someone likes to update a Flight), set the values of Form-Input-Field
        if( nextProps.flights['0']!== undefined && this.props.history.location.state!==undefined && this.props.history.location.state.flightID !== '' && this.props.history.location.state.flightID !== [] ){
            const FlightData = Object.keys(nextProps.flights).map(i => nextProps.flights[i]);
            const FlightDatakey = Object.keys(nextProps.flights);
            let dataindex = '';
            let currentFlight = FlightData.map((item, ind) => {
                if(this.props.history.location.state.flightID === FlightDatakey[ind]){
                    dataindex = ind.toString();
                    return FlightData[ind];
                } return null;
            })

            if(currentFlight !==null || currentFlight !==undefined || currentFlight !==[] || currentFlight[dataindex] !== undefined || currentFlight[dataindex] !== null){
                //get the hours and minutes and set into state
                this.setState({
                    flighttime: currentFlight[dataindex].flighttime,
                    date: currentFlight[dataindex].date,
                    name: currentFlight[dataindex].name,
                    landeplatz: currentFlight[dataindex].landingplace,
                    startplatz: currentFlight[dataindex].startplace,
                    flughoehe: currentFlight[dataindex].maxaltitude
                })
            }
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

function mapStateToProps(state) {
    return { 
        user: state.user,
        flights: state.flights
    };
}

export default withRouter(connect(mapStateToProps, { getUser, getFlights })(FlightDetailContainer));