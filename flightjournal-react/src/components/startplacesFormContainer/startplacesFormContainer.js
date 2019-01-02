import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, reset } from 'redux-form';
import { getStartplaces, saveStartplaces, updateStartplaces, deleteStartplaces } from '../../actions/StartplacesActions';
import { getStartareas, updateStartareas, saveStartareas } from '../../actions/StartareasActions';
import { getRegions, updateRegions } from '../../actions/RegionsActions';
import { getWinddirections, updateWinddirections } from '../../actions/WinddirectionActions';
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
            oldstartareasId: '',
            oldregionsId: '',
            updateArea: false,

            saveAreaIds: false, 
            startplaceIds: [],
            firstcall: true,

            saveRegionIds: false,
            startareasIds: [],
            firstcallRegion: true,

            areasLabel: '',
            nameAreas: '',

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
            formErrorsArea:{regionsId: '', startareaname: '', funicularLink: '', locationpin: '', webcam: '', webcam2:'', webcam3:'', shvInfo: '', windstation1: '', windstation2: '', windstation3: '', xc: '', areaDescription: ''},
            formErrorsValidArea: {regionsId: false, startareaname: false, funicularLink: true, locationpin: true, webcam: true, webcam2:true, webcam3: true, shvInfo: true, windstation1: true, windstation2: true, windstation3: true, xc: true, areaDescription: true},
            
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
            authorArea: ''
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
    }
    
    componentWillMount() {
        window.scrollTo(0, 0);
        this.props.getStartplaces();
        this.props.getUser();
        this.props.getRegions();
        this.props.getStartareas();
        this.props.getWinddirections();
        this.props.getPilots();
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
        //to compare when function onSubmitArea is called and new ID has to be put in database startareas
        if (_.isEmpty(this.props.startplaces) === false && (this.state.firstcall === true)){
            const keyStartplaces = Object.keys(nextProps.startplaces);
            this.setState({
                startplaceIds: keyStartplaces,
                firstcall: false
            })
        }
        //if history.location.state is set (if someone likes to update a Startplace), set the values of Form-Input-Field
        if( nextProps.currentStartplace && nextProps.currentPilot && nextProps.currentPilot.role === 'admin'){
            let currentSP = nextProps.currentStartplace;
            this.setState({
                oldstartareasId: currentSP.startareasId,
                IDtoUpdateStartplace: nextProps.match.params.id,
                startareasId: currentSP.startareasId,
                name: currentSP.name, 
                altitude: currentSP.altitude,
                description: currentSP.description,
                locationpin: currentSP.locationpin,
                winddirection: currentSP.winddirectionsId, 
                lastUpdateSP: currentSP.lastUpdate,
                imagesUrl: currentSP.imagesUrl,
                imagesCount: currentSP.imagesCount,
                rating: currentSP.rating,
                writeDateSP: currentSP.writeDate,
                authorSP: (currentSP.author) ? currentSP.author : nextProps.user.email,

                //set state of forminput
                //TODO: find a better solution
                formValid: true,
                startareasIdValid: true,
                nameValid: true,
                altitudeValid: true,
                winddirectionValid: true,
                idToEditArea: currentSP.startareasId //DELETE
            })
        }
    }

    componentWillUnmount() {
        this.setState({
            _isMounted: false
        });
        
      }
    
    componentDidUpdate(){
        //when state saveAreaId is set to true, the new Object set in function onSubmit 
        if(this.state.startareasId && this.state.saveAreaIds){
            let that = this;
            let sparray = [];
            let newarr = [];
            const keysOfStartareas = Object.keys(this.props.startareas).map(i => this.props.startareas[i]);
            const startplacesID = Object.keys(this.props.startplaces).map(i => this.props.startplaces[i]);
            startplacesID.map(function (item) {
                return newarr.push(item.id);
            });
            //if a flight will be updated; when something is stored in props.match.param.id, the id of the actual flight has to be added in the Startarea
            //compare the new array of startplaces-Objects with the old one, before user clicked on "save" - so Id of new object stored in variable diff
            let diff = (this.props.match.params.id) ? [this.props.match.params.id] : newarr.filter(y => !that.state.startplaceIds.includes(y));
            //add all the startplaces-IDs whitch are stored in "startplaces" of Object startareas and push the new Id (stored in variable diff)
            keysOfStartareas.map(function (item) {
                if(item.id === that.state.startareasId){
                    //if array of startareas exits, add the new Id, otherwise build a new array with first Id in it
                    return (item.startplaces) ? (
                        sparray = item.startplaces,
                        sparray.push(...diff)
                    ) : sparray = diff;
                };
                return sparray;
            });
            let objArea = {
                startplaces: sparray
            }
            //update Startareas with the updated array of startplaces-Ids
            this.props.updateStartareas(this.state.startareasId, objArea).then(
                this.props.dispatch(reset('NewPost')),
                this.setState({
                    saveAreaIds: false
                }),
                //When Object is updated, return to flight-Detail-Page
                //When new and there is nothing in state from; return to frontpage. Otherwise return to the from-state
                (this.props.match.params.id) ? (
                    this.props.history.push(`${routes.STARTPLATZOHNEID}${this.state.IDtoUpdateStartplace}`)
                ) : (
                    (this.state.from) ? this.props.history.push(this.state.from) : this.props.history.push(routes.HOME)
                )
            ).catch((err) => {
                console.log('error when update startareas when safe startplaces');
                console.log(err)
              }
            );
        }
  
        //when state saveRegionIds is set to true, the new Object set in function onSubmitArea
        if(this.state.regionsId && this.state.saveRegionIds){
            let that = this;
            let regioarr = [];
            let newarrArea = [];
            const keysOfRegions = Object.keys(this.props.regions).map(i => this.props.regions[i]);
            const regionsId = Object.keys(this.props.startareas).map(i => this.props.startareas[i]);
            regionsId.map(function (item) {
                return newarrArea.push(item.id);
            });
            //compare the new array of startareas-Objects with the old one, before user clicked on "save" - so Id of new object is stored in variable diffArea
            let diffArea = (this.state.updateArea) ? [this.state.idToEditArea] : newarrArea.filter(y => !that.state.startareasIds.includes(y));
            keysOfRegions.map(function (item) {
                if(item.id === that.state.regionsId){
                    //if array of startareas exits, add the new Id, otherwise build a new array with first Id in it
                    return (item.startareas) ? (
                        regioarr = item.startareas,
                        regioarr.push(...diffArea)
                    ) : regioarr = diffArea;
                };
                return regioarr;
            });
            let objRegio = {
                startareas: regioarr
            }
            //update Regions with the updated array of startareas-Ids
            this.props.updateRegions(this.state.regionsId, objRegio).then(
                this.props.dispatch(reset('NewPost')),
                //When Object is updated, return to startplaces-form by changing states
                this.setState({
                    formstartareaisvisible: false,
                    formisvisible: true,
                    titleForm: (this.props.match.params.id)?'Startplatz editieren.':'Neuen Startplatz erfassen.',
                    saveRegionIds: false
                })
            ).catch((err) => {
                console.log('error when update startareas when safe startplaces');
                console.log(err)
              }
            );
        }
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
            imagesValid = (/^[a-zA-Z0-9\_]*$/gi).test(this.state.imagesUrl);
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
            areaDescription: areaDescriptionValid
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
        areaDescriptionValid: areaDescriptionValid
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
                this.state.areaDescriptionValid
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

    onSubmit(e){
        e.preventDefault();
        let actualTimestamp = moment().format("YYYY-MM-DD HH:mm:ss Z");
        let author = this.props.user.email;
        if(this.state.formValid){
            this.setState({errorAlert: false})
        obj = {
            writeDate: actualTimestamp, 
            lastUpdate: updateLastUpdateArray(this.state.lastUpdateSP, actualTimestamp),
            name: this.state.name,
            altitude : this.state.altitude,
            locationpin: this.state.locationpin,
            description : this.state.description,
            startareasId: this.state.startareasId,
            winddirectionsId: this.state.winddirection,
            rating: '',
            imagesUrl: this.state.imagesUrl,
            imagesCount: this.state.imagesCount,
            author: author,
        }
        //if there is set an ID to update a fligt. Otherwise save a new flight
        if(this.state.IDtoUpdateStartplace !== ''){
            let that = this;
            let arrayToremove = [];
            const keysOfOldStartareas = Object.keys(this.props.startareas).map(i => this.props.startareas[i]);
            keysOfOldStartareas.map(function (item) {
                if(item.id === that.state.oldstartareasId && item.startplaces){
                    item.startplaces.splice( item.startplaces.indexOf(that.props.match.params.id), 1 );
                    return arrayToremove = item.startplaces;
                }else{
                    return arrayToremove = [];
                }
            });
            let objArea = {
                startplaces: arrayToremove
            }
            this.props.updateStartareas(this.state.oldstartareasId, objArea).then(
                this.props.dispatch(reset('NewPost')),
                this.props.updateStartplaces(this.state.IDtoUpdateStartplace, obj).then(
                    //when new Object is updated, state saveAreaIds will set to true, so function in componentDidUpdate will be continued
                    this.props.dispatch(reset('NewPost')),
                    this.setState({
                        saveAreaIds: true
                    })
                ).catch((err) => {
                    console.log('error when update startplaces');
                    console.log(err)
                    }
                )
            ).catch((err) => {
                console.log('error when update startareas when safe startplaces');
                console.log(err)
              }
            ); 
        }else{
            //when new Object is added, state saveAreaIds will set to true, so function in componentDidUpdate will be continued
            this.props.saveStartplaces(obj).then(
                this.props.dispatch(reset('NewPost')),
                this.setState({
                    saveAreaIds: true
                })
            ).catch((err) => {
                console.log('error when safe startplaces');
                console.log(err)
              }
            );
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
        let author = this.props.user.email;
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
                windstation3: ''
            })
        
            this.setState({errorAlertArea: false})
            obj = {
                description: this.state.areaDescription,
                funicularLink: this.state.funicularLink,
                landingplaces: this.state.landingplaces,
                lastUpdate: updateLastUpdateArray(this.state.lastUpdateSA, actualTimestamp),
                locationpin: this.state.arealocationpin,
                name: this.state.startareaname,
                rating: '',
                regionsId: this.state.regionsId,
                shvInfo: this.state.shvInfo,
                
                webcams: webcamarr,
                weatherstations: windstationarr,
                writeDate: actualTimestamp,
                author: author,
                xc: this.state.xc
            }
            if(this.state.updateArea===true && this.state.idToEditArea !==''){
                let that = this;
                let arrayToremove = [];
                const keysOfOldRegions = Object.keys(this.props.regions).map(i => this.props.regions[i]);
                keysOfOldRegions.map(function (item) {
                    if(item.id === that.state.oldregionsId){
                        item.startareas.splice( item.startareas.indexOf(that.state.idToEditArea), 1 );
                        return arrayToremove = item.startareas;
                    }
                    return '';
                });
                let objRegio = {
                    startareas: arrayToremove
                }
                this.props.updateRegions(this.state.oldregionsId, objRegio).then(
                    this.props.dispatch(reset('NewPost')),
                    this.props.updateStartareas(this.state.idToEditArea, obj).then(
                        //when new Object is updated, state saveAreaIds will set to true, so function in componentDidUpdate will be continued
                        this.props.dispatch(reset('NewPost')),
                        this.setState({
                            saveRegionIds: true
                        })
                    ).catch((err) => {
                        console.log('error when update startareas');
                        console.log(err)
                        }
                    )
                ).catch((err) => {
                    console.log('error when update startareas when safe startplaces');
                    console.log(err)
                }
                ); 
            }else{
                //when new Object is added, state saveRegionIds will set to true, so function in componentDidUpdate will be continued
                this.props.saveStartareas(obj).then(
                    this.props.dispatch(reset('NewPost')),
                    this.setState({
                        saveRegionIds: true
                    })
                ).catch((err) => {
                    console.log('error when safe startareas');
                    console.log(err)
                }
                );
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
            this.props.dispatch(reset('NewPost'));
            this.props.history.push(routes.FLUGDATEN_ERFASSEN)
        }
    }

    goToPage(e){
        e.preventDefault();
        const keyStartareas = Object.keys(this.props.startareas);
        this.setState({
            formstartareaisvisible: true,
            formisvisible: false,
            titleForm: 'Neues Fluggebiet erfassen.',
            startareasIds: keyStartareas, //Store all Startareas in array, to compare the array before the update state and store the new element in the array, when saved

            oldregionsId: '',
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
        let currentArea = _.find(this.props.startareas, { id: id });
        this.setState({
            oldregionsId: currentArea.regionsId,
            regionsId: currentArea.regionsId,
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
            areaDescription: currentArea.description,
            lastUpdateSA: currentArea.lastUpdate,
            writeDateArea: currentArea.writeDate,
            authorArea: (currentArea.author) ? currentArea.author : '',

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
                
                    getOptionsAreas={this.getOptions(this.props.startareas, 'Fluggebiet wählen', 'name')}  

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
        let key = (props.match.params.id) ? props.match.params.id : '';
        
          return  {
                startplaces: state.startplaces,
                currentStartplace: _.find(state.startplaces, { id: key }),
                user: state.user,
                regions: state.regions,
                startareas: state.startareas,
                winddirections: state.winddirections,
                currentPilot: _.find(state.pilots, { email: state.user.email })
            };
        }, { saveStartplaces, getStartplaces, updateStartplaces, deleteStartplaces, getUser, getStartareas, updateStartareas, saveStartareas, getRegions, updateRegions, getWinddirections, updateWinddirections, getPilots }
    )(flightform);

export default withRouter(flightform);
