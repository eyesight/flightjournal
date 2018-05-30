import React from 'react';

const DropDownItem = (props) => {
    return (
        <a data-value={props.value} data-filter={props.filtername} onClick={props.chooseFilter} className="filter__sub-dropdown-item">{props.txt}</a>
    );
};
export default DropDownItem;