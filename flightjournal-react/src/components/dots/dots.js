import React from 'react';

const Dots = props => {
    const _onClick = () => {
      console.log(props.id);
    }
      return (
        <span key={props.index} className={props.classNameDot} onClick={props._onClick}></span>
      );
  };  
export default Dots;