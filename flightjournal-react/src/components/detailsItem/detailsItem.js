import React from 'react';

const DetailsItem = (props) => {
    return (
        <div className={props.classNameDetails}>
            <p className={props.classNameDetailsTitel}>{props.title}</p>
            <p className={props.classNameDetailsTxt}>{props.txt}</p>
        </div>
    );
}; 
export default DetailsItem;