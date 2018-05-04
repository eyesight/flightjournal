import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, reset } from 'redux-form';
import { getFlights, saveFlights, deleteFlights, updateFlights } from '../../actions/FlightActions';
import { getStartplaces, saveStartplaces, deleteStartplaces } from '../../actions/StartplacesActions';
import { getUser, logout } from '../../actions/UserActions';
import * as routes from '../../constants/routes';

class Flugdaten extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ud: false,
          kk: '',
          inputPilot: props.inputPilot
        };
        this.onUpdate = this.onUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
    componentWillMount() {
        this.props.getFlights();
        this.props.getUser();
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

    renderFlights(obj) {
        const flights = Object.keys(obj).map(i => obj[i]);
        const flightskey = Object.keys(obj);
        return flights.map((x, index) => {
          return (
              <tr key={flightskey[index]}>
                <td className="table__date">{x.data}</td>
                <td className="table__pilot"><a className="table__link">{x.pilot}</a></td>
                <td className="table__start"><a className="table__link">{x.startplaces}</a></td>
                <td className="table__duration">{x.flighttime} min</td>
                <td className="table__distance">{x.distance} Kilometer</td>
                <td className="table__details"><a className="anchor table__link" onClick={() => this.setState({ud: true, kk: flightskey[index], inputPilot: this.props.flights[flightskey[index]].pilot})}>Flugdetails</a></td>
                <td className="table__details"><a className="anchor table__link" onClick={() => this.props.deleteFlights(flightskey[index])}>Löschen</a></td>
             </tr>
          );
        }); 
    }

    onUpdate(event, key){
        event.preventDefault();
        const obj = {
            pilot: this.state.inputPilot
        }
        this.props.updateFlights(key, obj).then(this.props.dispatch(reset('NewPost')));
        this.setState({ ud: false})
    }

    renderField(field) {
        return (
          <input type="text" {...field.input} className={field.class}/>
        );
      }

      handleChange = (e) => {
        this.setState({inputPilot: e.target.value});
      }

      renderupdateFlightsForm() {
        const x = this.props.flights[this.state.kk];
        return (
        <main className="main">
            <section className="centered-layout">
                <div className="formular-wrapper">
                    <form className="formular" onSubmit={event => { this.onUpdate(event, this.state.kk);}}>
                        <div className="formular__input-wrapper">
                        <label>Pilot:</label>
                        <input type="text" value={this.state.inputPilot} onChange={this.handleChange} placeholder={x.pilot} className="formular__input"/>
                        </div>
                        <div className="button-wrapper">
                            <button className="button">Daten eingeben</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
        )
   }

    renderFlightsForm() {
        const { handleSubmit } = this.props;
        return (
        <main className="main">
            <section className="centered-layout">
                <div className="formular-wrapper">
                    <form className="formular" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <div className="formular__input-wrapper">
                        <label>Pilot:</label>
                        <Field
                            name="pilot"
                            component={this.renderField}
                            class="formular__input"
                        />
                        </div>
                        <div className="formular__input-wrapper">
                            <label>Datum:</label>
                            <Field
                            name="data"
                            component={this.renderField}
                            class="formular__input"
                            />
                        </div>
                        <div className="formular__input-wrapper">
                            <label>Flugzeit:</label>
                            <Field
                            name="flighttime"
                            component={this.renderField}
                            class="formular__input"
                            />
                        </div>
                        <div className="formular__input-wrapper">
                            <label>Startort:</label>
                            <Field
                            name="startplaces"
                            component={this.renderField}
                            class="formular__input"
                            />
                        </div>
                        <div className="formular__input-wrapper">
                            <label>Landeort:</label>
                            <Field
                            name="landingplace"
                            component={this.renderField}
                            class="formular__input"
                            />
                        </div>
                        <div className="formular__input-wrapper">
                            <label>Kommentar:</label>
                            <Field
                            name="comment"
                            component={this.renderField}
                            class="formular__input"
                            />
                        </div>
                        <div className="formular__input-wrapper">
                            <label>Distance:</label>
                            <Field
                            name="distance"
                            component={this.renderField}
                            class="formular__input"
                            />
                        </div>
                        <div className="button-wrapper">
                            <button className="button">Daten eingeben</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
        )
   }

    onSubmit(values) {
        this.props.saveFlights(values).then(this.props.dispatch(reset('NewPost')));
      }
    
    render() {
        const allflight = this.props.flights;
        const loading = this.props.flights['1'];
    
        return (
        <main className="main">
            <section id="loginForm" className="centered-layout">
                    <div className="centered-layout__header centered-layout__header--no-marginbottom">
                        <div className="title-page-title">Flugdaten</div>
                        <h2 className="title-h2">Test<br /><span className="title--regular"> Test</span>
                        </h2>
                    </div>
                    {loading ? <div className="table-wrapper">
                    <div className="table-inner">
                        <table className="table">
                            <thead>
                            <tr>
                                <th className="table__header table&index.html45;&#45;sort js-table&#45;&#45;sort"><span className="active">Datum</span><span
                                    className="arrow-up visible"> &#8593;</span><span className="arrow-down"> &#8595;</span>
                                </th>
                                <th className="table__header table&#45;&#45;sort js-table&#45;&#45;sort"><span>Pilot</span><span
                                    className="arrow-up"> &#8593;</span><span className="arrow-down"> &#8595;</span></th>
                                <th className="table__header table&#45;&#45;sort js-table&#45;&#45;sort"><span>Startplatz</span><span
                                    className="arrow-up"> &#8593;</span><span className="arrow-down">&#8595;</span></th>
                                <th className="table__header table&#45;&#45;sort js-table&#45;&#45;sort">
                                    <span>Flugzeit</span><span className="arrow-up"> &#8593;</span><span className="arrow-down"> &#8595;</span>
                                </th>
                                <th className="table__header table&#45;&#45;sortjs-table&#45;&#45;sort">
                                    <span>XC-Distanz</span><span className="arrow-up"> &#8593;</span><span className="arrow-down"> &#8595;</span>
                                </th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderFlights(allflight)}
                            </tbody>
                        </table>

                        <div className="button-wrapper">
                            <button className="button">mehr Flüge anzeigen</button>
                        </div>
                    </div>
                </div> : <div className="centered-layout__header">loading</div>}
                </section>
                <div>
                {this.renderFlightsForm()}
                </div>
                {this.state.ud ? <div>{this.renderupdateFlightsForm(this.state.kk)}</div> : <div></div>}
        </main>)
    }
}

let form = reduxForm({
    form: 'NewPost'
  })(Flugdaten);
  
  form = connect((state, ownProps) => ({
      flights: state.flights,
      user: state.user,
      startplaces: state.startplaces
    }), { saveFlights, getFlights, deleteFlights, getUser, logout, getStartplaces, saveStartplaces, deleteStartplaces, updateFlights }
  )(form);
  
  export default withRouter(form);
