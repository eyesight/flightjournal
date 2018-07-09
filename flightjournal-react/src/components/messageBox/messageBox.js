import React, {Component} from 'react';
import {TweenLite} from 'gsap';

class MessageBox extends Component{
    constructor(props) {
        super(props);
        this.messageBoxe = React.createRef();
    }

    componentWillEnter(callback) {
        console.log('componentWillEnter');
        TweenLite.fromTo(this.messageBoxe.current, 0.2, {opacity:"0", scale : 0.1, y:"900px"}, {opacity:"1", y:"0px", scale : 1, onComplete: callback});
    }

    render() {
        const {txt, functionDelete, functionCancel, buttonDeleteTxt, buttonCancelTxt, buttonDelClass, buttonCancClass } = this.props;

    return (
        <div className="messageBox-Background">
                <div ref={this.messageBoxe} className="messageBox">
                    <p className="messageBox__text">{txt}</p>
                    <div className="checkmark">
                        <div className="checkmark__circle"></div>
                        <div className="checkmark__stem"></div>
                        <div className="checkmark__kick"></div> 
                    </div>
                    <div className="button-wrapper button-wrapper__row">
                        <button onClick={functionDelete} className={buttonDelClass}>{buttonDeleteTxt}</button>
                        <button onClick={functionCancel} className={buttonCancClass}>{buttonCancelTxt}</button>
                    </div>
                </div>
            </div>
        )};
};
export default MessageBox;