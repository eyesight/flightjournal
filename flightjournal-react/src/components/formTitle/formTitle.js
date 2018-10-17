import React from 'react';

//TODO: refactore it: make different Components out of this
const FormTitle = (props) => {
    return (
        <div className={props.classes}>
            {props.children}
            {props.pageTitle ? <div className="title-page-title">{props.pageTitle}</div> : null}
            <h2 className="title-h2">{props.titleH2}<br /><span className="title--regular">{props.titleH2regular}</span></h2>
        </div>
    );
};
export default FormTitle;