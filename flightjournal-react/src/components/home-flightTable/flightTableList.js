import React, { Component } from 'react';
import * as routes from '../../constants/routes';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFlights, deleteFlights, saveFlights } from '../../actions/FlightActions';
import { getFilterFlights } from '../../selectors/flightSelector';
import { getStartplaces } from '../../actions/StartplacesActions';
import { getPilots } from '../../actions/PilotActions';
import { updateLastUpdateArray } from '../../utils/updateLastUpdateArray';
import Pagination from '../pagination/pagination';
import FlightTableSort from './flightTableSort';
import MessageBox from '../messageBox/messageBox';
import ReactTransitionGroup from 'react-addons-transition-group';
import {TweenLite, TimelineLite} from 'gsap';
import moment from 'moment';
import * as utils from '../../utils/timeToHourMinString';
import firebase from 'firebase';
import  _ from 'lodash';

const tl = new TimelineLite();

class FlightTableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          itemsToShow: 10,
          numberOfShowItems: 10,
          expanded: false,
          showMessageBox: false,
          showMessageBoxCopy: false,
          deleteID: '',
          copyID: '',
          deleteImages: [],
          flightToCopy: [],
          lastUpdate: '',
          pagination: 0,
          paginationTxt: 'test',
          itemsToShowStart: 0,
          hasNext: false,
          hasPrev: false,
          numberOfFlights: 0,
          updatePagination: false
        };
        this.row = React.createRef();
        this.renderFlights = this.renderFlights.bind(this);
        this.deleteFunc = this.deleteFunc.bind(this);
        this.cancelFunc = this.cancelFunc.bind(this);
        this.showMessageBox = this.showMessageBox.bind(this);
        this.deletePhotos = this.deletePhotos.bind(this);
        this.copyFlight = this.copyFlight.bind(this);
        this.editCopy = this.editCopy.bind(this);
        this.prevfunction = this.prevfunction.bind(this);
        this.nextfunction = this.nextfunction.bind(this);
        this.hasNext = this.hasNext.bind(this);
        this.renderPaginationTxt = this.renderPaginationTxt.bind(this);
      }

    componentWillMount() {
        this.props.getFlights();
        this.props.getPilots();
        this.props.getStartplaces();
    }

    componentWillReceiveProps(){
        const flights = Object.keys(this.props.flights).map(i => this.props.flights[i]);
        const filteredFlights = Object.keys(this.props.filteredFlights).map(i => this.props.filteredFlights[i]);
        this.setState({
            hasNext: (flights.length>10) ? true : false,
            numberOfFlights: filteredFlights.length,
            countOfNextSteps: Math.floor(this.state.numberOfFlights/this.state.numberOfShowItems)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        //if the flights will be filteret, and the pagination is set over the actual pagination, everything will resettet, so pagination and flights starts on 1
        if (this.props.filteredFlights.length !== prevProps.filteredFlights.length && prevState.pagination > Math.floor(this.props.filteredFlights.length/prevState.numberOfShowItems)) {
                this.setState({
                    pagination: 0,
                    hasNext: true,
                    hasPrev: false,
                    itemsToShowStart: 0,
                    itemsToShow: 10
                })
        }
      }

    showMessageBox(e, id, images){
        e.preventDefault();
        this.setState({
            showMessageBox: true, 
            deleteID: id,
            deleteImages: images
        })
    }

    deleteFunc(e){
        e.preventDefault();
        tl.add("scene1")
          .to(document.querySelectorAll('.button'), 0, {opacity: 0}, "scene1")
          .to(document.querySelector('.messageBox__text'), 0, {opacity: 0, display: 'none'}, "scene1")
          .to(document.querySelector('.button-wrapper__row'), 0, {opacity: 0, display: 'none'}, "scene1")
          .to(document.querySelector('.checkmark'), 0, {display: 'inline-block', scale: 2}, "scene1+=0.1")
          .to(document.querySelector('.messageBox'), 0.2, {borderRadius: "50%", height: '200px', width: '200px'}, "scene1+=0.2")
          .fromTo(document.querySelector('.checkmark__kick'), 0.2, {width: '0'}, {width: '15px'}, "scene1+=0.2")
          .fromTo(document.querySelector('.checkmark__stem'), 0.2, {height: '0'}, {height: '25px'}, "scene1+=0.2");

          setTimeout(() => {
            //Delete the images, when some exists
            if(this.state.deleteImages[0] !== ""){
                this.deletePhotos(this.state.deleteImages);
            }
            this.props.deleteFlights(this.state.deleteID);
            this.setState({
                showMessageBox: false,
                deleteID: '',
                deleteImages: []
            })
        }, 600);
    }

    deletePhotos(imgUrls) {
        imgUrls.map((x)=>{
            // Create a reference to the file to delete
            let desertRef = firebase.storage().refFromURL(x);
            // Delete the file
            return desertRef.delete().then(function() {
                // File deleted successfully
                console.log('file deleted');
                }).catch(function(error) {
                // Uh-oh, an error occurred!
                console.log(error);
            });
        })
    }

    copyFlight(e, id){
        e.preventDefault();
        let actualTimestamp = moment().format("YYYY-MM-DD HH:mm:ss Z");
        let flightToCopyNow = _.find(this.props.flights, { id: id });
        //delete data, which need to be new -> Images, FlightID, PilotID
        flightToCopyNow.id = '';
        flightToCopyNow.imgName = [''];
        flightToCopyNow.imgUrl = [''];

        //update write Data and last update
        flightToCopyNow.writeDate = new Date().toLocaleDateString("de-ch", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                    });
        flightToCopyNow.lastUpdate = updateLastUpdateArray(this.state.lastUpdate, actualTimestamp);

        //overwrite User with active-User
        let currentUser = {}; 
        currentUser.email = this.props.activeUser;
        currentUser.lastname = this.props.currentPilot.lastname;
        currentUser.name = this.props.currentPilot.firstname;
        currentUser.pilotId = this.props.activeUserID; 
        flightToCopyNow.pilot = currentUser;
        
        flightToCopyNow.copyOfFlightId = id; //add key copyOfFlightId
        this.setState({
            flightToCopy: flightToCopyNow
        })
        this.props.saveFlights(flightToCopyNow).then(
            this.setState({
                flightToCopy: [],
                showMessageBoxCopy: true
            }),
        );
    }

    editCopy(e, id){
        //get the last added flight of the active user => this must be the copy
        e.preventDefault();
        let lastFlightOfArray = _.findLastKey(this.props.flights, function(o) { return o.pilot.pilotId === id; });
        this.props.history.push({
            pathname: routes.FLUGDATEN_ERFASSEN + "/" + lastFlightOfArray
        });
    }

    cancelFunc(e, boxname){
        e.preventDefault();
        TweenLite.to(document.querySelector('.messageBox'), 0.3, {opacity:"0", scale : 0.1, y:"500px"});
        if(boxname === 'cancel'){
            setTimeout(() => { 
                this.setState({
                    showMessageBox: false,
                    deleteID: '',
                    deleteImages: []
                }) 
            }, 150); 
        }else{
            setTimeout(() => { 
                this.setState({
                    showMessageBoxCopy: false,
                }) 
            }, 150); 
        }
    }
    //TODO: make delete- & update-function just for active user (inside the function, not the ui)
    renderFlights(obj, startpl, pagination) {
        const flights = Object.keys(obj).map(i => obj[i]);
        const sp = Object.keys(startpl).map(i => startpl[i]);
        //if the user uses the next-button and then uses a filter, we have to reset the index-nrs. of the flight to use the slice-methode
        let itemsToShowIndex = (pagination === 0 || pagination < (this.state.itemsToShowStart/this.state.numberOfShowItems)) ? 0 : this.state.itemsToShowStart;
        let itemsToShowIndexMax = (pagination === 0 || pagination < (this.state.itemsToShowStart/this.state.numberOfShowItems)) ? this.state.numberOfShowItems : this.state.itemsToShow;
        return flights.slice(itemsToShowIndex, itemsToShowIndexMax).map((x) => {
            return sp.map((z)=>{
                if(x.startplace.area === z.id){
                    let startplaceName = _.find(z.startplaces, { id: x.startplace.startplace }).name;
                    let isactiveuser = x.pilot.email === this.props.activeUser ? true : false;
                    return (
                        <tr key={x.id}>
                            <td className="table__date">{x.date}</td>
                            <td className="table__pilot">{x.pilot.name}</td> 
                            <td className="table__start">{`${z.name}, ${startplaceName}`}</td>
                            <td className="table__duration">{utils.timeToHourMinString(x.flighttime)}</td>
                            <td className="table__distance">{x.xcdistance}&nbsp;km</td>
                            <td className="table__details"><Link className="anchor table__link" to={routes.FLUG + x.id}>Flugdetails</Link></td>
                            <td className="table__details table__details--icons"> 
                            {isactiveuser ? <Link className="table__icon" to={routes.FLUGDATEN_ERFASSEN + "/" + x.id}>
                                <svg version="1.1" className="svg-icon svg-icon--edit" x="0px" y="0px" viewBox="0 0 23.7 23.7">
                                    <path className="svg-icon__path" d="M20.5,6.3l2.4-2.4l-3.1-3.1l-2.4,2.4"/>
                                    <path className="svg-icon__path" d="M6.4,20.3l14.1-14l-3.1-3.1l-14.1,14l-2.5,5.5L6.4,20.3z M3.3,17.2l3.1,3.1"/>
                                </svg>
                            </Link> : null}
                            <button className="table__icon" onClick={(event) => {this.copyFlight(event, x.id)}}>
                                <svg version="1.1" className="svg-icon svg-icon--copy" x="0px" y="0px" viewBox="0 0 23.7 23.7" >
                                    <path className="svg-icon__path" d="M5.9,6h16.9v16.9H5.9V6z"/>
                                    <path className="svg-icon__path" d="M5.9,17.7H0.8V0.8h16.9v5.1"/>
                                </svg>
                            </button>
                            {isactiveuser ? <button className="table__icon" onClick={(event) => {this.showMessageBox(event, x.id, x.imgUrl)}}>
                                <svg version="1.1" className="svg-icon svg-icon--delete" x="0px" y="0px" viewBox="0 0 23.7 23.7">
                                    <path className="svg-icon__path" d="M2.2,3.7h19 M8.1,3.7V2.2c0-0.8,0.6-1.4,1.4-1.4H14c0.8,0,1.4,0.6,1.4,1.4l0,0v1.5 M19.2,3.7L18.1,21
                                        c0,1-0.8,1.8-1.8,1.8H7.1c-1,0-1.8-0.8-1.8-1.8L4.2,3.7"/>
                                    <path className="svg-icon__path" d="M11.7,6.7v13.2 M8.1,6.7l0.7,13.2 M15.4,6.7l-0.7,13.2"/>
                                </svg>
                                </button> : null}
                            </td>
                        </tr>
                    );
                }
                return null;
            })
        }); 
    }

    prevfunction(e, countOfNextSteps){
        e.preventDefault();
        this.setState((prevState)=>({
            pagination: prevState.pagination-1,
            itemsToShowStart: prevState.itemsToShowStart - this.state.numberOfShowItems,
            itemsToShow: prevState.itemsToShow - this.state.numberOfShowItems,
            hasPrev: (prevState.pagination <= 1 ) ? false: true,
            hasNext: ((this.state.pagination-1)<=countOfNextSteps) ? true : false
        }));
    }
    nextfunction(e, countOfNextSteps){
        e.preventDefault();
        this.setState((prevState)=>({
            pagination: prevState.pagination+1,
            itemsToShowStart: prevState.itemsToShowStart + this.state.numberOfShowItems,
            itemsToShow: prevState.itemsToShow + this.state.numberOfShowItems,
            hasPrev: (prevState.pagination >= 0 )? true: false,
            hasNext: (prevState.pagination+1 < countOfNextSteps || countOfNextSteps>this.state.pagination) ? true : false
        }));
    }

    hasNext(pagination, countOfFlights, countOfNextSteps){
        let istrue = true;
        if(pagination === countOfNextSteps){
            istrue = false;
        }else if ((countOfFlights%this.state.numberOfShowItems===0) && countOfNextSteps-1 === pagination){
            istrue = false;
        }else{
            istrue = true;
        }
        return istrue;
    }
    renderPaginationTxt(countOfNextSteps, countOfFlight){
        let pag = (countOfNextSteps === 0 || countOfNextSteps<this.state.pagination) ? 1 : this.state.itemsToShowStart+1
        let nrTxt = (this.state.pagination<countOfNextSteps) ? this.state.itemsToShow : countOfFlight;
        let paginationTxt = `${pag}–${nrTxt}`
        return paginationTxt;
    }

    render() {
        const allflight = this.props.filteredFlights;
        const allStartplaces = this.props.startplaces;
        let countOfNextSteps = Math.floor(allflight.length/this.state.numberOfShowItems);
        console.log();
        return (
            <div className="table-wrapper">
                {allflight.length !== 0 ? <div className="table-inner">
                <table className="table">
                    <FlightTableSort />
                    <tbody className='table__tbody'>
                        {this.renderFlights(allflight, allStartplaces, countOfNextSteps)}
                    </tbody>
                </table> 
                <Pagination
                    classNamePrev="pagination__prev"
                    classNameNext="pagination__next"
                    txt={this.renderPaginationTxt(countOfNextSteps, this.props.filteredFlights.length)}
                    prevfunction={(event) => {this.prevfunction(event, countOfNextSteps)}}
                    nextfunction={(event) => {this.nextfunction(event, countOfNextSteps)}}
                    hasPrev={(countOfNextSteps>0) ? this.state.hasPrev : false}
                    hasNext={(countOfNextSteps<this.state.pagination) ? false : this.hasNext(this.state.pagination, allflight.length, countOfNextSteps)}
                /> 
                </div> : <div className="table-inner table-inner--centered"><p className="table__noflights">keine Flüge vorhanden</p></div>}
                <ReactTransitionGroup component="div">
                {
                    this.state.showMessageBox ?
                    
                        <MessageBox
                            txt = 'Wills du den Flug wirklich löschen?'
                            button1Txt = 'Flug löschen'
                            button2Txt = 'Abbrechen'
                            functionBtn1 = {this.deleteFunc}
                            functionBtn2 = {(event) => {this.cancelFunc(event, 'cancel')}}
                            button1Class = 'button'
                            button2Class = 'button'
                        /> 
                    : null
                }
                </ReactTransitionGroup>
                <ReactTransitionGroup component="div">
                {
                    this.state.showMessageBoxCopy ?
                        <MessageBox
                            txt = 'Flug wurde erfolgreich kopiert.'
                            button1Txt = 'Flug editieren'
                            button2Txt = 'Zurück zur Übersicht'
                            functionBtn1 = {(event) => {this.editCopy(event, this.props.activeUserID)}}
                            functionBtn2 = {(event) => {this.cancelFunc(event, 'copy')}}
                            button1Class = 'button'
                            button2Class = 'button'
                        /> 
                    : null
                }
                </ReactTransitionGroup>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        flights: state.flights,
        startplaces: state.startplaces,
        pilots: state.pilots,
        currentPilot:  _.find(state.pilots, { email: state.user.email }),
        filter: state.filter,
        activeUser: state.user.email,
        activeUserID: state.user.uid,
        filteredFlights: getFilterFlights(state.flights, state.filter)
    };
}

export default withRouter(connect(mapStateToProps, { getFlights, deleteFlights, saveFlights, getStartplaces, getPilots }) (FlightTableList));