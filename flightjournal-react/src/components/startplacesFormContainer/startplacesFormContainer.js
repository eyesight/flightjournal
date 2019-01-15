import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, reset } from 'redux-form';
import { getStartplaces, saveStartplaces, updateStartplaces, deleteStartplaces } from '../../actions/StartplacesActions';
import { getRegions, updateRegions } from '../../actions/RegionsActions';
import { getWinddirections, updateWinddirections } from '../../actions/WinddirectionActions';
import { getFlights, updateFlights } from '../../actions/FlightActions';
import { getPilots } from '../../actions/PilotActions';
import { getUser } from '../../actions/UserActions';
import * as routes from '../../constants/routes';
import ReactTransitionGroup from 'react-addons-transition-group';
import StartplacesForm from './startplacesForm';
import BackButton from './../backButton/backButton';
import StartareasForm from './startareasForm';
import FormAnimation from '../formAnimation/formAnimation';
import FormTitle from '../formTitle/formTitle'; 
import { updateLastUpdateArray } from '../../utils/updateLastUpdateArray';
import * as validation from '../../utils/validationText';
import  _ from 'lodash';
import moment from 'moment';
import FormErrorAlert from '../formErrorAlert/formErrorAlert';

let obj = {};
//TODO: split the Form for Startplaces and Startaraes, to make it less confusing
class StartplaceFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ani:'',
            formisvisible: true,
            formstartareaisvisible: false, //To check if we are on the area-part (true) or not (false).
            titleForm: (props.match.params.id) ? 'Startplatz editieren.' : 'Neuen Startplatz erfassen.',
            toEditArea: (props.match.params.id) ? true : false,
            idToEditArea: '',
            _isMounted: false,
            IDtoUpdateStartplace: '',
            from: (this.props.location.state) ? this.props.location.state[0].from : undefined,
            idAreaFromUrl: '', //get the id from url -> Url is a compination of id of startplace and startarea
            updateArea: false,

            //validation-states
            validationTxt: '',
            errorAlert: false,
            formValid: false, 

            formErrors: {startareasId: '', name: '', altitude: '', locationpin: '', winddirection: '', description: '', imagesUrl: '', imagesCount:''},
            formErrorsValid: {startareasId: false, name: false, altitude: false, locationpin:true, winddirection: false, description: true, imagesUrl: true, imagesCount: true},

            //startplaces-form
            startareasIdValid: false,
            nameValid: false,
            altitudeValid: false,
            locationpinValid: true,
            winddirectionValid: false,
            descriptionValid: true,
            imagesUrlValid: true,
            imagesCountValid: true,

            //validation-states area
            errorAlertArea: false,
            formValidArea: false,
            formErrorsArea:{regionsId: '', startareaname: '', funicularLink: '', locationpin: '', webcam: '', webcam2:'', webcam3:'', shvInfo: '', windstation1: '', windstation2: '', windstation3: '', xc: '', areaDescription: '', gliderChart: ''},
            formErrorsValidArea: {regionsId: false, startareaname: false, funicularLink: true, locationpin: true, webcam: true, webcam2:true, webcam3: true, shvInfo: true, windstation1: true, windstation2: true, windstation3: true, xc: true, areaDescription: true, gliderChart: true},
            
            startareanameValid: false,
            regionsIdValid: false,
            funicularLinkValid: true,
            locationpinValidArea: true,
            webcamValid: true,
            webcam2Valid: true,
            webcam3Valid: true,
            shvInfoValid: true,
            windstation1Valid: true,
            windstation2Valid: true,
            windstation3Valid: true,
            xcValid: true,
            areaDescriptionValid: true,
            gliderChartValid: true,

            //Values of Form Startingplaces
            name : '',
            altitude : '',
            startareasId: '',
            description : '',
            locationpin: '',
            winddirection: [],
            lastUpdateSP: '',
            imagesUrl: '',
            imagesCount: 0,
            authorSP: '',

            //Values of Form Startingareas
            regionsId: '',
            startareaname: '',
            funicularLink: '',
            arealocationpin: '',
            webcams: [],
            webcam: '',
            webcam2: '',
            webcam3: '',
            shvInfo: '',
            weatherstations: [],
            windstation1: '',
            windstation2: '',
            windstation3: '',
            xc: '',
            areaDescription: '',
            startplaces: [],
            lastUpdateSA: '',
            landingplaces: [],
            authorArea: '',
            gliderChart:''
        };
        this.onChange = this.onChange.bind(this);  
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitArea = this.onSubmitArea.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.getOptionsCheckbox = this.getOptionsCheckbox.bind(this);
        this.goBack = this.goBack.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateFormArea = this.validateFormArea.bind(this);
        this.errorClass = this.errorClass.bind(this);
        this.editArea = this.editArea.bind(this);
        this.fillAreaFormToUpdate = this.fillAreaFormToUpdate.bind(this);
        this.addId = this.addId.bind(this);
        this.updateAllFlights = this.updateAllFlights.bind(this);
    }
    
    componentWillMount() {
        window.scrollTo(0, 0);
        this.props.getStartplaces();
        this.props.getUser();
        this.props.getRegions();
        this.props.getWinddirections();
        this.props.getPilots();
        this.props.getFlights();
        this.setState({
            _isMounted: true
        })
        if (this.props.user.loading === false && this.props.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loading === false && nextProps.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          }
        
        //if history.location.state is set (if someone likes to update a Startplace), set the values of Form-Input-Field
        if( nextProps.currentStartplace && nextProps.currentPilot && nextProps.currentPilot.role === 'admin'){
            let currentSP = nextProps.currentStartplace;
            let startplaces = currentSP.startplaces;
            let theId = nextProps.match.params.id.split("--sp--");
            let idOfArea = theId[0];
            let idOfStartplace = theId[1];
            this.setState({
                idAreaFromUrl: idOfArea,
                IDtoUpdateStartplace: idOfStartplace,
                startareasId: idOfArea,
                name: startplaces[idOfStartplace].name, 
                altitude: startplaces[idOfStartplace].altitude,
                description: startplaces[idOfStartplace].description,
                locationpin: startplaces[idOfStartplace].locationpin,
                winddirection: _.keys(startplaces[idOfStartplace].winddirectionsId), 
                lastUpdateSP: startplaces[idOfStartplace].lastUpdate,
                imagesUrl: startplaces[idOfStartplace].imagesUrl,
                imagesCount: startplaces[idOfStartplace].imagesCount,
                rating: startplaces[idOfStartplace].rating,
                writeDateSP: startplaces[idOfStartplace].writeDate,
                authorSP: (startplaces[idOfStartplace].author && startplaces[idOfStartplace].author !== '') ? startplaces[idOfStartplace].author : nextProps.user.email,

                //set state of forminput
                //TODO: find a better solution
                formValid: true,
                startareasIdValid: true,
                nameValid: true,
                altitudeValid: true,
                winddirectionValid: true,
                idToEditArea: idOfArea //DELETE
            })
        }
    }

    componentWillUnmount() {
        this.setState({
            _isMounted: false
        });
        
      }
    
    //TODO: Validation for Links and set and test it on the right places!
    validateField(fieldName, value) {
        //Startplaces-Form
        let fieldValidationErrors = this.state.formErrors;
        let startareasIdValid = this.state.startareasIdValid;
        let nameValid = this.state.nameValid;
        let altitudeValid = this.state.altitudeValid;
        let locationpinValid = this.state.locationpinValid;
        let winddirectionValid = this.state.winddirectionValid;
        let descriptionValid = this.state.descriptionValid;
        let imagesUrlValid = this.state.imagesUrlValid;
        let imagesValid = false;
        let imagesCountValid = this.state.imagesCountValid;

        //Startarea-Form
        let fieldValidationErrorsArea = this.state.formErrorsArea;
        let startareanameValid = this.state.startareanameValid;
        let regionsIdValid = this.state.regionsIdValid;
        let funicularLinkValid = this.state.funicularLinkValid;
        let locationpinValidArea = this.state.locationpinValidArea;
        let webcamValid = this.state.webcamValid;
        let webcam2Valid = this.state.webcam2Valid;
        let webcam3Valid = this.state.webcam3Valid;
        let shvInfoValid = this.state.shvInfoValid;
        let windstation1Valid = this.state.windstation1Valid;
        let windstation2Valid = this.state.windstation2Valid;
        let windstation3Valid = this.state.windstation3Valid;
        let xcValid = this.state.xcValid;
        let areaDescriptionValid = this.state.areaDescriptionValid;
        let gliderChartValid = this.state.gliderChartValid;
        switch(fieldName) {
        //Startplaces
        case 'startareasId': 
            startareasIdValid = value.length > 0 && value.length <= 150 && (typeof value === 'string') && value !== '0';
            fieldValidationErrors.startareasId = startareasIdValid ? '' : `${validation.valField} ${validation.valEmpty}.`;
            break;
        case 'name': 
            nameValid = value.length > 0 && value.length <= 150 && (typeof value === 'string') && value !== '0';
            fieldValidationErrors.name = nameValid ? '' : `${validation.valField} ${validation.valEmpty} und ${validation.valLess150}.`;
            break;
        case 'altitude':
            altitudeValid = value.length > 0 && (!isNaN(value) && value.length <= 5);
            fieldValidationErrors.altitude = altitudeValid ? '' : `${validation.valField} ${validation.valNumber} und ${validation.valLess5}.`;
            break;
        //locationpin is used in the startplaces-form and in the area-form. I made a if/else-loop to check which one to validate
        case 'locationpin': 
            if(this.state.formstartareaisvisible===false){
                locationpinValid = value.length === 0 || (value.length <= 200 && (typeof value === 'string') && value !== '0');
                fieldValidationErrors.locationpin = locationpinValid ? '' : `${validation.valField} ${validation.valLess200}.`;
                break;
            }else{
                locationpinValidArea = value.length === 0 || (value.length <= 200 && (typeof value === 'string') && value !== '0');
                fieldValidationErrorsArea.locationpin = locationpinValidArea ? '' : `${validation.valField} ${validation.valLess200}.`;
                break;
            }
        case 'winddirection': 
            winddirectionValid = value.length > 0 && (value.length <= 8) && (typeof value[0] === 'string') && value !== '0';
            fieldValidationErrors.winddirection = winddirectionValid ? '' : `${validation.valField} ${validation.valEmpty}.`;
            break;
        case 'description':
            descriptionValid = (value.length === 0) || (value.length <= 3000 && (typeof value === 'string'));
            fieldValidationErrors.description = descriptionValid ? '' : `${validation.valField} ${validation.valLess3000}.`;
            break;
        case 'imagesUrl':
            // eslint-disable-next-line
            imagesValid = (/^[a-zA-Z0-9\_-]*$/gi).test(this.state.imagesUrl);
            imagesUrlValid = value.length === 0 || (imagesValid === true && value.length <= 50 && value !== '' && (typeof value === 'string'));
            fieldValidationErrors.imagesUrl = imagesUrlValid ? '' : `${validation.valField} ${validation.specialChars} und ${validation.valLess50}.`;
            break;
        case 'imagesCount':
            imagesCountValid = value === 0 || (value.length < 2 && !isNaN(value));
            fieldValidationErrors.imagesCount = imagesCountValid ? '' : `${validation.valField} ${validation.valNumber} und ${validation.valLess1}.`;
            break;
        //Areas
        case 'startareaname': 
            startareanameValid = value.length > 0 && value.length <= 150 && (typeof value === 'string') && value !== '0';
            fieldValidationErrorsArea.startareaname = startareanameValid ? '' : `${validation.valField} ${validation.valEmpty} und ${validation.valLess150}.`;
            break;
        case 'regionsId': 
            regionsIdValid = value.length > 0 && value.length <= 150 && (typeof value === 'string') && value !== '0';
            fieldValidationErrorsArea.regionsId = regionsIdValid ? '' : `${validation.valField} ${validation.valEmpty}.`;
            break;
        case 'funicularLink': 
            funicularLinkValid = value.length === 0 || (value.length <= 200 && (typeof value === 'string') && value !== '0');
            fieldValidationErrorsArea.funicularLink = funicularLinkValid ? '' : `${validation.valField} ${validation.valLess200}.`;
            break;
        case 'webcam': 
            webcamValid = value.length === 0 || (value.length <= 200 && (typeof value === 'string') && value !== '0');
            fieldValidationErrorsArea.webcam = webcamValid ? '' : `${validation.valField} ${validation.valLess200}.`;
            break;
        case 'webcam2': 
            webcam2Valid = value.length === 0 || (value.length <= 200 && (typeof value === 'string') && value !== '0');
            fieldValidationErrorsArea.webcam2 = webcam2Valid ? '' : `${validation.valField} ${validation.valLess200}.`;
            break;
        case 'webcam3': 
            webcam3Valid = value.length === 0 || (value.length <= 200 && (typeof value === 'string') && value !== '0');
            fieldValidationErrorsArea.webcam3 = webcam3Valid ? '' : `${validation.valField} ${validation.valLess200}.`;
            break;
        case 'shvInfo': 
            shvInfoValid = value.length === 0 || (value.length <= 200 && (typeof value === 'string') && value !== '0');
            fieldValidationErrorsArea.shvInfo = shvInfoValid ? '' : `${validation.valField} ${validation.valLess200}.`;
            break;
        case 'windstation1': 
            windstation1Valid = value.length === 0 || (value.length <= 200 && (typeof value === 'string') && value !== '0');
            fieldValidationErrorsArea.windstation1 = windstation1Valid ? '' : `${validation.valField} ${validation.valLess200}.`;
            break;
        case 'windstation2': 
            windstation2Valid = value.length === 0 || (value.length <= 200 && (typeof value === 'string') && value !== '0');
            fieldValidationErrorsArea.windstation2 = windstation2Valid ? '' : `${validation.valField} ${validation.valLess200}.`;
            break;
        case 'windstation3': 
            windstation3Valid = value.length === 0 || (value.length <= 200 && (typeof value === 'string') && value !== '0');
            fieldValidationErrorsArea.windstation3 = windstation3Valid ? '' : `${validation.valField} ${validation.valLess200}.`;
            break;
         case 'xc': 
            xcValid = value.length === 0 || (value.length <= 200 && (typeof value === 'string') && value !== '0');
            fieldValidationErrorsArea.xc = xcValid ? '' : `${validation.valField} ${validation.valLess200}.`;
            break;
        case 'areaDescription':
            areaDescriptionValid = (value.length === 0) || (value.length <= 3000 && (typeof value === 'string'));
            fieldValidationErrorsArea.areaDescription = areaDescriptionValid ? '' : `${validation.valField} ${validation.valLess3000}.`;
            break;
        case 'gliderChart':
            gliderChartValid = value.length === 0 || (value.length <= 200 && (typeof value === 'string') && value !== '0');
            fieldValidationErrorsArea.gliderChart = gliderChartValid ? '' : `${validation.valField} ${validation.valLess200}.`;
            break;
          default:
            break;
        }
        this.setState({formErrorsValid: {
            startareasId: startareasIdValid,
            name: nameValid,
            altitude: altitudeValid,
            locationpin: locationpinValid,
            winddirection: winddirectionValid,
            description: descriptionValid,
            imagesUrl: imagesUrlValid,
            imagesCount: imagesCountValid
        },
        startareasIdValid: startareasIdValid,
        nameValid: nameValid,
        altitudeValid: altitudeValid,
        locationpinValid: locationpinValid,
        winddirectionValid: winddirectionValid,
        descriptionValid: descriptionValid,
        imagesUrlValid: imagesUrlValid,
        imagesCountValid: imagesCountValid
        }, this.validateForm, )

        //areas
        this.setState({
        formErrorsValidArea:{
            regionsId: regionsIdValid,
            startareaname: startareanameValid,
            funicularLink: funicularLinkValid,
            locationpin: locationpinValidArea,
            webcam: webcamValid,
            webcam2: webcam2Valid,
            webcam3: webcam3Valid,
            shvInfo: shvInfoValid,
            windstation1: windstation1Valid,
            windstation2: windstation2Valid,
            windstation3: windstation3Valid,
            xc: xcValid,
            areaDescription: areaDescriptionValid,
            gliderChart: gliderChartValid
        },
        regionsIdValid: regionsIdValid,
        startareanameValid: startareanameValid,
        funicularLinkValid: funicularLinkValid,
        locationpinValidArea: locationpinValidArea,
        webcamValid: webcamValid,
        webcam2Valid: webcam2Valid,
        webcam3Valid: webcam3Valid,
        shvInfoValid: shvInfoValid,
        windstation1Valid: windstation1Valid,
        windstation2Valid: windstation2Valid,
        windstation3Valid: windstation3Valid,
        xcValid: xcValid,
        areaDescriptionValid: areaDescriptionValid,
        gliderChartValid: gliderChartValid
        }, this.validateFormArea);
      } 

      validateForm() {
            this.setState({formValid: 
                this.state.startareasIdValid &&
                this.state.nameValid &&
                this.state.altitudeValid &&
                this.state.locationpinValid &&
                this.state.winddirectionValid &&
                this.state.descriptionValid &&
                this.state.imagesUrlValid &&
                this.state.imagesCountValid
            });
        }
      validateFormArea() {
            this.setState({formValidArea: 
                this.state.startareanameValid &&
                this.state.regionsIdValid &&
                this.state.funicularLinkValid &&
                this.state.locationpinValidArea &&
                this.state.webcamValid &&
                this.state.webcam2Valid &&
                this.state.webcam3Valid &&
                this.state.shvInfoValid &&
                this.state.windstation1Valid &&
                this.state.windstation2Valid &&
                this.state.windstation3Valid &&
                this.state.xcValid &&
                this.state.areaDescriptionValid && 
                this.state.gliderChartValid
            });
      }

      errorClass(error) {
        return(error.length === 0 ? '' : 'formular--error');
      }

    onChange(e){
        const name = e.target.name;
        const value = e.target.value;
        if(name === 'winddirection'){
            let indexOfItem = this.state.winddirection.indexOf(value);
            indexOfItem === -1 ? this.state.winddirection.push(value) : this.state.winddirection.splice(indexOfItem, 1);
            this.setState({
                [name]: this.state.winddirection
            }, () => { this.validateField(name, this.state.winddirection) });
        }else if(name === 'startareasId'){
            this.setState({[name]: value}, 
                () => { this.validateField(name, value) 
            });
            this.setState({
                idToEditArea: value
            });
        }else{
            this.setState({[name]: value}, 
                () => { this.validateField(name, value) });
        }
    };

    getOptions(sp, text, keyForOption, keyForOption2){
        const startplacesData = Object.keys(sp).map(i => sp[i]);
        const startplacesDatakey = Object.keys(sp);
        let optionArray = [];
        optionArray.push(<option key='0' value='0'>{text}</option>);
        startplacesData.map(function (item, i) {
            let keyName = keyForOption2 ? (item[keyForOption2] + ' ' + item[keyForOption]) : item[keyForOption];
            return optionArray.push(<option key={startplacesDatakey[i]} value={startplacesDatakey[i]}>{keyName}</option>);
        });
        return optionArray;
    }

    getOptionsCheckbox(cb, label){
        const checkboxData = Object.keys(cb).map(i => cb[i]);
        const arr = [];
        checkboxData.map(function (item) {
            return arr.push(item[label]);
        });
        return arr;
    }

    addId(obj){
        let allSPs = _.keys(obj);
        return allSPs.length+1;
    }
    //if someone changes the area of the startplace and flights are linked to this place, the flights need to be updated 
    //TODO: add this to the functions of firebase -> FlightActions
    updateAllFlights(allFlight, flightUpdate){
        //if there exists some flights with this startplace, map throw it, and update them with the given content
        if(allFlight){
            allFlight.map((v)=>{
               return this.props.updateFlights(v, flightUpdate).catch((err) => {
                    console.log('error when update new area in all flights');
                    console.log(err)
                })
            });
        }
    }

    onSubmit(e){
        e.preventDefault();
        //add the winddirections in an Object
        let allWind = {}; 
        this.state.winddirection.map((item, i)=>{
            return allWind[item] = true;
        })
        if(this.state.formValid){
            let actualTimestamp = moment().format("YYYY-MM-DD HH:mm:ss Z");
            let author = (this.state.authorSP !== '') ? this.state.authorSP : this.props.user.email;
            let SpObject = _.find(this.props.startplaces, {id: this.state.startareasId});//Get the Area, which should be updated
            let newIdNr = (SpObject.startplaces) ? this.addId(SpObject.startplaces) : '0';
            let newId = (this.state.IDtoUpdateStartplace === '') ? `${this.state.startareasId}-sp0${newIdNr}` : this.state.IDtoUpdateStartplace;
            this.setState({errorAlert: false})
        obj = {
            id: newId,
            writeDate: actualTimestamp, 
            lastUpdate: updateLastUpdateArray(this.state.lastUpdateSP, actualTimestamp),
            name: this.state.name,
            altitude : this.state.altitude,
            locationpin: this.state.locationpin,
            description : this.state.description,
            startareasId: this.state.startareasId,
            winddirectionsId: allWind,
            rating: '',
            imagesUrl: this.state.imagesUrl,
            imagesCount: this.state.imagesCount,
            author: author,
        }
        
        switch (true) {
                //update startplace, when startarea isn't changed
                case this.state.startareasId !== '' && this.state.idAreaFromUrl !== '' && this.state.idAreaFromUrl === this.state.startareasId:
                let Obj = _.find(this.props.startplaces, {id: this.state.startareasId});//Get the Area, which should be updated
                let idofSp = Obj.startplaces[this.state.IDtoUpdateStartplace].id;
                    Obj.startplaces[idofSp] = obj;
                this.props.updateStartplaces(this.state.startareasId, Obj).then(
                    //when new Object is updated, state saveAreaIds will set to true, so function in componentDidUpdate will be continued
                    this.props.dispatch(reset('NewPost')),
                    (this.props.match.params.id) ? (
                        this.props.history.push(`${routes.STARTPLATZOHNEID}${this.state.idAreaFromUrl}`)
                    ) : (
                        (this.state.from) ? this.props.history.push(this.state.from) : this.props.history.push(routes.HOME)
                    )
                ).catch((err) => {
                    console.log('error when update startplaces');
                    console.log(err)
                    });
              break;
            //update startplace, when someone change the area: if there is set an ID to update a fligt and the area of the startplace changed - we have to delete the startplace from the old area
            //when this happens, we have to check all flights and update their startplaces
            case this.state.startareasId !== '' && this.state.idAreaFromUrl !== '' && this.state.idAreaFromUrl !== this.state.startareasId:
                let ObjNew = _.find(this.props.startplaces, {id: this.state.startareasId});//Get the Area, which should be updated
                let ObjOld = _.find(this.props.startplaces, {id: this.state.idAreaFromUrl});//the area which should remove the startplace
                // eslint-disable-next-line 
                let x = (ObjNew.startplaces) ? (ObjNew.startplaces[this.state.IDtoUpdateStartplace] = obj) : (ObjNew.startplaces = {}, ObjNew.startplaces = { [this.state.IDtoUpdateStartplace]: obj});
                delete ObjOld.startplaces[this.state.IDtoUpdateStartplace]; // delete the startplace from the "old" area
                let allFlight = Object.keys(this.props.flights).filter(i =>{
                    if(this.props.flights[i].startplace && this.props.flights[i].startplace.startplace === this.state.IDtoUpdateStartplace && this.props.flights[i].startplace.area === this.state.idAreaFromUrl){
                        return i;
                    }
                    return null;
                });
                let flightUpdate = {
                    startplace: {
                        area: this.state.startareasId,
                        startplace: this.state.IDtoUpdateStartplace
                    }
                }                
                
                this.props.updateStartplaces(this.state.idAreaFromUrl, ObjOld).then(
                    this.props.dispatch(reset('NewPost')),
                    this.updateAllFlights(allFlight, flightUpdate)
                ).then(
                    this.props.updateStartplaces(this.state.startareasId, ObjNew).then(
                        this.props.dispatch(reset('NewPost')),
                        (this.props.match.params.id) ? (
                            this.props.history.push(`${routes.STARTPLATZOHNEID}${this.state.idAreaFromUrl}`)
                        ) : (
                            (this.state.from) ? this.props.history.push(this.state.from) : this.props.history.push(routes.HOME)
                        )
                    ).catch((err) => {
                        console.log('error when update startplaces with new values');
                        console.log(err)
                        }
                    )
                ).catch((err) => {
                    console.log('error when update startplaces by deleting the old one')
                    console.log(err)
                    }
                ) 
              break;
              default:
                if(SpObject.startplaces){
                    SpObject.startplaces[newId] = obj;
                }else{
                    SpObject.startplaces = {};
                    SpObject.startplaces = {
                        [newId]: obj
                    };
                }
            this.props.updateStartplaces(this.state.startareasId, SpObject).then(
                this.props.dispatch(reset('NewPost')),
                (this.props.match.params.id) ? (
                    this.props.history.push(`${routes.STARTPLATZOHNEID}${this.state.idAreaFromUrl}`)
                ) : (
                    (this.state.from) ? this.props.history.push(this.state.from) : this.props.history.push(routes.HOME)
                )
            ).catch((err) => {
                console.log('error when safe startplaces');
                console.log(err)
              });
          }
                    
     }else{
        this.setState({errorAlert: true})
        Object.keys(this.state.formErrorsValid).map((fieldName, i) => {
               this.errorClass(this.state.formErrors[fieldName]);
               this.validateField(fieldName, this.state[fieldName]);
               return '';
         });
        } 
    }

    onSubmitArea(e){
        e.preventDefault();
        let actualTimestamp = moment().format("YYYY-MM-DD HH:mm:ss Z");
        let webcamarr = [];
        let windstationarr = [];
        let author = (this.state.authorArea !== '') ? this.state.authorArea : this.props.user.email;
        let allregions = _.find(this.props.regions, { id: this.state.regionsId })
        let regionsObj = {
                id: allregions.id,
                canton: allregions.canton,
                country: allregions.country,
                name: allregions.name
        }
       
        if(this.state.webcam){webcamarr.push(this.state.webcam)};
        if(this.state.webcam2){webcamarr.push(this.state.webcam2)};
        if(this.state.webcam3){webcamarr.push(this.state.webcam3)};
        if(this.state.windstation1){windstationarr.push(this.state.windstation1)};
        if(this.state.windstation2){windstationarr.push(this.state.windstation2)};
        if(this.state.windstation3){windstationarr.push(this.state.windstation3)};
        if(this.state.formValidArea){
            this.setState({
                webcams: webcamarr,
                webcam: '',
                webcam2: '',
                webcam3: '',
                weatherstations: windstationarr,
                windstation1: '',
                windstation2: '',
                windstation3: '',
                errorAlertArea: false
            })
        
            obj = {
                description: this.state.areaDescription,
                funicularLink: this.state.funicularLink,
                landingplaces: this.state.landingplaces,
                lastUpdate: updateLastUpdateArray(this.state.lastUpdateSA, actualTimestamp),
                locationpin: this.state.arealocationpin,
                name: this.state.startareaname,
                rating: '',
                region: regionsObj,
                shvInfo: this.state.shvInfo,
                
                webcams: webcamarr,
                weatherstations: windstationarr,
                writeDate: actualTimestamp,
                author: author,
                xc: this.state.xc,
                gliderChart: this.state.gliderChart
            }
            if(this.state.updateArea){
                this.props.updateStartplaces(this.state.startareasId, obj).then(
                    this.props.dispatch(reset('NewPost')),
                    this.setState({
                        formstartareaisvisible: false,
                        formisvisible: true
                    })
                ).catch((err) => {
                    console.log('error when safe startareas');
                    console.log(err)
                });
            }else{
                this.props.saveStartplaces(obj).then(
                    this.props.dispatch(reset('NewPost')),
                    this.setState({
                        formstartareaisvisible: false,
                        formisvisible: true
                    })
                ).catch((err) => {
                    console.log('error when safe startareas');
                    console.log(err)
                });
            }
        }else{
            this.setState({errorAlertArea: true})
            Object.keys(this.state.formErrorsValidArea).map((fieldName, i) => {
                   this.errorClass(this.state.formErrorsArea[fieldName]);
                   this.validateField(fieldName, this.state[fieldName]);
                   return '';
             });
            } 
    }

    goBack(e){
        e.preventDefault();
        //Check if we are on Form Startarea or Startplaces by variable formstartareaisvisible. When Startarea is true, return to startplaces by change variables. When not, then return to Flightform
        if(this.state.formstartareaisvisible){
            this.setState({
                formstartareaisvisible: false,
                formisvisible: true,
                titleForm: (this.props.match.params.id)?'Startplatz editieren.':'Neuen Startplatz erfassen.',
            });
        }else{
            if(this.state.toEditArea){
                this.props.dispatch(reset('NewPost'));
                this.props.history.push(`${routes.STARTPLATZOHNEID}${this.state.idAreaFromUrl}`)
            }else{
                this.props.dispatch(reset('NewPost'));
                this.props.history.push(routes.FLUGDATEN_ERFASSEN)
            }
        }
    }

    goToPage(e){
        e.preventDefault();
        this.setState({
            formstartareaisvisible: true,
            formisvisible: false,
            titleForm: 'Neues Fluggebiet erfassen.',

            regionsId: '',
            startareaname: '',
            funicularLink: '',
            arealocationpin: '',
            webcam: '',
            webcam2: '',
            webcam3: '',
            shvInfo: '',
            windstation1: '',
            windstation2: '',
            windstation3: '',
            xc: '',
            areaDescription: '',
            lastUpdateSA: '',
            writeDateArea: '',
            authorArea: '',

            updateArea: false,
            startareanameValid: false,
            regionsIdValid: false
        });
    }

    editArea(e, id){
        e.preventDefault();
        this.goToPage(e);
        this.setState({
            updateArea: true,
            titleForm: 'Fluggebiet bearbeiten.'
        })
        //Fill out the area-form with the current Area to update
        if(this.state.idToEditArea !== '' && this.props.currentPilot.role === 'admin'){
            this.fillAreaFormToUpdate(id);
        }
    }
    fillAreaFormToUpdate(id){
        let currentArea = _.find(this.props.startplaces, { id: id });
        this.setState({
            regionsId: currentArea.region.id,
            startareaname: currentArea.name,
            funicularLink: currentArea.funicularLink,
            arealocationpin: currentArea.locationpin,
            webcam: (currentArea.webcams && currentArea.webcams[0]) ? currentArea.webcams[0] : '',
            webcam2: (currentArea.webcams && currentArea.webcams[1]) ? currentArea.webcams[0] : '',
            webcam3: (currentArea.webcams && currentArea.webcams[2]) ? currentArea.webcams[0] : '',
            shvInfo: currentArea.shvInfo,
            windstation1: (currentArea.weatherstations && currentArea.weatherstations[0]) ? currentArea.weatherstations[0] : '',
            windstation2: (currentArea.weatherstations && currentArea.weatherstations[1]) ? currentArea.weatherstations[1] : '',
            windstation3: (currentArea.weatherstations && currentArea.weatherstations[2]) ? currentArea.weatherstations[2] : '',
            xc: currentArea.xc,
            gliderChart: currentArea.gliderChart,
            areaDescription: currentArea.description,
            lastUpdateSA: currentArea.lastUpdate,
            writeDateArea: currentArea.writeDate,
            authorArea: (currentArea.author && currentArea.author !== '') ? currentArea.author : this.props.user.email,

            startareanameValid: true,
            regionsIdValid: true
        });
    }

    render() {
        return ( 
            <main className="main">
                <section className="centered-layout">
                    <BackButton 
                        backto = {false}
                        backfunction={this.goBack}
                        text = 'Abbrechen'
                    />
                    <FormTitle 
                        children = {<FormAnimation
                            xyz = {this.state.ani}
                        />}
                        classes = 'centered-layout__header'
                        titleH2 = {this.state.titleForm}
                    />
            <ReactTransitionGroup component="div" className="formular-wrapper">
            {this.state.formisvisible ? 
                <StartplacesForm 
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    goToPage={this.goToPage}
                    delayEnter={0.2}
                    delayLeave={0.2}
                
                    getOptionsAreas={this.getOptions(this.props.startplaces, 'Fluggebiet wählen', 'name')}  

                    classNameAreas={`formular__input-wrapper formular__input-wrapper--fullwith ${this.errorClass(this.state.formErrors.startareasId)}`}
                    classNameName={`formular__input-wrapper ${this.errorClass(this.state.formErrors.name)}`}
                    classNameAltitude={`formular__input-wrapper formular__input-wrapper--margin-left ${this.errorClass(this.state.formErrors.altitude)}`}
                    classNamePlace={`formular__input-wrapper formular__input-wrapper--fullwith ${this.errorClass(this.state.formErrors.locationpin)}`}
                    classNameDesc={`formular__input-wrapper formular__input--text ${this.errorClass(this.state.formErrors.description)}`}
                    classNameImageUrl={`formular__input-wrapper ${this.errorClass(this.state.formErrors.imagesUrl)}`}
                    classNameImageNumber={`formular__input-wrapper ${this.errorClass(this.state.formErrors.imagesCount)}`}
                    
                    nameStartplaceName='name'
                    nameAltitude='altitude' 
                    namePlace='locationpin'
                    nameDescription='description'
                    nameAreas='startareasId'
                    nameImages='imagesUrl'
                    nameImagesCount='imagesCount'
                    typeName='text'
                    typeAltitude='text'
                    typePlace='text'
                    typeDescription='text'
                    labelName='Name'
                    labelAltitude='Höhe in Meters'
                    labelPlace='Standortpin'
                    labelDescription='Beschrieb'
                    areasLabel='Fluggebiet wählen'
                    labelImages='Bildordner'
                    labelImagesCount='Anzahl Bilder'

                    errorMessageAreas={this.state.formErrors.startareasId}
                    errorMessageName={this.state.formErrors.name}
                    errorMessageAltitude={this.state.formErrors.altitude}
                    errorMessagePlace={this.state.formErrors.locationpin}
                    errorMessagecb={this.state.formErrors.winddirection}
                    errorMessageDesc={this.state.formErrors.description}
                    errorMessageImagesUrl={this.state.formErrors.imagesUrl}
                    errorMessageimagesCount={this.state.formErrors.imagesCount}

                    cbClassNameWrapper={`formular__input-wrapper formular__input-wrapper--checkboxes ${this.errorClass(this.state.formErrors.winddirection)}`}
                    cbClassNameLabel='formular__part-title'
                    cbLabel='Windrichtungen'
                    classNameCheckboxWrapper='formular__checkbox-wrapper'
                    cbOptions={this.getOptionsCheckbox(this.props.winddirections, 'id')}
                    cbClassNameLabelItem='formular__checkbox-item'
                    cbName='winddirection'
                    cbSelectedOptions={this.state.winddirection}
                    classNameCheckbox='formular__checkbox'
                    classNameCheckboxTxt='formular__checkbox-text'

                    valueAreas={this.state.startareasId}
                    valueName={this.state.name}
                    valueAltitude={this.state.altitude}
                    valuePlace={this.state.locationpin}
                    valueImageUrl={this.state.imagesUrl}
                    valueImageNumber={this.state.imagesCount}
                    valueDescription={this.state.description}

                    toEdit={this.state.toEditArea}
                    editArea={(event)=>{this.editArea(event, this.state.idToEditArea)}}
                /> : null}
            </ReactTransitionGroup>
            {this.state.errorAlert && !this.state.formstartareaisvisible && <FormErrorAlert>{validation.valForm}</FormErrorAlert>}
            <ReactTransitionGroup component="div" className="formular-wrapper">
            {this.state.formstartareaisvisible ? 
                <StartareasForm 
                    delayEnter={0.75}
                    delayLeave={0.2}

                    onChange={this.onChange}
                    onSubmitArea={this.onSubmitArea}
                    regioLabel='Region wählen'
                    nameRegio='regionsId'

                    errorMessageRegio={this.state.formErrorsArea.regionsId}
                    errorMessageAreaName={this.state.formErrorsArea.startareaname}    
                    errorMessageFunicularLink={this.state.formErrorsArea.funicularLink}
                    errorMessageSandortpin={this.state.formErrorsArea.locationpin}
                    errorMessageWebcams1={this.state.formErrorsArea.webcam}
                    errorMessageWebcams2={this.state.formErrorsArea.webcam2}
                    errorMessageWebcams3={this.state.formErrorsArea.webcam3}
                    errorMessageShvInfo={this.state.formErrorsArea.shvInfo}
                    errorMessageWindstation1={this.state.formErrorsArea.windstation1}
                    errorMessageWindstation2={this.state.formErrorsArea.windstation2}
                    errorMessageWindstation3={this.state.formErrorsArea.windstation3}
                    errorMessageXc={this.state.formErrorsArea.xc}
                    errorMessageAreaDescription={this.state.formErrorsArea.areaDescription}
                    errorMessagegliderChart={this.state.formErrorsArea.gliderChart}

                    getOptionsRegio={this.getOptions(this.props.regions, 'Region wählen', 'name')}

                    classNameAreaName={`formular__input-wrapper ${this.errorClass(this.state.formErrorsArea.startareaname)}`}
                    classNameRegio={`formular__input-wrapper formular__input-wrapper--fullwith ${this.errorClass(this.state.formErrorsArea.regionsId)}`}
                    classNameAreaFuniculare={`formular__input-wrapper formular__input-wrapper--margin-left ${this.errorClass(this.state.formErrorsArea.funicularLink)}`}
                    classNameArealocation={`formular__input-wrapper formular__input-wrapper--fullwith ${this.errorClass(this.state.formErrorsArea.locationpin)}`}
                    classNameAreawebcam={`formular__input-wrapper ${this.errorClass(this.state.formErrorsArea.webcam)}`}
                    classNameAreawebcam2={`formular__input-wrapper ${this.errorClass(this.state.formErrorsArea.webcam2)}`}
                    classNameAreawebcam3={`formular__input-wrapper ${this.errorClass(this.state.formErrorsArea.webcam3)}`}
                    classNameAreashv={`formular__input-wrapper ${this.errorClass(this.state.formErrorsArea.shvInfo)}`}
                    classNameAreawindstation={`formular__input-wrapper ${this.errorClass(this.state.formErrorsArea.windstation1)}`}
                    classNameAreawindstation2={`formular__input-wrapper ${this.errorClass(this.state.formErrorsArea.windstation2)}`}
                    classNameAreawindstation3={`formular__input-wrapper ${this.errorClass(this.state.formErrorsArea.windstation3)}`}
                    classNameAreaXc={`formular__input-wrapper ${this.errorClass(this.state.formErrorsArea.xc)}`}
                    classNameAreaDesc={`formular__input-wrapper formular__input--text ${this.errorClass(this.state.formErrorsArea.areaDescription)}`}
                    classNameGliderChart={`formular__input-wrapper formular__input-wrapper--fullwith ${this.errorClass(this.state.formErrorsArea.gliderChart)}`}
                    
                    valueRegio={this.state.regionsId}
                    valueAreaName={this.state.startareaname}
                    valueAreaFuniculare={this.state.funicularLink}
                    valueArealocation={this.state.arealocationpin}
                    valueAreawebcam={this.state.webcam}
                    valueAreawebcam2={this.state.webcam2}
                    valueAreawebcam3={this.state.webcam3}
                    valueAreashv={this.state.shvInfo}
                    valueAreawindstation={this.state.windstation1}
                    valueAreawindstation2={this.state.windstation2}
                    valueAreawindstation3={this.state.windstation3}
                    valueAreaXc={this.state.xc} 
                    valueDescription={this.state.areaDescription}
                    valuegliderChart={this.state.gliderChart}
                /> : null}
            </ReactTransitionGroup>
            {this.state.errorAlertArea && this.state.formstartareaisvisible && <FormErrorAlert>{validation.valForm}</FormErrorAlert>}
            </section>
           </main>
        );
    }
}

let flightform = reduxForm({
    form: 'NewPost'
  })(StartplaceFormContainer);
  
  flightform = connect((state, props) => {
        let key = (props.match.params.id) ? props.match.params.id.split("--sp--")[0] : '';
          return  {
                flights: state.flights,
                startplaces: state.startplaces,
                currentStartplace: _.find(state.startplaces, { id: key }),
                user: state.user,
                regions: state.regions,
                winddirections: state.winddirections,
                currentPilot: _.find(state.pilots, { email: state.user.email })
            };
        }, { saveStartplaces, getStartplaces, updateStartplaces, deleteStartplaces, getUser, getRegions, updateRegions, getWinddirections, updateWinddirections, getPilots, getFlights, updateFlights }
    )(flightform);

export default withRouter(flightform);
