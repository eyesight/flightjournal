import React from 'react';

const DropDownItem = (props) => {
    function clicked(e){
        e.stopPropagation();
        props.chooseFilter(e);
    }

    return (
        <button data-value={props.value} data-filter={props.filtername} data-name={props.name} onClick={(event)=>{clicked(event)}} className="filter__sub-dropdown-item">{props.txt}</button>
    );
};
export default DropDownItem;