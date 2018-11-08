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
            sorting: this.props.sort.sortBy,
        });
        this.props.dispatch(sortBy(e.currentTarget.getAttribute('data-value')));
     }

    render() {
        return (
            <thead>
            <tr>
                <th onClick={this.setSortby} className="table__header table--sort js-table--sort" data-value='date'><span className={`${(this.props.sort.sortBy === 'date') ? 'active' : ''}`}>Datum</span>
                    {this.props.sort.sortBy === 'date' ? <span className={`visible ${(this.props.sort.sortDirection === 'asc') ? 'arrow-up' : 'arrow-down'}`}> 
                        <svg version="1.1" className="svg-icon svg-icon--arrow" x="0px" y="0px" viewBox="0 0 11.1 13.6">
                            <path className="svg-icon__path" d="M5.6,12l4-4 M5.6,12l-4-4"/>
                            <line className="svg-icon__line" x1="5.6" y1="0" x2="5.6" y2="12"/>
                        </svg>
                    </span> : null}
                </th>
                <th onClick={this.setSortby} className="table__header table--sort js-table--sort" data-value='pilot'><span className={`${(this.props.sort.sortBy === 'pilot') ? 'active' : ''}`}>Pilot</span>
                {this.props.sort.sortBy === 'pilot' ? <span className={`visible ${(this.props.sort.sortDirection === 'asc') ? 'arrow-up' : 'arrow-down'}`}> 
                        <svg version="1.1" className="svg-icon svg-icon--arrow" x="0px" y="0px" viewBox="0 0 11.1 13.6">
                            <path className="svg-icon__path" d="M5.6,12l4-4 M5.6,12l-4-4"/>
                            <line className="svg-icon__line" x1="5.6" y1="0" x2="5.6" y2="12"/>
                        </svg>
                    </span> : null}
                </th>
                <th onClick={this.setSortby} className="table__header table--sort js-table--sort" data-value='startplace'><span className={`${(this.props.sort.sortBy === 'startplace') ? 'active' : ''}`}>Startplatz</span>
                    {this.props.sort.sortBy === 'startplace' ? <span className={`visible ${(this.props.sort.sortDirection === 'asc') ? 'arrow-up' : 'arrow-down'}`}> 
                        <svg version="1.1" className="svg-icon svg-icon--arrow" x="0px" y="0px" viewBox="0 0 11.1 13.6">
                            <path className="svg-icon__path" d="M5.6,12l4-4 M5.6,12l-4-4"/>
                            <line className="svg-icon__line" x1="5.6" y1="0" x2="5.6" y2="12"/>
                        </svg>
                    </span> : null}
                </th>
                <th onClick={this.setSortby} className="table__header table--sort js-table--sort" data-value='flighttime'><span className={`${(this.props.sort.sortBy === 'flighttime') ? 'active' : ''}`}>Flugzeit</span>
                    {this.props.sort.sortBy === 'flighttime' ? <span className={`visible ${(this.props.sort.sortDirection === 'asc') ? 'arrow-up' : 'arrow-down'}`}> 
                        <svg version="1.1" className="svg-icon svg-icon--arrow" x="0px" y="0px" viewBox="0 0 11.1 13.6">
                            <path className="svg-icon__path" d="M5.6,12l4-4 M5.6,12l-4-4"/>
                            <line className="svg-icon__line" x1="5.6" y1="0" x2="5.6" y2="12"/>
                        </svg>
                    </span> : null}
                </th>
                <th onClick={this.setSortby} className="table__header table--sortjs-table--sort" data-value='xcdistance'><span className={`${(this.props.sort.sortBy === 'xcdistance') ? 'active' : ''}`}>XC-Distanz</span>
                    {this.props.sort.sortBy === 'xcdistance' ? <span className={`visible ${(this.props.sort.sortDirection === 'asc') ? 'arrow-up' : 'arrow-down'}`}> 
                        <svg version="1.1" className="svg-icon svg-icon--arrow" x="0px" y="0px" viewBox="0 0 11.1 13.6">
                            <path className="svg-icon__path" d="M5.6,12l4-4 M5.6,12l-4-4"/>
                            <line className="svg-icon__line" x1="5.6" y1="0" x2="5.6" y2="12"/>
                        </svg>
                    </span> : null}
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