import React from 'react';

const InputField = (props) => {
    return (
        <div className={props.classes}>
            <label className="formular__label">{props.label}</label>
            <input onChange={props.inputAction} value={props.value} className="formular__input" type={props.type} name={props.name} autoComplete={props.autocomp} />
        </div>
    );
};
export default InputField;