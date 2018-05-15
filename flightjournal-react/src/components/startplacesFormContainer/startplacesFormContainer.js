import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, reset } from 'redux-form';
import { getStartplaces, saveStartplaces, updateStartplaces, deleteStartplaces } from '../../actions/StartplacesActions';
import { getUser } from '../../actions/UserActions';
import * as routes from '../../constants/routes';
import ReactTransitionGroup from 'react-addons-transition-group';
import StartplacesForm from './startplacesForm';

let obj = {};

class StartplaceFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ani:'startplaces',
            formisvisible: true,

            altitude : '',
            anreise : '',
            area : '',
            description : '',
            descriptionSmall : '',
            difficulties : '',
            googleMaps : '',
            imagesUrl : '',
            linkToSibling : '',
            name : '', 
            seilbahn : '',
            shvInfo : '',
            streckenflug : '',  
            thermalHotspots : '',
            weatherForecast : '',
            webcam : '',
            winddirection : '',
            windstations : ''
        };
        this.onChange = this.onChange.bind(this);  
        this.onSubmit = this.onSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
    }
    
    componentWillMount() {
        window.scrollTo(0, 0);
        this.props.getStartplaces();
        this.props.getUser();
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

    onSubmit(e){
        e.preventDefault();
        obj = {
            altitude : this.state.altitude,
            anreise : this.state.anreise,
            area : this.state.area,
            description : this.state.description,
            descriptionSmall : this.state.descriptionSmall,
            difficulties : this.state.difficulties,
            googleMaps : this.state.googleMaps,
            imagesUrl : this.state.imagesUrl,
            linkToSibling : this.state.linkToSibling,
            name : this.state.name,
            seilbahn : this.state.seilbahn,
            shvInfo : this.state.shvInfo,
            streckenflug : this.state.streckenflug,
            thermalHotspots : this.state.thermalHotspots,
            weatherForecast : this.state.weatherForecast,
            webcam : this.state.webcam,
            winddirection : this.state.winddirection,
            windstations : this.state.windstations
        }
        this.props.saveStartplaces(obj).then(this.props.dispatch(reset('NewPost')));
        this.props.history.push(routes.FLUGDATEN_ERFASSEN);
    }

    goBack(e){
        e.preventDefault();
        this.props.dispatch(reset('NewPost'));
        this.setState({
            formisvisible: false
        });
    }

    render() {
        return ( 
            <ReactTransitionGroup>
            {this.state.formisvisible ? 
                <StartplacesForm 
                    history={this.props.history}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    goBack={this.goBack}
                    ani={this.state.ani}
                    delayEnter={0.2}
                    delayLeave={0.2}
                /> : null}
            </ReactTransitionGroup>
        );
    }
}

let flightform = reduxForm({
    form: 'NewPost'
  })(StartplaceFormContainer);
  
  flightform = connect((state, ownProps) => ({
      startplaces: state.startplaces,
      user: state.user
    }), { saveStartplaces, getStartplaces, updateStartplaces, deleteStartplaces, getUser }
  )(flightform);

export default withRouter(flightform);
