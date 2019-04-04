import React, { Component } from 'react';
import placeService from '../service/placeService';
import FileUpload from '../components/FileUpload';
import { emptyArray } from '../helpers/conditionals';
import { connect } from 'react-redux';
import { sendError } from '../actions/errorActions';


class EditPlace extends Component {

  state = {
    place: {},
    isLoaded: false
  }

  componentDidMount() {
    this.searchPlace()
  }

  searchPlace = async () => {
    const { id } = this.props.match.params;
    const { push } = this.props.history;
    const { sendError } = this.props;
    try {
      const  place = await placeService.getPlace(id)
      this.setState({
        place,
        isLoaded: true
      })
    } catch(error) {
      sendError(error)
      push('/error')
    }
  }

  printImages = () => {
    const { place: { images } } = this.state;
    return images.map(image => {
      const { url, _id } = image;
      return (
        <img 
          className="places-images-container"
          src={url} 
          alt="img" 
          key={_id}  
        />
      )
    })
  }

  render() {
    const { name, type, location, description, images  } = this.state.place
    const { isLoaded } = this.state;
    
    return (
      <div className="edit-places-main">
        <h2>IMPROVE PLACE</h2>
        <p>{name}</p>
        <p>{type}</p>
        <p>{location}</p>
        <p>{description}</p>
        <div className="images-container">
          {isLoaded && !emptyArray(images) ? this.printImages() : null}
        </div>
        <div className="file-uploaded">
          <FileUpload 
            addImage={placeService.addImage}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, { sendError })(EditPlace);