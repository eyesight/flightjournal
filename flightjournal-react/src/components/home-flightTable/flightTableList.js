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
        flightToCopyNow.pilotID = this.props.activeUserID;
        this.setState({
            flightToCopy: flightToCopyNow
        })
        this.props.saveFlights(flightToCopyNow).then(
            console.log('flug kopiert'),
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

    flugdetails(e, id){
        //e.preventDefault(); 
        this.props.history.push({pathname: `/fligth/${id}`, state:{flightID: id}})
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
              flightID: id,
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
                                    {/* <td className="table__pilot"><a className="table__link">{y.firstname}</a></td>
                                    <td className="table__start"><a className="table__link">{z.name}</a></td> */}
                                    <td className="table__pilot">{y.firstname}</td>
                                    <td className="table__start">{z.name}</td>
                                    <td className="table__duration">{utils.timeToHourMinString(x.flighttime)}</td>
                                    <td className="table__distance">{x.xcdistance} Kilometer</td>
                                    <td className="table__details"><a className="anchor table__link" onClick={(event) => {this.flugdetails(event, x.id)}}>Flugdetails</a></td>
                                    {isactiveuser ? <td className="table__details"><a className="anchor table__link" onClick={(event) => {this.updateFlight(event, x.id)}}>Bearbeiten</a></td> : null}
                                    <td className="table__details"><a className="anchor table__link" onClick={(event) => {this.copyFlight(event, x.id)}}>Kopieren</a></td>
                                    {isactiveuser ? <td className="table__details"><a className="anchor table__link" onClick={(event) => {this.showMessageBox(event, x.id, x.imgUrl)}}>Löschen</a></td> : null}
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

function mapStateToProps(state, props) {
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