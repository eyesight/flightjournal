import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startYear, filterText, filterSelects } from '../../actions/FilterActions';
import DropDownItem from '../dropdownItem/dropdownItem';
import MulticheckFilter from '../multicheckFilter/multicheckFilter';
import { removeDuplicates } from '../../utils/removeDuplicates';

let filtermonthArr = [];

class FlightTableFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startYearFilter: 2016,
          currentYearFilter: new Date().getFullYear(),
          filtermonth: [],
          dropdownPilotTxt: '',
          dropdownYearTxt: ''
        };
        this.renderYearFilter = this.renderYearFilter.bind(this);
        this.renderPilotFilter = this.renderPilotFilter.bind(this);
        this.chooseFilter = this.chooseFilter.bind(this);
        this.filterMonth = this.filterMonth.bind(this);
        this.renderMonthFilter = this.renderMonthFilter.bind(this);
      }

    chooseFilter(e) {
        e.preventDefault();
        switch (e.target.getAttribute('data-filter')) {
            case 'pilot':
                    this.setState({
                        dropdownPilotTxt: e.target.getAttribute('data-name')
                    });
                    this.props.dispatch(filterText(e.target.getAttribute('data-value')));
                    break;
            case 'year':
                    this.setState({
                        dropdownYearTxt: e.target.getAttribute('data-name')
                    });
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
                name = {i}
             />);
        }
        return yearFilter;
    }

    filterMonth(e){
        e.preventDefault();
        console.log(e);
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
                name = {filterPilots[i].firstname}
             />);
        }
        return pilotFilter;
    }

    renderMonthFilter(filterM){
        let filterMonthArr = [];
        let valNr = '';
        let monthArr = ['Jan.', 'Feb.', 'Mär.', 'Apr.', 'Mai.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.']
        for (let i=0; i < filterM; i++) { 
            valNr = (i<9) ? `0${i+1}`: i+1;
            let classesM = `filter__list-item ${(this.state.filtermonth.includes(valNr.toString())) ? 'active' : '' }`
            filterMonthArr.push(<MulticheckFilter 
                key={`k ${i.toString()}`}
                filteraction={this.filterMonth}
                dataValue={valNr}
                dataFilter='month'
                classNameValue={classesM}
                txt={monthArr[i]}
             />);
        }
        return filterMonthArr;
    }

    render() {
            return (
                <div className="filter">
                    <ul className="filter__list">
                        {
                           this.renderMonthFilter(12)
                        }
                    </ul>
                    <div className="filter__list-dropdown">
                        <div className="filter__dropdown-item">{!this.state.dropdownYearTxt ? 'Jahr wählen': this.state.dropdownYearTxt} <i className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown filter__dropdown--short">
                            <a data-value='' data-filter='year' onClick={this.chooseFilter} className="filter__sub-dropdown-item">alle Jahre</a>
                                {
                                    this.renderYearFilter(this.state.startYearFilter, this.state.currentYearFilter)
                                }
                            </div>
                        </div>
                        <div className="filter__dropdown-item">{!this.state.dropdownPilotTxt ? 'Pilot wählen': this.state.dropdownPilotTxt}<i className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown filter__dropdown--short">
                                <a data-value='' data-filter='pilot' onClick={this.chooseFilter} className="filter__sub-dropdown-item">Jonas & Claudia</a>
                                {
                                    this.renderPilotFilter(this.props.pilots)
                                }
                            </div>
                        </div>
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