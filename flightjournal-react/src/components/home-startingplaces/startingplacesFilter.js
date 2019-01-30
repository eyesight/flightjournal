import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterAltitude, filterRegion, filterWinddirections, filterCountry, filterSearchtext } from '../../actions/FilterActions';
import DropDownItem from '../dropdownItem/dropdownItem';
import MulticheckFilter from '../multicheckFilter/multicheckFilter';
import { removeDuplicates } from '../../utils/removeDuplicates';
import { deleteDoublesinArray } from '../../utils/deleteDoublesinArray';

let filterwindArr = [];

class StartingplacesFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startHeightFilter: 500,
          currentHeightFilter: 4000,
          filterWinddirections: [],
          dropdownRegionTxt: '',
          dropdownHeightTxt: '',
          dropdownCountryTxt: 'Schweiz',
          classNameHeight: 'filter__dropdown-item',
          classNameRegion: 'filter__dropdown-item',
          classNameCountry: 'filter__dropdown-item'
        };
        this.wrapperCountryRef = React.createRef();
        this.wrapperRegionRef = React.createRef();
        this.wrapperHeightRef = React.createRef();
        this.renderHeightFilter = this.renderHeightFilter.bind(this);
        this.renderRegionFilter = this.renderRegionFilter.bind(this);
        this.chooseFilter = this.chooseFilter.bind(this);
        this.filterWind = this.filterWind.bind(this);
        this.renderWindFilter = this.renderWindFilter.bind(this);
        this.addClassToEl = this.addClassToEl.bind(this);
        this.removeClassFromEl = this.removeClassFromEl.bind(this);
        this.renderCountryFilter = this.renderCountryFilter.bind(this);
        this.handleClickOutsideDropdown = this.handleClickOutsideDropdown.bind(this);
      }


      componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutsideDropdown);
        this.props.dispatch(filterCountry('Schweiz'));
      }
    
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutsideDropdown);
      }

    chooseFilter(e) {
        e.preventDefault();
        switch (e.target.getAttribute('data-filter')) {
            case 'region':
                    this.setState({
                        dropdownRegionTxt: e.target.getAttribute('data-name')
                    });
                    this.props.dispatch(filterRegion(e.target.getAttribute('data-value')));
                    this.removeClassFromEl('filter__dropdown-item', 'classNameRegion'); 
                    break;
            case 'height':
                    this.setState({
                        dropdownHeightTxt: e.target.getAttribute('data-name')
                    });
                    this.props.dispatch(filterAltitude(e.target.getAttribute('data-value')));
                    this.removeClassFromEl('filter__dropdown-item', 'classNameHeight'); 
                    break;
            case 'country':
                    this.setState({
                        dropdownCountryTxt: e.target.getAttribute('data-name')
                    });
                    this.props.dispatch(filterCountry(e.target.getAttribute('data-value')));
                    this.removeClassFromEl('filter__dropdown-item', 'classNameCountry'); 
                    break;
            default:
                    return '';
        }       
     }

     renderHeightFilter(filterYStart, filterYCurrent) {
        let heightFilter = [];
        for (let i=filterYStart/500; i <= filterYCurrent/500; i++) { 
            let realheight = i*500;
            let heighttxt = `${realheight-500} bis ${realheight}\u00a0m`
            heightFilter.push(<DropDownItem key = {i.toString()}
                txt = {heighttxt}
                value = {realheight}
                chooseFilter = {this.chooseFilter}
                filtername = 'height'
                name = {heighttxt}
             />);
        }
        return heightFilter;
    }

    filterWind(e){
        e.preventDefault();
        filterwindArr.push(e.target.getAttribute('data-value'));
        filterwindArr = removeDuplicates(filterwindArr, e.target.getAttribute('data-value'))
        this.setState({filterWinddirections: filterwindArr}); 
        this.props.dispatch(filterWinddirections(filterwindArr));
    }

    renderCountryFilter(filterCountry) {
        let allReg = Object.keys(filterCountry).map(i => filterCountry[i]);
        let countryFilter = [];
        let countries = [];
        for (let i=0; i < allReg.length; i++) { 
            countries.push(allReg[i].country);
            countries = deleteDoublesinArray(countries);
        }
        for(let i2 = 0; i2 < countries.length; i2++){
            countryFilter.push(<DropDownItem key = {countries[i2]}
                txt = {countries[i2]}
                value = {countries[i2]}
                chooseFilter = {this.chooseFilter}
                filtername = 'country'
                name = {countries[i2]}
             />);
        }
        return countryFilter;
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
            let classesM = `filter__list-item ${(this.state.filterWinddirections.includes(windArr[i])) ? 'active' : '' }`
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
        this.setState({
            [stateName]: theClass
        });
    }
    //To close dropdowns, when user clicks outside the dropdown. Detect, if the target is not one of the three dropdowns, then add the classes tho close them
    handleClickOutsideDropdown(event) {
        switch(true) {
            case this.wrapperHeightRef.current.contains(event.target):
                this.setState({
                    classNameCountry: 'filter__dropdown-item',
                    classNameRegion: 'filter__dropdown-item'
                });
                break;
            case this.wrapperCountryRef.current.contains(event.target):
                this.setState({
                    classNameRegion: 'filter__dropdown-item',
                    classNameHeight: 'filter__dropdown-item'
                });
                break;
            case this.wrapperRegionRef.current.contains(event.target):
                this.setState({
                    classNameCountry: 'filter__dropdown-item',
                    classNameHeight: 'filter__dropdown-item'
                });
                break;
            default:
                this.setState({
                    classNameCountry: 'filter__dropdown-item',
                    classNameHeight: 'filter__dropdown-item',
                    classNameRegion: 'filter__dropdown-item'
                });
          }
      }
  

    render() {
        //TODO: add Dropdown Accessibility, for example: https://www.w3schools.com/bootstrap/bootstrap_dropdowns.asp
            return (
                <div className="filter-search"> 
                    <div className="filter-search__search">
                        <input className="filter-search__input" type='text' placeholder='Fluggebiet suchen' value={this.state.searchtext} 
                        onChange={(e) => {
                            this.props.dispatch(filterSearchtext(e.target.value));
                            }}>
                        </input> 
                        <svg version="1.1" className="svg-icon svg-icon--zoom" x="0px" y="0px" viewBox="0 0 21 21">
                            <path className="svg-icon__path" d="M14.5,8.9c0,3.2-2.6,5.7-5.7,5.7c-3.2,0-5.7-2.6-5.7-5.7s2.6-5.7,5.7-5.7C11.9,3.2,14.5,5.7,14.5,8.9z M21,19.4
                                c0-0.4-0.2-0.9-0.5-1.2l-4.3-4.3c1-1.5,1.6-3.3,1.6-5c0-4.9-3.9-8.9-8.9-8.9S0,3.9,0,8.9s3.9,8.9,8.9,8.9c1.8,0,3.5-0.6,5-1.6
                                l4.3,4.3c0.3,0.3,0.7,0.5,1.2,0.5C20.2,21,21,20.3,21,19.4z"/>
                        </svg>
                    </div>
                    <div className="filter">
                        <div className="filter__list">
                            {
                            this.renderWindFilter(this.props.winddirections)
                            }
                        </div>
                        <div className="filter__list-dropdown">
                            <div ref={this.wrapperCountryRef} className={this.state.classNameCountry} onClick={(event)=>{this.addClassToEl(event, 'filter__dropdown-item filter__dropdown-item--active', 'classNameCountry')}}>{!this.state.dropdownCountryTxt ? 'Land': this.state.dropdownCountryTxt}<i className="fas fa-angle-down"></i>
                                <div className="filter__sub-dropdown filter__dropdown--short">
                                    <DropDownItem
                                        txt = 'alle Länder'
                                        value = ''
                                        chooseFilter = {this.chooseFilter}
                                        filtername = 'country'
                                        name = 'alle Länder'
                                    />
                                    {
                                        this.renderCountryFilter(this.props.regions)
                                    }
                                </div>
                            </div>
                            <div ref={this.wrapperRegionRef} className={this.state.classNameRegion} onClick={(event)=>{this.addClassToEl(event, 'filter__dropdown-item filter__dropdown-item--active', 'classNameRegion')}}>{!this.state.dropdownRegionTxt ? 'Region': this.state.dropdownRegionTxt}<i className="fas fa-angle-down"></i>
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
                            <div ref={this.wrapperHeightRef} className={this.state.classNameHeight} onClick={(event)=>{this.addClassToEl(event, 'filter__dropdown-item filter__dropdown-item--active', 'classNameHeight')}}>{!this.state.dropdownHeightTxt ? 'Starthöhe': this.state.dropdownHeightTxt} <i className="fas fa-angle-down"></i>
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
                        </div> 
                    </div>
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        regions: state.regions,         
        startplaces: state.startplaces,
        filter: state.filter,
        winddirections: state.winddirections
    };
}

export default connect(mapStateToProps) (StartingplacesFilter); 