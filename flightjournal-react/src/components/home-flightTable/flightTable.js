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
                    <button className="button-without-border" onClick={(event) => {event.preventDefault(); this.props.history.push(routes.FLUGDATEN_ERFASSEN)}}>
                    <svg version="1.1" className="plusicon" x="0px" y="0px" viewBox="0 0 32 32">
                        <g>
                            <circle className="plusicon__circle" cx="16" cy="16" r="16"/>
                            <path className="plusicon__path" d="M10.5,15.1V17H15v4.7h2V17h4.5v-1.9H17v-4.7h-2v4.7H10.5z"/>
                        </g>
                    </svg>
                    Flug hinzufügen
                    </button>
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