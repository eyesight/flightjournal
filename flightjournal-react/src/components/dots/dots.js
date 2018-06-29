import React from 'react';

const Dots = props => {
    const _onClick = () => {
        props.onItemClick(props.id);
    }
      return (
        <span className={props.classNameDot} data-dots={props.index} onClick={_onClick}></span>
      );
  };  
export default Dots;