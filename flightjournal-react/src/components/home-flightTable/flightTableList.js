import React, { Component } from 'react';
import * as routes from '../../constants/routes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFlights, deleteFlights, saveFlights } from '../../actions/FlightActions';
import { getFilterFlights } from '../../selectors/flightSelector';
import { getStartplaces } from '../../actions/StartplacesActions';
import { getPilots } from '../../actions/PilotActions';
import FlightTableSort from './flightTableSort';
import MessageBox from '../messageBox/messageBox';
import ReactTransitionGroup from 'react-addons-transition-group';
import {TweenLite, TimelineLite} from 'gsap';
import * as utils from '../../utils/timeToHourMinString';
import firebase from 'firebase';
import  _ from 'lodash';

const tl = new TimelineLite();

class FlightTableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          flightkey: '',
          itemsToShow: 3,
          expanded: false,
          showMessageBox: false,
          deleteID: '',
          deleteImages: [],
          flightToCopy: []
        };
        this.row = React.createRef();
        this.renderFlights = this.renderFlights.bind(this);
        this.showMore = this.showMore.bind(this);
        this.deleteFunc = this.deleteFunc.bind(this);
        this.cancelFunc = this.cancelFunc.bind(this);
        this.showMessageBox = this.showMessageBox.bind(this);
        this.flugdetails = this.flugdetails.bind(this);
        this.updateFlight = this.updateFlight.bind(this);
        this.deletePhotos = this.deletePhotos.bind(this);
        this.copyFlight = this.copyFlight.bind(this);
      }

    componentWillMount() {
        this.props.getFlights();
        this.props.getPilots();
        this.props.getStartplaces();
    }

    showMore(e){
        e.preventDefault();
        this.state.itemsToShow === 3 ? 
            (
            this.setState({ itemsToShow: this.props.filteredFlights.length, expanded: true })
            ) : (
              this.setState({ itemsToShow: 3, expanded: false})
            )
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
        let flightToCopyNow = _.find(this.props.flights, { id: id });
        //delete data, which need to be new -> Images, FlightID, PilotID
        flightToCopyNow.id = '';
        flightToCopyNow.imgName = [''];
        flightToCopyNow.imgUrl = [''];
        //overwrite User with active-User
        flightToCopyNow.pilot = this.props.activeUser;
        flightToCopyNow.pilotId = this.props.activeUserID;
        this.setState({
            flightToCopy: flightToCopyNow
        })
        this.props.saveFlights(flightToCopyNow).then(
            this.setState({
                flightToCopy: []
            })
        );
    }

    cancelFunc(e){
        e.preventDefault();
        TweenLite.to(document.querySelector('.messageBox'), 0.3, {opacity:"0", scale : 0.1, y:"500px"});
        setTimeout(() => { 
            this.setState({
                showMessageBox: false,
                deleteID: '',
                deleteImages: []
            }) 
        }, 150);  
    }

    flugdetails(id){
        this.props.history.push({pathname: `/fligth/${id}`, state:{flightId: id}})
    }

    updateFlight(e, id){
        e.preventDefault(); 
        this.setState({
            flightkey: id, 
            inputPilot: this.props.flights[id]
        }); 
        this.props.history.push({
            pathname: routes.FLUGDATEN_ERFASSEN,
            state: {
              flightId: id,
              pilotData: this.props.flights[id]
            }
          })
    }
    //TODO: make delete- & update-function just for active user (inside the function, not the ui)
    renderFlights(obj, pilot, startpl) {
        const flights = Object.keys(obj).map(i => obj[i]);
        const users = Object.keys(pilot).map(i => pilot[i]);
        const sp = Object.keys(startpl).map(i => startpl[i]);

        return flights.slice(0, this.state.itemsToShow).map((x) => {
            return users.map((y)=>{
                return sp.map((z)=>{
                    if(y.email === x.pilot){
                        if(x.startplace === z.id){
                            let isactiveuser = y.email === this.props.activeUser ? true : false;
                            return (
                                <tr key={x.id}>
                                    <td className="table__date">{x.date}</td>
                                    <td className="table__pilot">{y.firstname}</td>
                                    <td className="table__start">{z.name}</td>
                                    <td className="table__duration">{utils.timeToHourMinString(x.flighttime)}</td>
                                    <td className="table__distance">{x.xcdistance} Kilometer</td>
                                    <td className="table__details"><a className="anchor table__link" onClick={(event) => {this.flugdetails(x.id)}}>Flugdetails</a></td>
                                    <td className="table__details table__details--icons"> {isactiveuser ? 
                                    <a className="table__icon" onClick={(event) => {this.updateFlight(event, x.id)}}>
                                        <svg version="1.1" className="svg-icon svg-icon--delete" x="0px" y="0px" viewBox="0 0 23.7 23.7">
                                            <path className="svg-icon__path" d="M20.5,6.3l2.4-2.4l-3.1-3.1l-2.4,2.4"/>
                                            <path className="svg-icon__path" d="M6.4,20.3l14.1-14l-3.1-3.1l-14.1,14l-2.5,5.5L6.4,20.3z M3.3,17.2l3.1,3.1"/>
                                        </svg>
                                    </a> : null}
                                    <a className="table__icon" onClick={(event) => {this.copyFlight(event, x.id)}}>
                                        <svg version="1.1" className="svg-icon svg-icon--delete" x="0px" y="0px" viewBox="0 0 23.7 23.7" >
                                            <path className="svg-icon__path" d="M5.9,6h16.9v16.9H5.9V6z"/>
                                            <path className="svg-icon__path" d="M5.9,17.7H0.8V0.8h16.9v5.1"/>
                                        </svg>
                                    </a>
                                    {isactiveuser ? <a className="table__icon" onClick={(event) => {this.showMessageBox(event, x.id, x.imgUrl)}}>
                                        <svg version="1.1" className="svg-icon svg-icon--delete" x="0px" y="0px" viewBox="0 0 23.7 23.7">
                                            <path className="svg-icon__path" d="M2.2,3.7h19 M8.1,3.7V2.2c0-0.8,0.6-1.4,1.4-1.4H14c0.8,0,1.4,0.6,1.4,1.4l0,0v1.5 M19.2,3.7L18.1,21
                                                c0,1-0.8,1.8-1.8,1.8H7.1c-1,0-1.8-0.8-1.8-1.8L4.2,3.7"/>
                                            <path className="svg-icon__path" d="M11.7,6.7v13.2 M8.1,6.7l0.7,13.2 M15.4,6.7l-0.7,13.2"/>
                                        </svg>
                                       </a> : null}
                                    </td>
                                </tr>
                            );
                        }
                    } 
                    return null;
               })
            })
          
        }); 
    }

    render() {
        const allflight = this.props.filteredFlights;
        const allPilots = this.props.pilots;
        const allStartplaces = this.props.startplaces;

        return (
            <div className="table-wrapper">
                <div className="table-inner">
                <table className="table">
                    <FlightTableSort />
                    <tbody className='table__tbody'>
                        {this.renderFlights(allflight, allPilots, allStartplaces)}
                    </tbody> 
                </table>
                {
                    allflight.length>3 ? 
                    <div className="button-wrapper button-wrapper--top"> 
                        <button onClick={this.showMore} className="button-without-border button-without-border--small">{this.state.expanded ? (<span>- weniger Flüge anzeigen</span>) : (<span>+ mehr Flüge anzeigen</span>)}</button>
                    </div> : null
                }
                </div>
                <ReactTransitionGroup component="div">
                {
                    this.state.showMessageBox ?
                    
                        <MessageBox
                            txt = 'Wills du den Flug wirklich löschen?'
                            buttonDeleteTxt = 'Flug löschen'
                            buttonCancelTxt = 'Abbrechen'
                            functionDelete = {this.deleteFunc}
                            functionCancel = {this.cancelFunc}
                            buttonDelClass = 'button'
                            buttonCancClass = 'button'
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
        filter: state.filter,
        activeUser: state.user.email,
        activeUserID: state.user.uid,
        filteredFlights: getFilterFlights(state.flights, state.filter)
    };
}

export default withRouter(connect(mapStateToProps, { getFlights, deleteFlights, saveFlights, getStartplaces, getPilots }) (FlightTableList));