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
          dropdownYearTxt: '',
          classNameYear: 'filter__dropdown-item',
          classNamePilot: 'filter__dropdown-item'
        };
        this.wrapperYearRef = React.createRef();
        this.wrapperPilotRef = React.createRef();
        this.renderYearFilter = this.renderYearFilter.bind(this);
        this.renderPilotFilter = this.renderPilotFilter.bind(this);
        this.chooseFilter = this.chooseFilter.bind(this);
        this.filterMonth = this.filterMonth.bind(this);
        this.renderMonthFilter = this.renderMonthFilter.bind(this);
        this.addClassToEl = this.addClassToEl.bind(this);
        this.removeClassFromEl = this.removeClassFromEl.bind(this);
        this.handleClickOutsideDropdown = this.handleClickOutsideDropdown.bind(this);
      }
      componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutsideDropdown);
      }
    
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutsideDropdown);
      }

    chooseFilter(e) {
        e.preventDefault();
        switch (e.target.getAttribute('data-filter')) {
            case 'pilot':
                    this.setState({
                        dropdownPilotTxt: e.target.getAttribute('data-name')
                    });
                    this.props.dispatch(filterText(e.target.getAttribute('data-value')));
                    this.removeClassFromEl('filter__dropdown-item', 'classNamePilot'); 
                    break;
            case 'year':
                    this.setState({
                        dropdownYearTxt: e.target.getAttribute('data-name')
                    });
                    this.props.dispatch(startYear(e.target.getAttribute('data-value')));
                    this.removeClassFromEl('filter__dropdown-item', 'classNameYear'); 
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
        let monthArr = ['Jan.', 'Feb.', 'März', 'April', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.']
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

    addClassToEl(e, addClassTo, stateName){
        let allClasses = this.state[stateName].split(' ');
        if(allClasses[1]){
            this.setState({
                [stateName]: allClasses[0]
            });
        }else{
            this.setState({
                [stateName]: addClassTo
            });
        }
    }

    removeClassFromEl(theClass, stateName){
        this.setState({
            [stateName]: theClass
        });
    }
    //To close dropdowns, when user clicks outside the dropdown. Detect, if the target is not one of the three dropdowns, then add the classes tho close them
    handleClickOutsideDropdown(event) {
        switch(true) {
            case this.wrapperYearRef.current.contains(event.target):
                this.setState({
                    classNamePilot: 'filter__dropdown-item'
                });
                break;
            case this.wrapperPilotRef.current.contains(event.target):
                this.setState({
                    classNameYear: 'filter__dropdown-item'
                });
                break;
            default:
                this.setState({
                    classNameYear: 'filter__dropdown-item',
                    classNamePilot: 'filter__dropdown-item'
                });
          }
      }

    //TODO add this to the dropdowns: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    render() {
        //TODO: add Dropdown Accessibility, for example: https://www.w3schools.com/bootstrap/bootstrap_dropdowns.asp
            return (
                <div className="filter">
                    <div className="filter__list">
                        {
                           this.renderMonthFilter(12)
                        }
                    </div>
                    <div className="filter__list-dropdown">
                        <div ref={this.wrapperYearRef} className={this.state.classNameYear} onClick={(event)=>{this.addClassToEl(event, 'filter__dropdown-item filter__dropdown-item--active', 'classNameYear')}}>{!this.state.dropdownYearTxt ? 'Jahr wählen': this.state.dropdownYearTxt} <i className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown filter__dropdown--short">
                                <DropDownItem
                                    txt = 'alle Jahre'
                                    value = ''
                                    chooseFilter = {this.chooseFilter}
                                    filtername = 'year'
                                    name = 'alle Jahre'
                                />
                                {
                                    this.renderYearFilter(this.state.startYearFilter, this.state.currentYearFilter)
                                }
                            </div>
                        </div>
                        <div ref={this.wrapperPilotRef} className={this.state.classNamePilot} onClick={(event)=>{this.addClassToEl(event, 'filter__dropdown-item filter__dropdown-item--active', 'classNamePilot')}}>{!this.state.dropdownPilotTxt ? 'Pilot wählen': this.state.dropdownPilotTxt}<i className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown filter__dropdown--short">
                                <DropDownItem
                                    txt = 'alle Piloten'
                                    value = ''
                                    chooseFilter = {this.chooseFilter}
                                    filtername = 'pilot'
                                    name = 'alle Piloten'
                                />
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