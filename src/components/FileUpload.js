import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendError } from '../actions/errorActions';

class FileUpload extends Component {

  state = {
    
    isUploading: false,
    progress: 0,
    avatarURL: ''
    };


  uploadImage = async () => {
    const { avatarURL } = this.state;
    const { id } = this.props.match.params;
    const { addImage, sendError } = this.props;
    const { push } = this.props.history;
    const image = {
      image: avatarURL
    }
    try {
      await addImage(id, image)
    } catch(error) {
      sendError(error)
      push('/error')
    }
  }  

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false});
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
        <form className="upload-form">
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

export default connect(null, { sendError })(withRouter(FileUpload));