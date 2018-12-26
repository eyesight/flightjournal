import React from 'react';

const Checkbox = (props) => {
    return (
        <div className={props.classNameWrapper}>
            <div className={props.classNameLabel}>
                <p>{props.label}</p>
            </div>
            <div className={props.classNameCheckboxWrapper}>
                {props.options.map(option => {
                    return (
                    <label key={option} className={props.classNameLabelItem}>
                        <input
                        name={props.name}
                        onChange={props.onChange}
                        value={option}
                        checked={props.selectedOptions.indexOf(option) > -1 }
                        type="checkbox" />
                        <span className={props.classNameCheckbox}></span> 
                        <span className={props.classNameCheckboxTxt}>{option}</span> 
                    </label>
                    );
                })}
            </div>
            <span className={props.classNamesError}>{props.errorMessage}</span>
        </div>
    )
};
export default Checkbox;