import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFilterFlights } from '../../selectors/flightSelector';
import { sortBy } from '../../actions/FilterActions';

class FlightTableSort extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.setSortby = this.setSortby.bind(this);
      }

    setSortby (e) {
        e.preventDefault();
        this.props.dispatch(sortBy(e.currentTarget.getAttribute('data-value')));
     }

    render() {
        return (
            <thead>
            <tr>
                <th onClick={this.setSortby} className="table__header table--sort js-table--sort" data-value='date'><span className="active">Datum</span><span
                    className="arrow-up visible"> &#8593;</span><span className="arrow-down"> &#8595;</span>
                </th>
                <th onClick={this.setSortby} className="table__header table--sort js-table--sort" data-value='pilot'><span>Pilot</span><span
                    className="arrow-up"> &#8593;</span><span className="arrow-down"> &#8595;</span></th>
                <th onClick={this.setSortby} className="table__header table--sort js-table--sort" data-value='startplace'><span>Startplatz</span><span
                    className="arrow-up"> &#8593;</span><span className="arrow-down">&#8595;</span></th>
                <th onClick={this.setSortby} className="table__header table--sort js-table--sort" data-value='flighttime'><span>Flugzeit</span><span className="arrow-up"> &#8593;</span><span className="arrow-down"> &#8595;</span>
                </th>
                <th onClick={this.setSortby} className="table__header table--sortjs-table--sort" data-value='xcdistance'><span>XC-Distanz</span><span className="arrow-up"> &#8593;</span><span className="arrow-down"> &#8595;</span>
                </th>
                <th>
                </th>
            </tr>
            </thead>
        );
    }
}

function mapStateToProps(state, props) {
    return {         
        filteredFlights: getFilterFlights(state.flights, state.filter)
    };
}

export default connect(mapStateToProps) (FlightTableSort);