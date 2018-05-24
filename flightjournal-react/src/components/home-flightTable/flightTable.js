import React, { Component } from 'react';
import * as routes from '../../constants/routes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../actions/UserActions';
import FlightTableFilter from './flightTableFilter';
import FlightTableList from './flightTableList';


class FlightTable extends Component {
    render() {
        return (
            <section id="fluege" className="centered-layout">
                <div className="centered-layout__header">
                    <h2 className="title-h2">Flugtagebuch.<br /><span className="title--regular">Unsere Flüge im Überblick.</span>
                    </h2>
                    <button className="button-without-border" onClick={(event) => {event.preventDefault(); this.props.history.push(routes.FLUGDATEN_ERFASSEN)}}>+ Flug hinzufügen</button>
                </div>
                <FlightTableFilter />
                <FlightTableList />
            </section>
        );
    }
}

function mapStateToProps(state, props) {
    return { 
        user: state.user,
    };
}

export default withRouter(connect(mapStateToProps, { getUser }) (FlightTable));