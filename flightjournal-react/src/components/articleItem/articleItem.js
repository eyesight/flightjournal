import React from 'react';

const ArticleItem = (props) => {
    return (
        <div className="article-item">
            <p className="theme-title">{props.themeTitle}</p>
            <h2 className="title-h2">{props.titleBold}<br/><span className="title--regular">{props.titleReg}</span></h2>
            <p className="text">{props.txt}</p>
            <button className="anchor-wrapper anchor-wrapper--margin-top" onClick={props.onclickfunction}><span className="anchor">{props.link}</span></button>
            {props.isAdmin ? <div className="article-item__icon-wrapper"><a className="article-item__icon" href={props.route}>
                                <svg version="1.1" className="svg-icon svg-icon--edit" x="0px" y="0px" viewBox="0 0 23.7 23.7">
                                    <path className="svg-icon__path" d="M20.5,6.3l2.4-2.4l-3.1-3.1l-2.4,2.4"/>
                                    <path className="svg-icon__path" d="M6.4,20.3l14.1-14l-3.1-3.1l-14.1,14l-2.5,5.5L6.4,20.3z M3.3,17.2l3.1,3.1"/>
                                </svg> 
                            </a></div> : null}
        </div> 
    );
}; 
export default ArticleItem;