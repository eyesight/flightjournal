import React from 'react';

const Dropdown = (props) => {
    return (
        <div className={props.className}>
                <label className="formular__label">{props.label}</label>
                <div className="formular__select">
                    <i className="fas fa-angle-down"></i>
                    <select className="formular__dropdown-select" name={props.name} value={props.value} onChange={props.onChange}>
                        {props.getOptions}
                    </select> 
            </div> 
            <span className='formular__validationBox'>{props.errorMessage}</span>
            </div>
    );
};
export default Dropdown;