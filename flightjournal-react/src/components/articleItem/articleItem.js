import React from 'react';

const ArticleItem = (props) => {
    return (
        <div className={props.classNameWrapper}>
            <p className="theme-title">{props.themeTitle}</p>
            <h2 className="title-h2">{props.titleBold}
                {props.hasIcon ? <a className="title-h2__icon" rel="noopener noreferrer" target="_blank" href={props.iconpin}>
                                    <svg version="1.1" className="svg-icon svg-icon--pin" x="0px" y="0px" viewBox="0 0 25 35">
                                        <path className="svg-icon__path" d="M12.5,0C5.6,0,0,5.6,0,12.6C0,23.9,12.5,35,12.5,35S25,23.9,25,12.6C25,5.7,19.4,0,12.5,0z"/>
                                        <ellipse className="svg-icon__ellipse" cx="12.5" cy="12.5" rx="5.8" ry="5.8"/>
                                    </svg>
                                 </a> : null}
            <br/><span className="title--regular">{props.titleReg}</span></h2>
            <p className="text">{props.txt}</p>
            <button className="anchor-wrapper anchor-wrapper--margin-top" onClick={props.onclickfunction}><span className="anchor">{props.link}</span></button>
            {props.isAdmin ? <div className="article-item__icon-wrapper">
                                <a className="article-item__icon" href={props.route}>
                                    <svg version="1.1" className="svg-icon svg-icon--edit" x="0px" y="0px" viewBox="0 0 23.7 23.7">
                                        <path className="svg-icon__path" d="M20.5,6.3l2.4-2.4l-3.1-3.1l-2.4,2.4"/>
                                        <path className="svg-icon__path" d="M6.4,20.3l14.1-14l-3.1-3.1l-14.1,14l-2.5,5.5L6.4,20.3z M3.3,17.2l3.1,3.1"/>
                                    </svg> 
                                </a> 
                                <button className="table__icon" onClick={props.deletefunction}>
                                    <svg version="1.1" className="svg-icon svg-icon--delete" x="0px" y="0px" viewBox="0 0 23.7 23.7">
                                        <path className="svg-icon__path" d="M2.2,3.7h19 M8.1,3.7V2.2c0-0.8,0.6-1.4,1.4-1.4H14c0.8,0,1.4,0.6,1.4,1.4l0,0v1.5 M19.2,3.7L18.1,21
                                            c0,1-0.8,1.8-1.8,1.8H7.1c-1,0-1.8-0.8-1.8-1.8L4.2,3.7"/>
                                        <path className="svg-icon__path" d="M11.7,6.7v13.2 M8.1,6.7l0.7,13.2 M15.4,6.7l-0.7,13.2"/>
                                    </svg>
                                </button> 
                            </div> : null}
        </div> 
    );
}; 
export default ArticleItem;