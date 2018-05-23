import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFilterFlights } from '../../selectors/flightSelector';
import { filterText, startYear, sortBy, clear } from '../../actions/FilterActions';
import DropDownItem from '../dropdownItem/dropdownItem';

class FlightTableFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startYearFilter: 2016,
          currentYearFilter: new Date().getFullYear()
        };
        this.renderYearFilter = this.renderYearFilter.bind(this);
        this.chooseFilter = this.chooseFilter.bind(this);
      }
    componentWillMount() {
    
    }

    componentWillReceiveProps(nextProps) {
    }

    chooseFilter (e) {
        e.preventDefault();
        this.props.dispatch(startYear(e.target.getAttribute('data-value')));
        console.log(this.props.filter);
     }

    renderYearFilter(filterYStart, filterYCurrent) {
        let yearFilter = [];
        for (let i=filterYStart; i <= filterYCurrent; i++) { 
            yearFilter.push(<DropDownItem key = {i.toString()}
                txt = {i}
                value = {i}
                chooseFilter = {this.chooseFilter}
             />);
        }
        return yearFilter;
    }

    render() {
        const allflight = this.props.filteredFlights;
        return (
                <div className="filter">
                    <ul className="filter__list">
                        <li><a className="filter__list-item active" href="index.html">Jan.</a></li>
                        <li><a className="filter__list-item active" href="index.html">Feb.</a></li>
                        <li><a className="filter__list-item" href="index.html">Mär.</a></li>
                        <li><a className="filter__list-item" href="index.html">Apr.</a></li>
                        <li><a className="filter__list-item" href="index.html">Mai</a></li>
                        <li><a className="filter__list-item" href="index.html">Jun.</a></li>
                        <li><a className="filter__list-item" href="index.html">Jul.</a></li>
                        <li><a className="filter__list-item" href="index.html">Aug.</a></li>
                        <li><a className="filter__list-item" href="index.html">Sep.</a></li>
                        <li><a className="filter__list-item" href="index.html">Okt.</a></li>
                        <li><a className="filter__list-item" href="index.html">Nov.</a></li>
                        <li><a className="filter__list-item" href="index.html">Dez.</a></li>
                    </ul>
                    <div className="filter__list-dropdown">
                        <button className="filter__dropdown-item">Jahr wählen <i className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown filter__dropdown--short">
                                {
                                    this.renderYearFilter(this.state.startYearFilter, this.state.currentYearFilter)
                                }
                            </div>
                        </button>
                        <button className="filter__dropdown-item">Pilot wählen <i className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown filter__dropdown--short">
                                <a className="filter__sub-dropdown-item">Jonas & Claudia</a>
                                <a className="filter__sub-dropdown-item">Claudia</a>
                                <a className="filter__sub-dropdown-item">Jonas</a>
                            </div>
                        </button>
                    </div>
                </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {         
        filteredFlights: getFilterFlights(state.flights, state.filter)
    };
}

export default connect(mapStateToProps) (FlightTableFilter);