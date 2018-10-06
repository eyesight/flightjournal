import React, {Component} from 'react';
import {TweenLite} from 'gsap';
import ImageUploader from 'react-images-upload';

class FlugdatenForm3 extends Component {
    constructor(props) {
        super(props);
        this.formular1 = React.createRef();
        this.state = { 
            pictures: [],
            flightPictureURL: [],
            errorMessageImage: '',
            successPreview: false,
            progress: [],
            renderImageUploader: true,
            renderButton: true,
            progressObj: [],
            previewUrl: []
        };
        this.onChange = this.onChange.bind(this);
        this.renderProgressBar = this.renderProgressBar.bind(this);
        this.onSub = this.onSub.bind(this);
    }

    componentWillEnter(callback){
        TweenLite.to(this.formular1.current, .1, {opacity:"0", x:"-900px", onComplete: callback});
    }

    componentDidEnter(callback) {
        TweenLite.to(this.formular1.current, 0.5, {opacity:"1", x:"0px", onComplete: callback});
    }

    componentWillLeave (callback) {
        TweenLite.to(this.formular1.current, 0.5, {opacity:"0", x:"900px", onComplete: callback});
    }
    onChange(picture) {
        console.log(picture);
        if(picture.length === 0){
            this.setState({
                successPreview: false
            });
        }else{
            this.setState({
                pictures: picture,
                successPreview: true
            });
        }        
    }
    onSub(e){
        e.preventDefault();
        console.log('suuuub');
    }
    renderProgressBar(items, objects, prevUrl) {
        return items.map((value, index)=>{
            let styles = [];
            let progressitem = [];
            console.log('ss');
            //map through the progressbar-object of each item
             objects.map((item)=>{ 
                let counter = 0;
                while(value.name === item.name && item.progressbar<=100 &&  counter<1){
                    styles[index] = {
                        width: item.progressbar+'%'
                      };
                    progressitem[index] = Math.round(item.progressbar);
                    counter++;
                }
                if(item.progressbar === 100){
                    item.uploaded = true;
                }
                return item;
              });
              if(progressitem[index] === 0){
                return <div key={index}></div>;
              } else if(progressitem[index] === 100){
                return (
                    <div key={index} className='progress'>
                        <div className='progress__image-wrapper'>
                            <img alt="preview" className='progress__image' src={prevUrl[index]} />
                        </div>
                        <div className='progress__text-wrapper'>
                            <p className='progress__text'>UPLOADED!</p>
                        </div>
                    </div>)
              } else{
                return (
                    <div key={index} className='progress'>
                     <div className='progress__image-wrapper'>
                          <img alt="preview" className='progress__image' src={prevUrl[index]} />
                      </div>
                      <div className='progress__bar-wrapper'>
                          <p className='progress__procent'>0%</p>
                          <div className='progress__outer-bar'>  
                              <div className='progress__inner-bar' style={styles[index]}></div>
                          </div>
                          <p className='progress__procent'>{progressitem[index]}%</p>
                      </div>
                    </div>)
              }
        });
      }

    render() {
        const { onChange, onSubmit, goBack, goNext, renderImageUploader, renderButtonSave, renderButtonClose, pictures, progressObj, previewUrl, renderButtons, renderButtonSaveClose, renderButtonNext, onSubmitImageUploadClose, classNameBackButton} = this.props;
        return (
            <form ref={this.formular1} className="formular" onSubmit={this.onSub}>
                {renderImageUploader &&  <ImageUploader
                withIcon={false}
                buttonClassName={'button button-without-border'}
                buttonText='+ Bilder auswählen'
                onChange={onChange}
                imgExtension={['.jpg', '.png']}
                maxFileSize={5242880}
                withPreview={true}
                label={'Maximale Dateigrösse: 5 MB, akzeptierte Formate: jpg und png'}
                fileSizeError={'Die Datei ist zu gross. Sie darf die Maximalgrösse von 5 MB nicht überschreiten.'}
                fileTypeError={'Es sind nur jpg und png erlaubt.'}
                labelClass={'fileUploader__label'}
                errorClass={'fileUploader__validation'}
            />}
            {!renderImageUploader && <div className="progress-wrapper">{this.renderProgressBar(pictures, progressObj, previewUrl)}</div>}
            {renderButtons &&
                <div className="button-group">
                <div className="button-wrapper">
                    <button type="button" onClick={goBack} className={classNameBackButton}>Zurück</button>
                {renderButtonSave &&
                    <button type="button" onClick={goNext} className="button">Speichern und weiter</button>
                }
                {renderButtonNext &&
                    <button type="button" onClick={goNext} className="button">Weiter</button>
                }
                 </div>
                {renderButtonSaveClose &&
                    <div className="button-wrapper">
                        <button type="button" onClick={onSubmitImageUploadClose} className="button button--large">Speichern und schliessen</button>
                    </div>}
                {renderButtonClose && 
                    <div className="button-wrapper">
                        <button type="submit" className="button button--large" onClick={onSubmit}>Speichern und schliessen</button>
                    </div>} 
                </div>}
            </form>
        );
    }
};
export default FlugdatenForm3;