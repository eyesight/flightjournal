import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startYear, filterText, filterSelects } from '../../actions/FilterActions';
import DropDownItem from '../dropdownItem/dropdownItem';
import MulticheckFilter from '../multicheckFilter/multicheckFilter';
import { removeDuplicates } from '../../utils/removeDuplicates';

let filterwindArr = [];

class StartingplacesFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startHeightFilter: 500,
          currentHeightFilter: 4000,
          filterwind: [],
          dropdownRegionTxt: '',
          dropdownHeightTxt: '',
          classNameHeight: 'filter__dropdown-item',
          classNameRegion: 'filter__dropdown-item'
        };
        this.renderHeightFilter = this.renderHeightFilter.bind(this);
        this.renderRegionFilter = this.renderRegionFilter.bind(this);
        this.chooseFilter = this.chooseFilter.bind(this);
        this.filterWind = this.filterWind.bind(this);
        this.renderWindFilter = this.renderWindFilter.bind(this);
        this.addClassToEl = this.addClassToEl.bind(this);
        this.removeClassFromEl = this.removeClassFromEl.bind(this);
      }

    chooseFilter(e) {
        e.preventDefault();
        console.log(e.target);
        switch (e.target.getAttribute('data-filter')) {
            case 'region':
            console.log('region');
                    this.setState({
                        dropdownRegionTxt: e.target.getAttribute('data-name')
                    });
                    this.props.dispatch(filterText(e.target.getAttribute('data-value')));
                    this.removeClassFromEl('filter__dropdown-item', 'classNameRegion'); 
                    break;
            case 'height':
                    this.setState({
                        dropdownHeightTxt: e.target.getAttribute('data-name')
                    });
                    this.props.dispatch(startYear(e.target.getAttribute('data-value')));
                    this.removeClassFromEl('filter__dropdown-item', 'classNameHeight'); 
                    break;
            default:
                    return '';
        }       
     }

     renderHeightFilter(filterYStart, filterYCurrent) {
        let heightFilter = [];
        for (let i=filterYStart/500; i <= filterYCurrent/500; i++) { 
            let realheight = i*500;
            heightFilter.push(<DropDownItem key = {i.toString()}
                txt = {realheight}
                value = {realheight}
                chooseFilter = {this.chooseFilter}
                filtername = 'height'
                name = {realheight}
             />);
        }
        return heightFilter;
    }

    filterWind(e){
        e.preventDefault();
        filterwindArr.push(e.target.getAttribute('data-value'));
        filterwindArr = removeDuplicates(filterwindArr, e.target.getAttribute('data-value'))
        this.setState({filterwind: filterwindArr}); 
        this.props.dispatch(filterSelects(filterwindArr));
    }

    renderRegionFilter(filterRegion) {
        let allReg = Object.keys(filterRegion).map(i => filterRegion[i]);
        let regionFilter = [];
        for (let i=0; i < allReg.length; i++) { 
            regionFilter.push(<DropDownItem key = {allReg[i].id.toString()}
                txt = {allReg[i].name}
                value = {allReg[i].name}
                chooseFilter = {this.chooseFilter}
                filtername = 'region'
                name = {allReg[i].name}
             />);
        }
        return regionFilter;
    }

    renderWindFilter(filter){
        let filterwindArr = [];
        let windArr = Object.keys(filter);
        let windArrContent = Object.keys(filter).map(i => filter[i]);
        for (let i=0; i < windArr.length; i++) { 
            let classesM = `filter__list-item ${(this.state.filterwind.includes(windArr[i])) ? 'active' : '' }`
            filterwindArr.push(<MulticheckFilter 
                key={`k ${i.toString()}`}
                filteraction={this.filterWind}
                dataValue={windArr[i]} 
                dataFilter='wind'
                classNameValue={classesM}
                txt={windArrContent[i].name}
             />);
        }
        return filterwindArr;
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
        console.log('remove');
        console.log(stateName);
        this.setState({
            [stateName]: theClass
        });
    }

    render() {
        //TODO: add Dropdown Accessibility, for example: https://www.w3schools.com/bootstrap/bootstrap_dropdowns.asp
            return (
                <div className="filter">
                    <div className="filter__list">
                        {
                           this.renderWindFilter(this.props.winddirections)
                        }
                    </div>
                    <div className="filter__list-dropdown">
                        <div className={this.state.classNameHeight} onClick={(event)=>{this.addClassToEl(event, 'filter__dropdown-item filter__dropdown-item--active', 'classNameHeight')}}>{!this.state.dropdownHeightTxt ? 'Starthöhe': this.state.dropdownHeightTxt} <i className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown filter__dropdown--short">
                                <DropDownItem
                                    txt = 'alle Höhen'
                                    value = ''
                                    chooseFilter = {this.chooseFilter}
                                    filtername = 'height'
                                    name = 'alle Höhen'
                                />
                                {
                                    this.renderHeightFilter(this.state.startHeightFilter, this.state.currentHeightFilter)
                                }
                            </div>
                        </div>
                        <div className={this.state.classNameRegion} onClick={(event)=>{this.addClassToEl(event, 'filter__dropdown-item filter__dropdown-item--active', 'classNameRegion')}}>{!this.state.dropdownRegionTxt ? 'Region': this.state.dropdownRegionTxt}<i className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown filter__dropdown--short">
                                <DropDownItem
                                    txt = 'alle Regionen'
                                    value = ''
                                    chooseFilter = {this.chooseFilter}
                                    filtername = 'region'
                                    name = 'alle Regionen'
                                />
                                {
                                    this.renderRegionFilter(this.props.regions)
                                }
                            </div>
                        </div>
                    </div> 
                </div>
        );
    }
}

function mapStateToProps(state, props) {
    console.log(state.regions);
    return {
        regions: state.regions,         
        startplaces: state.startplaces,
        filter: state.filter,
        winddirections: state.winddirections
    };
}

export default connect(mapStateToProps) (StartingplacesFilter); 