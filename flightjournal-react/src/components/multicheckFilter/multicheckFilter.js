import React from 'react';

const MulticheckFilter = (props) => {
    return (
        <button onClick={props.filteraction} data-value={props.dataValue} data-filter={props.dataFilter} className={props.classNameValue} >{props.txt}</button>
    );
};
export default MulticheckFilter;