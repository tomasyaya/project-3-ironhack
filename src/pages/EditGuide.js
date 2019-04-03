import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import guideService from '../service/guideService';
import EditForm from '../components/EditForm';
import { checkIfEmpty, emptyArray } from '../helpers/conditionals';
import RemovePlace from '../components/RemovePlace';
import FileUpload from '../components/FileUpload';
import { Link } from 'react-router-dom';
import placeService from '../service/placeService';


class EditGuide extends Component {

  state = {
    guide: {},
    places: [],
    isLoaded: false,
    update: false,
    showEdit: false,
    newPlaces: []
  }

  componentDidMount(){
    this.getGuide()
  }

  getGuide = async () => {
    const { id } = this.props.match.params;
    try {
      const guide = await guideService.getGuide(id);
      const places = await placeService.getPlaces(id)
      this.setState({
        guide,
        places: [...places],
        isLoaded: true,
      })
    } catch(error){
      console.log(error)
    }
  }

  update = () => {
    const { update } = this.state
    this.setState({
      update: !update
    })
  }

  showGuidePlaces = () => {
    const { showEdit } = this.state;
    const { places } = this.state
    return places.map(place => (
      <div key={place._id} className="places-div">
        <h4>{place.name}</h4>
        <p>{place.what}</p>
        <p>{place.location}</p>
        <p>{place.description}</p>
        <RemovePlace getGuide={this.getGuide} id={place._id}/>
        {showEdit ? <Link to={`/places/edit/${place._id}`}>edit</Link> :  null }
      </div>
    ))
  }

  showEditPlaces = () => {
    const { showEdit } = this.state;
    this.setState({
      showEdit: !showEdit
    })
  }

  render() {
    const { guide, isLoaded, places } = this.state;
    const button = <button onClick={this.showEditPlaces}>
      edit
    </button>
    
    return (
      <div className="edit-main-div">
        <h4>Add Image</h4>
        <FileUpload 
          addImage={guideService.addMainImage}
        />
        <h4>Add Places</h4>
        {!checkIfEmpty(guide) ? <EditForm getGuide={this.getGuide} guide={guide}/> : null}
        <h4>Your Places</h4>
        {button}
        {isLoaded && !emptyArray(places) ? this.showGuidePlaces()  : "Loading ..."}
      </div>
    );
  }
}

export default withAuth(EditGuide);