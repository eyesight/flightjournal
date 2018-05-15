import React, { Component } from 'react';
import * as routes from '../../constants/routes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getFlights, saveFlights, deleteFlights, updateFlights } from '../../actions/FlightActions';
import { getStartplaces, saveStartplaces, deleteStartplaces } from '../../actions/StartplacesActions';
import { getUser } from '../../actions/UserActions';
import { getPilots } from '../../actions/PilotActions';


class FlightTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
          flightkey: '',
          itemsToShow: 4,
          expanded: false
        };
        this.row = React.createRef();
        this.renderFlights = this.renderFlights.bind(this);
        this.showMore = this.showMore.bind(this);
        this.updateFlight = this.updateFlight.bind(this);
      }
    componentWillMount() {
        this.props.getFlights();
        this.props.getUser();
        this.props.getPilots();
        this.props.getStartplaces();
        if (this.props.user.loading === false && this.props.user.email === undefined) {
            this.props.history.replace(routes.LOGIN);
          }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loading === false && nextProps.user.email === undefined) {
            this.props.history.replace(routes.LOGIN);
          }
    }

    updateFlight(e, item, index){
        e.preventDefault();

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
        this.state.itemsToShow === 4 ? 
            (
            this.setState({ itemsToShow: this.props.flights.length, expanded: true })
            ) : (
              this.setState({ itemsToShow: 4, expanded: false})
            )
    }

    renderFlights(obj, pilot, startpl) {
        const flights = Object.keys(obj).map(i => obj[i]);
        const flightskey = Object.keys(obj);
        const users = Object.keys(pilot).map(i => pilot[i]);
        const sp = Object.keys(startpl).map(i => startpl[i]);
        const spkey = Object.keys(startpl);
        
        return flights.slice(0, this.state.itemsToShow).map((x, index) => {
            return users.map((y, i)=>{
                return sp.map((z, i)=>{
                    if(y.email === x.pilot){
                        if(x.startplace === spkey[i]){
                            return (
                                <tr key={flightskey[index]}>
                                    <td className="table__date">{x.date}</td>
                                    <td className="table__pilot"><a className="table__link">{y.firstname}</a></td>
                                    <td className="table__start"><a className="table__link">{z.name}</a></td>
                                    <td className="table__duration">{x.flighttime} min</td>
                                    <td className="table__distance">{x.xcdistance} Kilometer</td>
                                    <td className="table__details"><a className="anchor table__link" onClick={() => this.setState({flightkey: flightskey[index], inputPilot: this.props.flights[flightskey[index]].pilot})}>Flugdetails</a></td>
                                    <td className="table__details"><a className="anchor table__link" onClick={(event) => { this.setState({flightkey: flightskey[index], inputPilot: this.props.flights[flightskey[index]].pilot}); this.updateFlight(event, flightskey[index], this.props.flights[flightskey[index]].pilot)}}>Bearbeiten</a></td>
                                    <td className="table__details"><a className="anchor table__link" onClick={() => this.props.deleteFlights(flightskey[index])}>Löschen</a></td>
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
        const allflight = this.props.flights;
        const loading = this.props.flights['0'];

        const allPilots = this.props.pilots;
        const allStartplaces = this.props.startplaces;

        return (
            <section id="fluege" className="centered-layout">
                <div className="centered-layout__header">
                    <h2 className="title-h2">Flugtagebuch.<br /><span className="title--regular">Unsere Flüge im Überblick.</span>
                    </h2>
                    <button className="button-without-border" onClick={(event) => {event.preventDefault(); this.props.history.push(routes.FLUGDATEN_ERFASSEN)}}>+ Flug hinzufügen</button>
                </div>
                <div className="filter">
                    <ul className="filter__list">
                        <li><a className="filter__list-item active" href="index.html">Jan.</a></li>
                        <li><a className="filter__list-item active" href="index.html">Feb.</a></li>
                        <li><a className="filter__list-item" href="index.html">Mär.</a></li>
                        <li><a className="filter__list-item" href="index.html">Apr.</a></li>
                        <li><a className="filter__list-item" href="index.html">Mai</a></li>
                        <li><a className="filter__list-item" href="index.html">Jun.</a></li>
                        <li><a className="filter__list-item" href="index.html">Jul.</a></li>
                        <li><a className="filter__list-item" href="index.html">Aug.</a></li>
                        <li><a className="filter__list-item" href="index.html">Sep.</a></li>
                        <li><a className="filter__list-item" href="index.html">Okt.</a></li>
                        <li><a className="filter__list-item" href="index.html">Nov.</a></li>
                        <li><a className="filter__list-item" href="index.html">Dez.</a></li>
                    </ul>
                    <div className="filter__list-dropdown">
                        <button className="filter__dropdown-item filter__dropdown--short">Jahr wählen <i
                            className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown">
                                <a className="filter__sub-dropdown-item">2018</a>
                                <a className="filter__sub-dropdown-item">2017</a>
                                <a className="filter__sub-dropdown-item">2016</a>
                            </div>
                        </button>
                        <button className="filter__dropdown-item">Pilot wählen <i className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown filter__dropdown--short">
                                <a className="filter__sub-dropdown-item">Jonas & Claudia</a>
                                <a className="filter__sub-dropdown-item">Claudia</a>
                                <a className="filter__sub-dropdown-item">Jonas</a>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="table-wrapper">
                    <div className="table-inner">
                    {loading ? <table className="table">
                            <thead>
                            <tr>
                                <th className="table__header table--sort js-table--sort"><span className="active">Datum</span><span
                                    className="arrow-up visible"> &#8593;</span><span className="arrow-down"> &#8595;</span>
                                </th>
                                <th className="table__header table--sort js-table--sort"><span>Pilot</span><span
                                    className="arrow-up"> &#8593;</span><span className="arrow-down"> &#8595;</span></th>
                                <th className="table__header table--sort js-table--sort"><span>Startplatz</span><span
                                    className="arrow-up"> &#8593;</span><span className="arrow-down">&#8595;</span></th>
                                <th className="table__header table--sort js-table--sort">
                                    <span>Flugzeit</span><span className="arrow-up"> &#8593;</span><span className="arrow-down"> &#8595;</span>
                                </th>
                                <th className="table__header table--sortjs-table--sort">
                                    <span>XC-Distanz</span><span className="arrow-up"> &#8593;</span><span className="arrow-down"> &#8595;</span>
                                </th>
                                <th>
                                </th>
                            </tr>
                            </thead>
                            <tbody className='table__tbody'>
                                {this.renderFlights(allflight, allPilots, allStartplaces)}
                            </tbody> 
                        </table> : <div className="centered-layout__header">loading</div>}
                        <div className="button-wrapper button-wrapper--top"> 
                            <button onClick={this.showMore} className="button-without-border button-without-border--small">{this.state.expanded ? (<span>- weniger Flüge anzeigen</span>) : (<span>+ mehr Flüge anzeigen</span>)}</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
let form = reduxForm({
    form: 'NewPost'
  })(FlightTable);
  
  form = connect((state, ownProps) => ({
      flights: state.flights,
      user: state.user,
      startplaces: state.startplaces,
      pilots: state.pilots
    }), { saveFlights, getFlights, deleteFlights, getUser, getStartplaces, saveStartplaces, deleteStartplaces, updateFlights, getPilots }
  )(form);
  
export default withRouter(form);
