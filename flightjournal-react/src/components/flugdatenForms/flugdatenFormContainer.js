import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, reset } from 'redux-form';
import { getFlights, saveFlights, deleteFlights, updateFlights } from '../../actions/FlightActions';
import { getStartplaces } from '../../actions/StartplacesActions';
import { getUser } from '../../actions/UserActions';
import { getPilots } from '../../actions/PilotActions';
import * as routes from '../../constants/routes';
import ReactTransitionGroup from 'react-addons-transition-group';
import FlugdatenForm1 from './flugdatenForm1';
import FlugdatenForm2 from './flugdatenForm2';
import FlugdatenForm3 from './flugdatenForm3';
import FlugdatenForm4 from './flugdatenForm4';
import FlugdatenForm5 from './flugdatenForm5';

let obj = {};

class FlugdatenFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ud: false,
          form1: true,
          form2: false,
          form3: false,
          form4: false,
          form5: false,
          inputPilot: props.inputPilot,
          valueHour:'',
          valueMinute: '',
          nameHour: 'valueHour',
          nameMinute: 'valueMinute',
          nameComment: 'comment',
          startpl: 'startplace',
          ani: 'form1',

          date:'',
          startplace:'',
          landingplace: '',
          fligthtime: '',
          xcdistance: '',
          maxaltitude: '',
          heightgain:'',
          maxclimb: '',
          startingtime:'',
          distance: '',
          imgUrl: '',
          syrideLink: '',
          xcontestLink: '',
          airtribuneLink: '',
          weatherFoehndiagramm: '',
          weatherWindBoden: '',
          weatherWind800m: '',
          weatherWind1500m: '',
          weatherWind3000m: '',
          weatherRegtherm: '',
          weatherFronten: '',
          weatherSoaringmeteo: '',
          weatherBisendiagramm: ''
        };
        this.getOptions = this.getOptions.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.onChange = this.onChange.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);
        
        this.goNext = this.goNext.bind(this);

        this.goBack2 = this.goBack2.bind(this);
        this.goNext2 = this.goNext2.bind(this);

        this.goBack3 = this.goBack3.bind(this);
        this.goNext3 = this.goNext3.bind(this);

        this.goBack4 = this.goBack4.bind(this);
        this.goNext4 = this.goNext4.bind(this);

        this.goBack5 = this.goBack5.bind(this);
    }
    
    componentWillMount() {
        window.scrollTo(0, 0);
        this.props.getFlights();
        this.props.getUser();
        this.props.getPilots();
        this.props.getStartplaces();
        if (this.props.user.loading === false && this.props.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loading === false && nextProps.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          }
    }

    onChange(theEvent){
        this.setState({
            [theEvent.target.name]: theEvent.target.value,
        });
        console.log([theEvent.target.name] + theEvent.target.value);
    };

    goNext(e){
        e.preventDefault();
        let ftime = 0;

        if(Number(this.state.valueHour) > 0){
            ftime = (Number(this.state.valueHour)*60) + Number(this.state.valueMinute);
        }else{
            ftime = Number(this.state.valueMinute);
        }
        
        this.setState({
            form1: false,
            form2: true,
            form3: false,
            form4: false,
            form5: false,
            ani: 'form2',
            date: this.state.date,
            landingplace: this.state.landingplace,
            fligthtime: ftime,
            xcdistance: this.state.xcdistance
        });
    }

    goNext2(e){
        e.preventDefault();
        this.setState({
            form1: false,
            form2: false,
            form3: true,
            form4: false,
            form5: false,
            ani: 'form3',
            maxaltitude: this.state.maxaltitude,
            heightgain: this.state.heightgain,
            maxclimb: this.state.maxclimb,
            startingtime: this.state.startingtime,
            distance: this.state.distance
        });
        console.log('weiter');
    }

    goBack2(e){
        e.preventDefault();
        this.setState({
            form1: true,
            form2: false,
            form3: false,
            form4: false,
            form5: false,
            ani: 'form1'
        });
    }

    goNext3(e){
        e.preventDefault();
        console.log('weiter 3');
        this.setState({
            form1: false,
            form2: false,
            form3: false,
            form4: true,
            form5: false,
            ani: 'form4',
            imgUrl: this.state.imgUrl
        });
    }

    goBack3(e){
        e.preventDefault();
        console.log('zurück 3');
        this.setState({
            form1: false,
            form2: true,
            form3: false,
            form4: false,
            form5: false,
            ani: 'form2'
        });
    }

    goNext4(e){
        e.preventDefault();
        console.log('weiter 4');
        this.setState({
            form1: false,
            form2: false,
            form3: false,
            form4: false,
            form5: true,
            ani: 'form5',
            imgUrl: this.state.imgUrl
        });
    }

    goBack4(e){
        e.preventDefault();
        console.log('zurück 4');
        this.setState({
            form1: false,
            form2: false,
            form3: true,
            form4: false,
            form5: false,
            ani: 'form3'
        });
    }

    goBack5(e){
        e.preventDefault();
        console.log('zurück 5');
        this.setState({
            form1: false,
            form2: false,
            form3: false,
            form4: true,
            form5: false,
            ani: 'form4'
        });
    }

    onSubmit(e){
        e.preventDefault();
        obj = {
            pilot: this.props.user.email,
            pilotId: this.props.user.uid,
            date: this.state.date,
            startplace: this.state.startplace,
            landingplace: this.state.landingplace,
            fligthtime: this.state.fligthtime,
            xcdistance: this.state.xcdistance,
            maxaltitude: this.state.maxaltitude,
            heightgain: this.state.heightgain,
            maxclimb: this.state.maxclimb,
            startingtime: this.state.startingtime,
            distance: this.state.distance,
            imgUrl: this.state.imgUrl,
            syrideLink: this.state.syrideLink,
            xcontestLink: this.state.xcontestLink,
            airtribuneLink: this.state.airtribuneLink,
            weatherFoehndiagramm: this.state.weatherFoehndiagramm,
            weatherWindBoden: this.state.weatherWindBoden,
            weatherWind800m: this.state.weatherWind800m,
            weatherWind1500m: this.state.weatherWind1500m,
            weatherWind3000m: this.state.weatherWind3000m,
            weatherRegtherm: this.state.weatherRegtherm,
            weatherFronten: this.state.weatherFronten,
            weatherSoaringmeteo: this.state.weatherSoaringmeteo,
            weatherBisendiagramm: this.state.weatherBisendiagramm
        }
        this.props.saveFlights(obj).then(this.props.dispatch(reset('NewPost')));
        this.props.history.push(routes.LANDING);
    }

    getOptions(sp){
        const startplacesData = Object.keys(sp).map(i => sp[i]);
        const startplacesDatakey = Object.keys(sp);
        return startplacesData.map(function (item, index) {
            if(startplacesDatakey[index] === '0'){
                return <option key={startplacesDatakey[index]} value={startplacesDatakey[index]}>Startplatz wählen</option>;
            }else{
                return <option key={startplacesDatakey[index]} value={startplacesDatakey[index]}>{item.name}</option>;
            }
        });
    }

    goToPage(e){
        e.preventDefault();
        this.props.history.push(routes.STARTPLATZ_ERFASSEN);
    }

    render() {
        const sp = this.props.startplaces;
        return ( 
        <div>
            <ReactTransitionGroup>
            {this.state.form1 &&
                <FlugdatenForm1 
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    goNext={this.goNext}
                    valueHour={this.state.valueHour}
                    valueMinute={this.state.valueMinute}
                    nameHour={this.state.nameHour}
                    nameMinute={this.state.nameMinute}
                    nameComment={this.state.nameComment}
                    ani={this.state.ani}
                    getOptions={this.getOptions(sp)}
                    nameSP={this.state.startpl}
                    goToPage={this.goToPage}
                /> }
            </ReactTransitionGroup> 
            <ReactTransitionGroup>
                {this.state.form2 &&
                <FlugdatenForm2 
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    goBack={this.goBack2}
                    goNext={this.goNext2}
                    ani2={this.state.ani}
                />}
            </ReactTransitionGroup> 
            <ReactTransitionGroup>
                {this.state.form3 &&
                <FlugdatenForm3 
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    goBack={this.goBack3}
                    goNext={this.goNext3}
                    ani3={this.state.ani}
                />}
            </ReactTransitionGroup> 
            <ReactTransitionGroup>
                {this.state.form4 &&
                <FlugdatenForm4 
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    goBack={this.goBack4}
                    goNext={this.goNext4}
                    ani4={this.state.ani}
                />}
            </ReactTransitionGroup> 
            <ReactTransitionGroup>
                {this.state.form5 &&
                <FlugdatenForm5 
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    goBack={this.goBack5}
                    ani5={this.state.ani}
                />}
            </ReactTransitionGroup> 
        </div>
        );
    }
}

let flightform = reduxForm({
    form: 'NewPost'
  })(FlugdatenFormContainer);
  
  flightform = connect((state, ownProps) => ({
      flights: state.flights,
      user: state.user,
      pilots: state.pilots,
      startplaces: state.startplaces
    }), { saveFlights, getFlights, deleteFlights, getUser, updateFlights, getPilots, getStartplaces }
  )(flightform);

export default withRouter(flightform);
