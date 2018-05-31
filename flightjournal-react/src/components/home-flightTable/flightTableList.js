import React, { Component } from 'react';
import * as routes from '../../constants/routes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFlights, deleteFlights } from '../../actions/FlightActions';
import { getFilterFlights } from '../../selectors/flightSelector';
import { getStartplaces } from '../../actions/StartplacesActions';
import { getPilots } from '../../actions/PilotActions';
import FlightTableSort from './flightTableSort';
import MessageBoxDelete from '../messageBoxDelete/messageBoxDelete';
import  _ from 'lodash';

class FlightTableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          flightkey: '',
          itemsToShow: 3,
          expanded: false,
          displayMessageBox: false,
          deleteID: ''
        };
        this.row = React.createRef();
        this.renderFlights = this.renderFlights.bind(this);
        this.showMore = this.showMore.bind(this);
        this.updateFlight = this.updateFlight.bind(this);
        this.deleteFunc = this.deleteFunc.bind(this);
      }
    componentWillMount() {
        this.props.getFlights();
        this.props.getPilots();
        this.props.getStartplaces();
    }

    updateFlight(e, item, index){
        e.preventDefault();
        console.log(item);
        this.props.history.push({
            pathname: routes.FLUGDATEN_ERFASSEN,
            state: {
              flightID: item,
              pilotData: index
            }
          })
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

    deleteFunc(e, id){
        //TODO: add Message-Box to delete flight
        e.preventDefault();
        this.props.deleteFlights(_.findKey(this.props.flights, {id:id}))
        this.setState({
            displayMessageBox: true,
            deleteID: id
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
                                    <td className="table__details"><a className="anchor table__link" onClick={(event) => {
                                        event.preventDefault(); 
                                        this.props.history.push({pathname: `/fligth/${x.id}`, state:{flightID: x.id}})}}>Flugdetails</a></td>
                                    <td className="table__details"><a className="anchor table__link" onClick={(event) => { this.setState({flightkey: x.id, inputPilot: this.props.flights[x.id]}); this.updateFlight(event, x.id, this.props.flights[x.id])}}>Bearbeiten</a></td>
                                    <td className="table__details"><a className="anchor table__link" onClick={(event) => {this.deleteFunc(event, x.id)}}>Löschen</a></td>
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
                {
                    this.state.displayMessageBox ? <MessageBoxDelete /> : null
                }
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