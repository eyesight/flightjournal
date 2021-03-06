import React, { Component } from 'react';
import * as routes from '../../constants/routes';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../actions/UserActions';
import FlightTableFilter from './flightTableFilter';
import FlightTableList from './flightTableList';
import ScrollableAnchor from 'react-scrollable-anchor';



class FlightTable extends Component {
    
    render() {
        return (
            <section id="section-2" className="centered-layout section-fluege">
                <div className="centered-layout__header">
                    <ScrollableAnchor id={'fluege'}>
                        <h2 className="title-h2">Flugtagebuch.<br /><span className="title--regular">Unsere Flüge im Überblick.</span>
                        </h2>
                    </ScrollableAnchor>
                    <Link className="button-without-border button-without-border--with-icon" to={routes.FLUGDATEN_ERFASSEN}>
                    <svg version="1.1" className="svg-icon svg-icon--plus" x="0px" y="0px" viewBox="0 0 32 32">
                        <g>
                            <circle className="svg-icon__circle" cx="16" cy="16" r="16"/>
                            <path className="svg-icon__path" d="M10.5,15.1V17H15v4.7h2V17h4.5v-1.9H17v-4.7h-2v4.7H10.5z"/>
                        </g>
                    </svg>
                    Flug hinzufügen
                    </Link>
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