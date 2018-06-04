import React, { Component } from 'react';
import * as routes from '../../constants/routes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFlights, deleteFlights } from '../../actions/FlightActions';
import { getFilterFlights } from '../../selectors/flightSelector';
import { getStartplaces } from '../../actions/StartplacesActions';
import { getPilots } from '../../actions/PilotActions';
import FlightTableSort from './flightTableSort';
import MessageBox from '../messageBox/messageBox';
import ReactTransitionGroup from 'react-addons-transition-group';
import {TweenLite, TimelineLite} from 'gsap';

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
          cancelDelStatus: '',
          delStatus: false,
          ButtonDelClass: 'button',
          ButtonCancClass: 'button'
        };
        this.row = React.createRef();
        this.renderFlights = this.renderFlights.bind(this);
        this.showMore = this.showMore.bind(this);
        this.deleteFunc = this.deleteFunc.bind(this);
        this.cancelFunc = this.cancelFunc.bind(this);
        this.showMessageBox = this.showMessageBox.bind(this);
        this.flugdetails = this.flugdetails.bind(this);
        this.updateFlight = this.updateFlight.bind(this);
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
            this.setState({ itemsToShow: this.props.flights.length, expanded: true })
            ) : (
              this.setState({ itemsToShow: 3, expanded: false})
            )
    }

    showMessageBox(e, id){
        e.preventDefault();
        this.setState({
            showMessageBox: true, 
            deleteID: id
        })
    }

    deleteFunc(e){
        e.preventDefault();
        this.props.deleteFlights(this.state.deleteID)
        this.setState({
            showMessageBox: false,
            deleteID: '',
            ButtonDelClass: 'button clicked',
            ButtonCancClass: 'button'
        })
        tl.add("scene1")
          .to(document.querySelectorAll('.button'), 0, {opacity: 0}, "scene1")
          .to(document.querySelector('.messageBox__text'), 0, {opacity: 0}, "scene1")
          .to(document.querySelector('.checkmark'), 0, {display: 'inline-block', scale: 2}, "scene1+=0.1")
          .to(document.querySelector('.messageBox'), 0.1, {borderRadius: "50%", height: '200px', width: '200px'}, "scene1+=0.2")
          .fromTo(document.querySelector('.checkmark__kick'), 0.1, {width: '0'}, {width: '15px'}, "scene1+=0.2")
          .fromTo(document.querySelector('.checkmark__stem'), 0.1, {height: '0'}, {height: '25px'}, "scene1+=0.2")
    }

    cancelFunc(e){
        e.preventDefault();
        this.setState({
            showMessageBox: false,
            deleteID: '',
            ButtonDelClass: 'button',
            ButtonCancClass: 'button clicked'
        })        
        TweenLite.to(document.querySelector('.messageBox'), 0.3, {opacity:"0", scale : 0.1, y:"500px"});  
    }

    flugdetails(e, id){
        e.preventDefault(); 
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

    renderFlights(obj, pilot, startpl) {
        const flights = Object.keys(obj).map(i => obj[i]);
        const users = Object.keys(pilot).map(i => pilot[i]);
        const sp = Object.keys(startpl).map(i => startpl[i]);
        
        return flights.slice(0, this.state.itemsToShow).map((x, i) => {
            return users.map((y, i)=>{
                return sp.map((z, i)=>{
                    if(y.email === x.pilot){
                        if(x.startplace === z.id){
                            return (
                                <tr key={x.id}>
                                    <td className="table__date">{x.date}</td>
                                    <td className="table__pilot"><a className="table__link">{y.firstname}</a></td>
                                    <td className="table__start"><a className="table__link">{z.name}</a></td>
                                    <td className="table__duration">{x.flighttime} min</td>
                                    <td className="table__distance">{x.xcdistance} Kilometer</td>
                                    <td className="table__details"><a className="anchor table__link" onClick={(event) => {this.flugdetails(event, x.id)}}>Flugdetails</a></td>
                                    <td className="table__details"><a className="anchor table__link" onClick={(event) => {this.updateFlight(event, x.id)}}>Bearbeiten</a></td>
                                    <td className="table__details"><a className="anchor table__link" onClick={(event) => { this.showMessageBox(event, x.id)}}>Löschen</a></td>
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
                            buttonDelClass = {this.state.ButtonDelClass}
                            buttonCancClass = {this.state.ButtonCancClass}
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
        filteredFlights: getFilterFlights(state.flights, state.filter)
    };
}

export default withRouter(connect(mapStateToProps, { getFlights, deleteFlights, getStartplaces, getPilots }) (FlightTableList));