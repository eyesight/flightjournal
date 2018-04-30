import React, { Component } from 'react';
import Flugplanung from './flugplanung/flugplanung';
import FlightTable from './flight-table';
import StartingPlaces from './startingplaces';

class StartMain extends Component {
    render() {
        return (
            <main className="main">
                <Flugplanung />
                <FlightTable />
                <StartingPlaces />
            </main>
        );
    }
}

export default StartMain;
