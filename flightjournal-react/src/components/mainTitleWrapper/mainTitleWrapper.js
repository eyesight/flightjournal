import React from 'react';
import MainTitleWithIcons from '../mainTitle/mainTitleWithIcons';
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
            <MainTitleWithIcons  
               classNameH1={props.classNameH1} 
               classNameSpan={props.classNameSpan}
               txtBold={props.textBold}
               txtReg={props.textReg}
               hasIcon={props.hasIcon}
               iconpin={props.iconpin}
               hasIcons2={props.hasIcons2}
               icons2={props.icons2}
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