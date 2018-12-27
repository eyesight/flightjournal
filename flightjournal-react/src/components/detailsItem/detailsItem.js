import React from 'react';

const DetailsItem = (props) => {
    return (
        <div className={props.classNameDetails}>
            <p className={props.classNameDetailsTitel}>{props.title}</p>
            {props.hasLink ? 
                <a rel="noopener noreferrer" className={props.classNameLink} target="_blank" href={props.linkUrl}><span className={props.classNameDetailsTxt}>{props.txt}</span></a>:
                <p className={props.classNameDetailsTxt}>{props.txt}</p>
            }
        </div>
    );
}; 
export default DetailsItem;