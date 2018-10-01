import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFilterFlights } from '../../selectors/flightSelector';
import { sortBy, sortDirection } from '../../actions/FilterActions';

class FlightTableSort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sorting: 'date',
            sDirection: 'desc'
        };
        this.setSortby = this.setSortby.bind(this);
      }

      componentWillMount() {
        this.props.dispatch(sortBy(this.state.sorting));
        this.props.dispatch(sortDirection(this.state.sDirection));
    }

    setSortby (e) {
        e.preventDefault();
        if(this.props.sort.sortBy === e.currentTarget.getAttribute('data-value')){
            if(this.props.sort.sortDirection === 'asc'){
                this.props.dispatch(sortDirection('desc'));
            } else {
                this.props.dispatch(sortDirection('asc'));
            }
        }else{
            this.props.dispatch(sortDirection('asc'));
        }
        
        this.setState({
            sorting: this.props.sort.sortBy
        });
        this.props.dispatch(sortBy(e.currentTarget.getAttribute('data-value')));
     }

    render() {
        return (
            <thead>
            <tr>
                <th onClick={this.setSortby} className="table__header table--sort js-table--sort" data-value='date'><span className={`${(this.props.sort.sortBy === 'date') ? 'active' : ''}`}>Datum</span>
                    <span className={`arrow-up ${(this.props.sort.sortDirection === 'asc' && this.props.sort.sortBy === 'date') ? 'visible' : ''}`}> &#8593;</span>
                    <span className={`arrow-up ${(this.props.sort.sortDirection === 'desc' && this.props.sort.sortBy === 'date') ? 'visible' : ''}`}> &#8595;</span>
                </th>
                <th onClick={this.setSortby} className="table__header table--sort js-table--sort" data-value='pilot'><span className={`${(this.props.sort.sortBy === 'pilot') ? 'active' : ''}`}>Pilot</span>
                    <span className={`arrow-up ${(this.props.sort.sortDirection === 'asc' && this.props.sort.sortBy === 'pilot') ? 'visible' : ''}`}> &#8593;</span>
                    <span className={`arrow-up ${(this.props.sort.sortDirection === 'desc' && this.props.sort.sortBy === 'pilot') ? 'visible' : ''}`}> &#8595;</span>
                </th>
                <th onClick={this.setSortby} className="table__header table--sort js-table--sort" data-value='startplace'><span className={`${(this.props.sort.sortBy === 'startplace') ? 'active' : ''}`}>Startplatz</span>
                    <span className={`arrow-up ${(this.props.sort.sortDirection === 'asc' && this.props.sort.sortBy === 'startplace') ? 'visible' : ''}`}> &#8593;</span>
                    <span className={`arrow-up ${(this.props.sort.sortDirection === 'desc' && this.props.sort.sortBy === 'startplace') ? 'visible' : ''}`}> &#8595;</span>
                </th>
                <th onClick={this.setSortby} className="table__header table--sort js-table--sort" data-value='flighttime'><span className={`${(this.props.sort.sortBy === 'flighttime') ? 'active' : ''}`}>Flugzeit</span>
                    <span className={`arrow-up ${(this.props.sort.sortDirection === 'asc' && this.props.sort.sortBy === 'flighttime') ? 'visible' : ''}`}> &#8593;</span>
                    <span className={`arrow-up ${(this.props.sort.sortDirection === 'desc' && this.props.sort.sortBy === 'flighttime') ? 'visible' : ''}`}> &#8595;</span>
                </th>
                <th onClick={this.setSortby} className="table__header table--sortjs-table--sort" data-value='xcdistance'><span className={`${(this.props.sort.sortBy === 'xcdistance') ? 'active' : ''}`}>XC-Distanz</span>
                    <span className={`arrow-up ${(this.props.sort.sortDirection === 'asc' && this.props.sort.sortBy === 'xcdistance') ? 'visible' : ''}`}> &#8593;</span>
                    <span className={`arrow-up ${(this.props.sort.sortDirection === 'desc' && this.props.sort.sortBy === 'xcdistance') ? 'visible' : ''}`}> &#8595;</span>
                </th>
                <th className="table__header table--sort js-table--sort">&nbsp;
                </th>
                <th className="table__header table--sort js-table--sort">&nbsp;
                </th>
                <th className="table__header table--sort js-table--sort">&nbsp;
                </th>
                <th className="table__header table--sort js-table--sort">&nbsp;
                </th>
            </tr>
            </thead>
        );
    }
}

function mapStateToProps(state, props) {
    return {         
        sort: state.filter,
        filteredFlights: getFilterFlights(state.flights, state.filter)
    };
}

export default connect(mapStateToProps) (FlightTableSort);