import React, {Component} from 'react';
import StartplacesFormPart from './startplacesFormPart';
import LandingplacesFormPart from './landingplacesFormPart';
import {TweenLite} from 'gsap';

class StartplacesForm extends Component {
    constructor(props) {
        super(props);
        this.formular1 = React.createRef();
    }   
    componentDidEnter(callback){
        const { delayEnter } = this.props
        TweenLite.fromTo(this.formular1.current, 0.5, {opacity:"0", x:"-900px"}, {opacity:"1", x:"0px", onComplete: callback, delay: delayEnter});
    }

    componentWillAppear(callback) {
        window.scrollTo(0, 0);
        const { delayEnter } = this.props
        TweenLite.fromTo(this.formular1.current, 0.5, {opacity:"0", x:"-900px"}, {opacity:"1", x:"0px", onComplete: callback, delay: delayEnter});
    }

    componentWillLeave (callback) {
        const { delayLeave } = this.props
        TweenLite.to(this.formular1.current, 0.5, {opacity:"0", x:"900px", onComplete: callback, delay: delayLeave});
    }
    componentWillUnmount() {
        console.log('unmount startplaces');
      }
    
    render() {
        const { onChange, onSubmit, goToPage, classNameAreas, areasLabel, nameAreas, valueAreas, getOptionsAreas, errorMessageAreas, valueDescription, errorMessageDesc, classNameName, labelName, typeName, nameStartplaceName, classNameAltitude, labelAltitude, typeAltitude, nameAltitude, classNamePlace, labelPlace, typePlace, namePlace, labelDescription, typeDescription, nameDescription, 
                errorMessageImagesUrl, errorMessageimagesCount, cbClassNameWrapper, cbClassNameLabel, cbLabel, classNameCheckboxWrapper, cbOptions, cbClassNameLabelItem, cbName, cbSelectedOptions, classNameCheckbox, classNameCheckboxTxt, classNameDesc, labelImages, labelImagesCount, nameImages, nameImagesCount,
                errorMessageName, errorMessageAltitude, errorMessagePlace, errorMessagecb, classNameImageUrl, classNameImageNumber,
                valueName, valueAltitude, valuePlace, valueImageUrl, valueImageNumber, toEdit, editArea,
            
                lpclassNameName,
                lplabelName,
                lptypeName,
                lpnameStartplaceName,
                lperrorMessageName,
                lpvalueName,
            
                lpclassNameAltitude,
                lplabelAltitude,
                lptypeAltitude,
                lpnameAltitude,
                lperrorMessageAltitude,
                lpvalueAltitude,

                lpclassNamePlace,
                lplabelPlace,
                lptypePlace,
                lpnamePlace,
                lperrorMessagePlace,
                lpvaluePlace,

                lpclassNameDesc,
                lplabelDescription,
                lptypeDescription,
                lpnameDescription,
                lpvalueDesc,
                lperrorMessageDesc,

                lpclassNameImageUrl,
                lplabelImages,
                lpnameImages,
                lperrorMessageImagesUrl,
                lpvalueImageUrl,

                lpclassNameImageNumber,
                lplabelImagesCount,
                lpnameImagesCount,
                lperrorMessageimagesCount,
                lpvalueImageNumber,

                showStartplace,
                showLandingplace
            } = this.props;
        return (
            <form ref={this.formular1} className="formular" onSubmit={onSubmit}>
                <div className={classNameAreas}>
                    <label className="formular__label">{areasLabel}</label>
                    <div className="formular__select">
                        <i className="fas fa-angle-down"></i>
                        <select className="formular__dropdown-select" name={nameAreas} value={valueAreas} onChange={onChange}>
                            {getOptionsAreas}
                        </select> 
                     </div> 
                <span className='formular__validationBox'>{errorMessageAreas}</span>
                <button className="link link--black link-with-icon" onClick={goToPage}><i className="fas fa-plus"></i> neues Fluggebiet erfassen </button>
                {toEdit ? <button className="link link--black link-with-icon" onClick={editArea}><i className="fas fa-plus"></i> dieses Fluggebiet bearbeiten </button> : null}
                </div>
                {showStartplace ? <StartplacesFormPart 
                    onChange={onChange}
                    valueDesc={valueDescription}
                    errorMessageDesc={errorMessageDesc}
                    classNameName={classNameName}
                    labelName={labelName}
                    typeName={typeName}
                    nameStartplaceName={nameStartplaceName}
                    classNameAltitude={classNameAltitude}
                    labelAltitude={labelAltitude}
                    typeAltitude={typeAltitude}
                    nameAltitude={nameAltitude}
                    classNamePlace={classNamePlace}
                    labelPlace={labelPlace}
                    typePlace={typePlace}
                    namePlace={namePlace}
                    labelDescription={labelDescription}
                    typeDescription={typeDescription}
                    nameDescription={nameDescription}
                    cbClassNameWrapper={cbClassNameWrapper}
                    cbClassNameLabel={cbClassNameLabel}
                    cbLabel={cbLabel}
                    classNameCheckboxWrapper={classNameCheckboxWrapper}
                    cbOptions={cbOptions}
                    cbClassNameLabelItem={cbClassNameLabelItem}
                    cbName={cbName}
                    cbSelectedOptions={cbSelectedOptions}
                    classNameCheckbox={classNameCheckbox}
                    classNameCheckboxTxt={classNameCheckboxTxt}
                    classNameDesc={classNameDesc}
                    errorMessageImagesUrl={errorMessageImagesUrl} 
                    errorMessageimagesCount={errorMessageimagesCount}
                    labelImages={labelImages}
                    labelImagesCount={labelImagesCount}
                    nameImages={nameImages}
                    nameImagesCount={nameImagesCount}
                    errorMessageName={errorMessageName}
                    errorMessageAltitude={errorMessageAltitude}
                    errorMessagePlace={errorMessagePlace}
                    errorMessagecb={errorMessagecb}
                    classNameImageUrl={classNameImageUrl}
                    classNameImageNumber={classNameImageNumber}
                    valueName={valueName}
                    valueAltitude={valueAltitude}
                    valuePlace={valuePlace}
                    valueImageUrl={valueImageUrl}
                    valueImageNumber={valueImageNumber}
                /> : null}
                {showLandingplace ? <LandingplacesFormPart
                    classNameName={lpclassNameName}
                    labelName={lplabelName}
                    onChange={onChange} 
                    typeName={lptypeName}
                    nameStartplaceName={lpnameStartplaceName}
                    errorMessageName={lperrorMessageName}
                    valueName={lpvalueName}

                    classNameAltitude={lpclassNameAltitude}
                    labelAltitude={lplabelAltitude}
                    typeAltitude={lptypeAltitude}
                    nameAltitude={lpnameAltitude}
                    errorMessageAltitude={lperrorMessageAltitude}
                    valueAltitude={lpvalueAltitude}

                    classNamePlace={lpclassNamePlace}
                    labelPlace={lplabelPlace}
                    typePlace={lptypePlace}
                    namePlace={lpnamePlace}
                    errorMessagePlace={lperrorMessagePlace}
                    valuePlace={lpvaluePlace}

                    classNameDesc={lpclassNameDesc}
                    labelDescription={lplabelDescription}
                    typeDescription={lptypeDescription}
                    nameDescription={lpnameDescription}
                    valueDesc={lpvalueDesc}
                    errorMessageDesc={lperrorMessageDesc}

                    classNameImageUrl={lpclassNameImageUrl}
                    labelImages={lplabelImages}
                    nameImages={lpnameImages}
                    errorMessageImagesUrl={lperrorMessageImagesUrl}
                    valueImageUrl={lpvalueImageUrl}

                    classNameImageNumber={lpclassNameImageNumber}
                    labelImagesCount={lplabelImagesCount}
                    nameImagesCount={lpnameImagesCount}
                    errorMessageimagesCount={lperrorMessageimagesCount}
                    valueImageNumber={lpvalueImageNumber}
                /> : null}
                <div className="button-group">
                    <div className="button-wrapper">
                        <button type="submit" className="button button--large-white">Speichern und zurück</button>
                    </div>
                </div>
            </form>
        );
    }
};
export default StartplacesForm;