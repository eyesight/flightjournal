import React, { Component } from 'react';
import TitleH3 from '../titleH3/titleH3';
import Anchor from '../anchor/anchor';
import * as links from '../../utils/linksOfFlugplanung';

class Linkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonTxt:'+ mehr Links',
            buttonTxtLess: '- weniger Links',
            classNameH3: 'title title-h3',
            classNameTitleReg: 'title title--regular',
            classNameAnchor: 'link-box__link anchor',
            classNameShowMore: 'link-box__show-more js-show-more link-box__show-more--show',
            classNameLinklist: 'link-box__list js-linkbox-links js-linkbox-content--hide',
            classNameLinklistLess: 'link-box__list js-linkbox-links js-linkbox-content--show',
            activeIndex: '',
            count: 0,
            isActive: -1,
            isActiveAll: {}
        };
        this.renderLinks = this.renderLinks.bind(this);
        this.showMoreFunction = this.showMoreFunction.bind(this);
    }
    
    componentWillMount() {
        const themes = Object.keys(links.allLinks).map(i => links.allLinks[i]);
        const newOb = [];
        themes.map((links, index) => {
           return newOb.push(false);
        });

        this.setState({
            isActiveAll: newOb
        })
    };
    

    showMoreFunction(key,e){
        this.setState({
            isActive: key,
            isActiveAll: this.state.isActiveAll.map((item, index) => {
                if (index === key) {
                    if(item === true){
                        return false;
                    }
                    return true
                }
                else {
                    return item
                }
              })
        })
      }

    renderLinks(obj) {
        const themes = Object.keys(obj).map(i => obj[i]);
        const keys = Object.keys(obj);
        const even = [];
        const odd = [];
        
        themes.map((links, index) => {
            const linkList = links.links.map((link, i) => {
                return( 
                 <li key={i}>
                     <Anchor 
                         anchorText={link.title} 
                         hrefAnchor={link.link}
                         classNameAnchor={this.state.classNameAnchor}
                         withIcon={false}
                         withTarget={true}
                     />
                 </li>
                )});
            if(index%2 === 0){
                even.push(
                        <div key={index} className="box link-box js-linkbox">
                            <div className="link-box__content js-linkbox-content">
                                <TitleH3 
                                    classNameH3={this.state.classNameH3} 
                                    classNameTitleReg={this.state.classNameTitleReg}
                                    txtBold={keys[index] + '.'}
                                    txtReg={links.subtitle}
                                />
                                <ul className={this.state.isActiveAll[index] ?  this.state.classNameLinklistLess : this.state.classNameLinklist}>
                                    {linkList}
                                </ul>
                                <a onClick={()=> this.showMoreFunction(index)} className={this.state.classNameShowMore}>
                                    {this.state.isActiveAll[index] ? this.state.buttonTxtLess : this.state.buttonTxt}
                                </a>
                            </div>
                        </div>
                );
            }else{
                odd.push(
                    <div key={index} className="box link-box js-linkbox">
                        <div className="link-box__content js-linkbox-content">
                            <TitleH3 
                                classNameH3={this.state.classNameH3}
                                classNameTitleReg={this.state.classNameTitleReg}
                                txtBold={keys[index] + '.'}
                                txtReg={links.subtitle}
                            />
                             <ul className={this.state.isActiveAll[index] ?  this.state.classNameLinklistLess : this.state.classNameLinklist}>
                                {linkList}
                            </ul>
                            <a onClick={()=> this.showMoreFunction(index)} className={this.state.classNameShowMore}>
                                {this.state.isActiveAll[index] ? this.state.buttonTxtLess : this.state.buttonTxt}
                            </a>
                        </div>
                    </div>
                    );
                } 
                return ''; 
               }
            );
            return (
                <React.Fragment>
                    <div className="start__twocolumn js-linkbox-slideshow-container">
                        {even}
                        <div className="link-box__prev-next only-show-on-mobile">
                            <a className="link-box__prev js-prev"><span className="link-box__prev-text"></span><i className="fas fa-chevron-left link-box__fa"></i></a>
                            <a className="link-box__next js-next"><i className="fas fa-chevron-right link-box__fa"></i><span className="link-box__next-text"></span></a>
                        </div>
                        <div className="link-box__dots only-show-on-mobile">
                            <span className="link-box__dot js-dot" data-dot="1"></span>
                            <span className="link-box__dot js-dot" data-dot="2"></span>
                            <span className="link-box__dot js-dot" data-dot="3"></span>
                        </div>
                    </div>
                    <div className="start__twocolumn js-linkbox-slideshow-container">
                        {odd}
                        <div className="link-box__prev-next only-show-on-mobile">
                            <a className="link-box__prev js-prev"><span className="link-box__prev-text"></span><i className="fas fa-chevron-left link-box__fa"></i></a>
                            <a className="link-box__next js-next"><i className="fas fa-chevron-right link-box__fa"></i><span className="link-box__next-text"></span></a>
                        </div>
                        <div className="link-box__dots only-show-on-mobile">
                            <span className="link-box__dot js-dot" data-dot="1"></span>
                            <span className="link-box__dot js-dot" data-dot="2"></span>
                            <span className="link-box__dot js-dot" data-dot="3"></span>
                        </div>
                    </div>
                </React.Fragment>
            );
        }

    render() {
        return (
            <React.Fragment>
                {this.renderLinks(links.allLinks)}
            </React.Fragment>
        )
    };
}; 

export default Linkbox;