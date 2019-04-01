import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import guideService from '../service/guideService';
import { withRouter } from 'react-router-dom';

class FileUpload extends Component {

  state = {
    
    isUploading: false,
    progress: 0,
    avatarURL: ''
    };


  uploadImage = async () => {
    const { avatarURL } = this.state;
    const { id } = this.props.match.params;
    const image = {
      image: avatarURL
    }
    console.log(image)
    try {
      const uploadImage = await guideService.addMainImage(id, image);
      console.log(uploadImage)
    } catch(error) {
      console.log(error)
    }
  }  

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    this.setState({progress: 100, isUploading: false});
    firebase.storage().ref('images').child(filename).getDownloadURL()
    .then(url => {
      this.setState({
        avatarURL: url
      })
      this.uploadImage()
    })
    
  };
  render() {
    
    
    return (
      <div>
        <form>
          {this.state.isUploading &&
          <p>Progress: {this.state.progress}</p>
          }
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref('images')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </form>
      </div>
    );
  }
}

export default withRouter(FileUpload);