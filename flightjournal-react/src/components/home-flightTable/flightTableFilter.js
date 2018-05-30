import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startYear, filterText, filterSelects } from '../../actions/FilterActions';
import DropDownItem from '../dropdownItem/dropdownItem';

let filtermonthArr = [];

let removeDuplicates = (arrArg, element) => {
    let double = false;
    let filterElement = arrArg.filter((elem, pos, arr) => {
        if(arr.indexOf(elem) === pos){
            double = false;
            return elem;
        }else {
             double = true;
             return '';
        }
    });

    if (double){
        let index = filterElement.indexOf(element);
        filterElement.splice(index, 1);
    }
  return filterElement;
}

class FlightTableFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startYearFilter: 2016,
          currentYearFilter: new Date().getFullYear(),
          filtermonth: []
        };
        this.renderYearFilter = this.renderYearFilter.bind(this);
        this.renderPilotFilter = this.renderPilotFilter.bind(this);
        this.chooseFilter = this.chooseFilter.bind(this);
        this.filterMonth = this.filterMonth.bind(this);
      }

    chooseFilter(e) {
        e.preventDefault();
        console.log()
        switch (e.target.getAttribute('data-filter')) {
            case 'pilot':
                    this.props.dispatch(filterText(e.target.getAttribute('data-value')));
                    break;
            case 'year':
                    this.props.dispatch(startYear(e.target.getAttribute('data-value')));
                    break;
            default:
                    return '';
        }        
     }

    renderYearFilter(filterYStart, filterYCurrent) {
        let yearFilter = [];
        for (let i=filterYStart; i <= filterYCurrent; i++) { 
            yearFilter.push(<DropDownItem key = {i.toString()}
                txt = {i}
                value = {i}
                chooseFilter = {this.chooseFilter}
                filtername = 'year'
             />);
        }
        return yearFilter;
    }

    filterMonth(e){
        e.preventDefault();
        filtermonthArr.push(e.target.getAttribute('data-value'));
        filtermonthArr = removeDuplicates(filtermonthArr, e.target.getAttribute('data-value'))
        this.setState({filtermonth: filtermonthArr}); 
        this.props.dispatch(filterSelects(filtermonthArr));
    }

    renderPilotFilter(filterPilots) {
        let pilotFilter = [];
        for (let i=0; i < filterPilots.length; i++) { 
            pilotFilter.push(<DropDownItem key = {filterPilots[i].id.toString()}
                txt = {filterPilots[i].firstname}
                value = {filterPilots[i].email}
                chooseFilter = {this.chooseFilter}
                filtername = 'pilot'
             />);
        }
        return pilotFilter;
    }

    render() {
            return (
                <div className="filter">
                    <ul className="filter__list">
                        <li><a onClick={this.filterMonth} data-value='01' data-filter='month' className="filter__list-item">Jan.</a></li>
                        <li><a onClick={this.filterMonth} data-value='02' data-filter='month' className="filter__list-item">Feb.</a></li>
                        <li><a onClick={this.filterMonth} data-value='03' data-filter='month' className="filter__list-item">Mär.</a></li>
                        <li><a onClick={this.filterMonth} data-value='04' data-filter='month' className="filter__list-item">Apr.</a></li>
                        <li><a onClick={this.filterMonth} data-value='05' data-filter='month' className="filter__list-item">Mai</a></li>
                        <li><a className="filter__list-item">Jun.</a></li>
                        <li><a className="filter__list-item">Jul.</a></li>
                        <li><a className="filter__list-item">Aug.</a></li>
                        <li><a className="filter__list-item">Sep.</a></li>
                        <li><a className="filter__list-item">Okt.</a></li>
                        <li><a className="filter__list-item">Nov.</a></li>
                        <li><a className="filter__list-item">Dez.</a></li>
                    </ul>
                    <div className="filter__list-dropdown">
                        <button className="filter__dropdown-item">Jahr wählen <i className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown filter__dropdown--short">
                            <a data-value='' data-filter='year' onClick={this.chooseFilter} className="filter__sub-dropdown-item">alle Jahre</a>
                                {
                                    this.renderYearFilter(this.state.startYearFilter, this.state.currentYearFilter)
                                }
                            </div>
                        </button>
                        <button className="filter__dropdown-item">Pilot wählen <i className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown filter__dropdown--short">
                                <a data-value='' data-filter='pilot' onClick={this.chooseFilter} className="filter__sub-dropdown-item">Jonas & Claudia</a>
                                {
                                    this.renderPilotFilter(this.props.pilots)
                                }
                            </div>
                        </button>
                    </div>
                </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {         
        pilots: state.pilots,
        filter: state.filter,
        flights: state.flights
    };
}

export default connect(mapStateToProps) (FlightTableFilter);