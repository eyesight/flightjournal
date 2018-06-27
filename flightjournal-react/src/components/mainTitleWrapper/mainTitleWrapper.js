import React from 'react';
import MainTitle from '../mainTitle/mainTitle';
import Anchor from '../anchor/anchor';
import Paragraph from '../paragraph/paragraph';


const MainTitleWrapper = (props) => {
    return (
        <div className={props.classNameWrapper}>
            {props.withAnchor && 
                <Anchor 
                    classNameAnchor={props.classNameAnchor}
                    withIcon={props.withIcon}
                    classNameIcon={props.classNameIcon}
                    anchorText={props.anchorText}
                    hrefAnchor={props.hrefAnchor}
                /> 
            }
            <MainTitle 
               classNameH1={props.classNameH1} 
               classNameSpan={props.classNameSpan}
               txtBold={props.textBold}
               txtReg={props.textReg}
            />   
            {props.withParagraph && 
                <Paragraph 
                    classNameParagraph={props.classNameParagraph}
                    paragraphTxt={props.paragraphTxt}
                />}
        </div>
    );
}; 
export default MainTitleWrapper;