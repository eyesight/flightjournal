import React from 'react';

const MainTitleWithIcons = (props) => {
    function rendericons(icons, hasIcons){
        let arrayIcon = [];
        if(icons && hasIcons){
            for(let i = 0; i<icons.length; i++){
                arrayIcon.push(
                    <a key={[i].toString()} className="main-title__icon" rel="noopener noreferrer" target="_blank" href={icons[i]}>
                        <svg version="1.1" className="svg-icon svg-icon--video" x="0px" y="0px" viewBox="0 0 46 25">
                            <path className="svg-icon__path" d="M46,1.6L30.7,9.4V0H0v25h30.7v-9.4L46,23.4V1.6z"/>
                        </svg>
                    </a>

                    
                )
            }
        }
        return arrayIcon;
    }
    return (
        <h1 className={props.classNameH1}>
            <span className={props.classNameSpan}>{props.txtBold} 
                            {props.hasIcon ? 
                                <a className="main-title__icon" rel="noopener noreferrer" target="_blank" href={props.iconpin}>
                                    <svg version="1.1" className="svg-icon svg-icon--pin" x="0px" y="0px" viewBox="0 0 25 35">
                                        <path className="svg-icon__path" d="M12.5,0C5.6,0,0,5.6,0,12.6C0,23.9,12.5,35,12.5,35S25,23.9,25,12.6C25,5.7,19.4,0,12.5,0z"/>
                                        <ellipse className="svg-icon__ellipse" cx="12.5" cy="12.5" rx="5.8" ry="5.8"/>
                                    </svg>
                                 </a> : null }
                            {props.hasIcons2 ? 
                                rendericons(props.icons2, props.hasIcons2) : null}
                             <br />
            </span>{props.txtReg}
        </h1>
    );
}; 
export default MainTitleWithIcons;