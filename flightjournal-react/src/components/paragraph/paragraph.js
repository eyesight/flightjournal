import React from 'react';

const Paragraph = (props) => {
    return (
        <p className={props.classNameParagraph}>{props.paragraphTxt}</p>
    );
}; 
export default Paragraph;