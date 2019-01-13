import React, {Component} from 'react';
import {TweenLite} from 'gsap';

class MessageBoxInfo extends Component{
    constructor(props) {
        super(props);
        this.messageBoxe = React.createRef();
    }

    componentWillEnter(callback) {
        TweenLite.fromTo(this.messageBoxe.current, 0.2, {opacity:"0", scale : 0.1, y:"900px"}, {opacity:"1", y:"0px", scale : 1, onComplete: callback});
    }

    render() {
        const {txt, functionBtn1, button1Txt, button1Class } = this.props;

    return (
        <div className="messageBox-Background">
                <div ref={this.messageBoxe} className="messageBox">
                    <p className="messageBox__text">{txt}</p>
                    <div className="checkmark">
                        <div className="checkmark__circle"></div>
                        <div className="checkmark__stem"></div>
                        <div className="checkmark__kick"></div> 
                    </div>
                    <button onClick={functionBtn1} className={button1Class}>{button1Txt}</button>
                </div>
            </div>
        )};
};
export default MessageBoxInfo;