import React from 'react';

const DropDownItem = (props) => {
    return (
        <button data-value={props.value} data-filter={props.filtername} data-name={props.name} onClick={props.chooseFilter} className="filter__sub-dropdown-item">{props.txt}</button>
    );
};
export default DropDownItem;