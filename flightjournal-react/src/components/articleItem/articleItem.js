import React from 'react';

const ArticleItem = (props) => {
    return (
        <div className="article-item">
            <p className="theme-title">{props.themeTitle}</p>
            <h2 className="title-h2">{props.titleBold}<br/><span className="title--regular">{props.titleReg}</span></h2>
            <p className="text">{props.txt}</p>
            <button className="anchor-wrapper anchor-wrapper--margin-top" onClick={props.onclickfunction}><span className="anchor">{props.link}</span></button>
        </div> 
    );
}; 
export default ArticleItem;