import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import guideService from '../service/guideService';
import EditForm from '../components/EditForm';
import { checkIfEmpty, emptyArray } from '../helpers/conditionals';
import RemovePlace from '../components/RemovePlace';
import FileUpload from '../components/FileUpload';

class EditGuide extends Component {

  state = {
    guide: {},
    places: [],
    isLoaded: false,
    update: false
  }

  componentDidMount(){
    this.getGuide()
  }

  getGuide = async () => {
    const { id } = this.props.match.params;
    try {
      const guide = await guideService.getGuide(id);
      this.setState({
        guide,
        places: [...guide.places],
        isLoaded: true
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

  showGuidePlaces = (places, id) => {
    return places.map(place => (
      <div key={place._id} className="places-div">
        <h4>{place.name}</h4>
        <p>{place.what}</p>
        <p>{place.location}</p>
        <p>{place.description}</p>
        <RemovePlace getGuide={this.getGuide} id={id} place={place._id}/>
      </div>
    ))
  }

  render() {
    const { guide, isLoaded, places } = this.state;

    return (
      <div className="edit-main-div">
        <h4>Add Image</h4>
        <FileUpload />
        <h4>Add Places</h4>
        {!checkIfEmpty(guide) ? <EditForm getGuide={this.getGuide} guide={guide}/> : null}
        <h4>Your Places</h4>
        {isLoaded && !emptyArray(guide.places) ? this.showGuidePlaces(places, guide._id)  : "Loading ..."}
      </div>
    );
  }
}

export default withAuth(EditGuide);