import React, {Component} from 'react';
import InputField from '../formInputfield/formInputfield';
import Checkbox from '../checkbox/checkbox'

class StartplacesFormPart extends Component {
    render() {
        const { 
            onChange, valueDesc, errorMessageDesc, classNameName, nameStartplaceName, typeName, labelName, nameImages, nameImagesCount,
            classNameAltitude, labelAltitude, typeAltitude, nameAltitude, labelImages, labelImagesCount,
            cbClassNameWrapper, cbClassNameLabel, cbLabel, classNameCheckboxWrapper, cbOptions, cbClassNameLabelItem, cbName, cbSelectedOptions, classNameCheckbox, classNameCheckboxTxt, errorMessageImagesUrl, errorMessageimagesCount,
            classNamePlace, labelPlace, typePlace, namePlace, labelDescription, nameDescription, typeDescription } = this.props;
        return (
            <section className='formular__part'>
                <div className='formular__part-title'>
                    <p>Startplatz#1</p>
                </div>
                <InputField 
                    classes={classNameName}
                    label={labelName}
                    inputAction={onChange}
                    type={typeName}
                    name={nameStartplaceName}
                    autocomp=''
                />
                <InputField 
                    classes={classNameAltitude}
                    label={labelAltitude}
                    inputAction={onChange}
                    type={typeAltitude}
                    name={nameAltitude}
                    autocomp=''
                />
                <InputField 
                    classes={classNamePlace}
                    label={labelPlace}
                    inputAction={onChange}
                    type={typePlace}
                    name={namePlace}
                    autocomp=''
                />
                <Checkbox 
                    classNameWrapper={cbClassNameWrapper}
                    classNameLabel={cbClassNameLabel}
                    label={cbLabel}
                    classNameCheckboxWrapper={classNameCheckboxWrapper}
                    options={cbOptions}
                    classNameLabelItem={cbClassNameLabelItem}
                    name={cbName}
                    onChange={onChange}
                    selectedOptions={cbSelectedOptions}
                    classNameCheckbox={classNameCheckbox}
                    classNameCheckboxTxt={classNameCheckboxTxt}
                />
                <div className='formular__input-wrapper formular__input--text'>
                    <label className="formular__label">{labelDescription}</label>
                    <textarea className="formular__input" type={typeDescription} name={nameDescription} value={valueDesc} onChange={onChange}></textarea>
                    <span className='formular__validationBox'>{errorMessageDesc}</span>
                </div>
                <InputField 
                    classes='formular__input-wrapper'
                    label={labelImages}
                    inputAction={onChange}
                    type='text'
                    name={nameImages}
                    autocomp=''
                    classNamesError={errorMessageImagesUrl}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label={labelImagesCount}
                    inputAction={onChange}
                    type='text'
                    name={nameImagesCount}
                    autocomp=''
                    classNamesError={errorMessageimagesCount}
                />
                <button className='button-without-border button-without-border--small'>+ mehr Startplätze erfassen</button>
            </section>          
        );
    }
};
export default StartplacesFormPart;