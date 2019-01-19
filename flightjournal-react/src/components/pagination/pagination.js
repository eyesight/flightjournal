import React from 'react';

const Pagination = props => {
      return (
        <div className="pagination">
          {props.hasPrev ? <button className="pagination__button pagination__button--prev" onClick={props.prevfunction}>
          <svg className="pagination__icon" data-name="prev" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.9 23">
            <title>prev</title>
            <path d="M0,11.6a.76.76,0,0,0,.2.5L10.6,22.8a.72.72,0,0,0,1,0l1.1-1.2a.72.72,0,0,0,0-1L3.9,11.5l8.8-9.1a.76.76,0,0,0,.2-.5.76.76,0,0,0-.2-.5L11.6.2a.72.72,0,0,0-1,0L.2,10.9C.1,11.3,0,11.5,0,11.6Z"/>
          </svg></button> : <button className="pagination__empty">&nbsp;</button>}
            <p className="pagination__text">{props.txt}</p>
          {props.hasNext ? <button className="pagination__button--next" onClick={props.nextfunction}>
            <svg className="pagination__icon" data-name="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.9 23">
              <title>next</title>
              <path d="M13,11.4a.76.76,0,0,0-.2-.5L2.4.2A.76.76,0,0,0,1.9,0a.76.76,0,0,0-.5.2L.3,1.4a.76.76,0,0,0-.2.5.76.76,0,0,0,.2.5l8.8,9.1L.3,20.6a.72.72,0,0,0,0,1l1.1,1.2a.76.76,0,0,0,.5.2.76.76,0,0,0,.5-.2L12.8,12.1A2.54,2.54,0,0,0,13,11.4Z"/>
            </svg></button> : <button className="pagination__empty">&nbsp;</button>}
        </div>
      );
  };  
export default Pagination; 