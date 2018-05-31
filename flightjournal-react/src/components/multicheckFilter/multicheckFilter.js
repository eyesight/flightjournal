import React from 'react';

const MulticheckFilter = (props) => {
    return (
        <li><a onClick={props.filteraction} data-value={props.dataValue} data-filter={props.dataFilter} className={props.classNameValue} >{props.txt}</a></li>
    );
};
export default MulticheckFilter;