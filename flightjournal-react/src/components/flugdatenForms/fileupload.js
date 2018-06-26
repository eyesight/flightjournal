import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import firebase from 'firebase';

class ProfilePage extends Component {
 
    constructor(props) {
        super(props);
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
         this.onClick = this.onClick.bind(this);
         this.getUrl = this.getUrl.bind(this);
         this.renderProgressBar = this.renderProgressBar.bind(this);
    }
 
    onChange(picture) {
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

    onClick(){
        let file = this.state.pictures;
        let that = this;
        this.setState({renderButton: false});
        file.forEach(function(element) {  
            //PreviewUrl safe in state "preview Url"
            let reader = new FileReader();
            reader.onload = function(event) {
                that.setState({
                    previewUrl: that.state.previewUrl.concat(event.target.result)
                })
            };
            reader.readAsDataURL(element);
            
            let img = firebase.storage().ref('images/'+element.name).put(element);
            img.on('state_changed', function(snapshot){
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                let obj = {name: element.name, progressbar: progress, uploaded: false};
                that.setState({
                    progress: progress,
                    renderImageUploader: false,
                    progressObj: that.state.progressObj.concat(obj)
                });
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                default:
                    console.log('default');
                    break;
                }
              }, function(error) {
                that.setState({errorMessageImage: error})
                console.log(error);
              }, function() {
                    that.setState({
                        flightPictureURL: that.state.flightPictureURL.concat(img.snapshot.downloadURL),
                        successPreview: false
                    });
                    console.log('Uploaded a blob or file!');
              });
        });
    }

    getUrl(filename){
         firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({flightPictureURL: url}));
    }

    renderProgressBar(items, objects, prevUrl) {
        return items.map((value, index)=>{
            let styles = [];
            let progressitem = [];

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
                      <div className='progress__text-wrapper'>
                          <p className='progress__text'>{value.name}</p>
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
        return (
            <div>
            <h1>fileupload</h1>
            <h1> s</h1>
            {this.state.renderImageUploader &&  <ImageUploader
                withIcon={false}
                buttonClassName={'button button-without-border'}
                buttonText='+ Bilder auswählen'
                onChange={this.onChange}
                imgExtension={['.jpg', '.png']}
                maxFileSize={5242880}
                withPreview={true}
                label={'Maximale Dateigrösse: 5 MB, akzeptierte Formate: jpg und png'}
                fileSizeError={'Die Datei ist zu gross. Sie darf die Maximalgrösse von 5 MB nicht überschreiten.'}
                fileTypeError={'Es sind nur jpg und png erlaubt.'}
                labelClass={'fileUploader__label'}
                errorClass={'fileUploader__validation'}
            />}
            {!this.state.renderImageUploader && <div className="progress-wrapper">{this.renderProgressBar(this.state.pictures, this.state.progressObj, this.state.previewUrl)}</div>}
            {this.state.renderButton && 
            <div className="button-group">
                    <div className="button-wrapper">
                        <button type="submit" className="button" onClick={this.onClick}>Speichern und schliessen</button>
                    </div>
                </div>}
            </div>
        );
    }
}
export default ProfilePage;