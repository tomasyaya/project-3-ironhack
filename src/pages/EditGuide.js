import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import guideService from '../service/guideService';
import EditForm from '../components/EditForm';
import { checkIfEmpty, emptyArray } from '../helpers/conditionals';
import RemovePlace from '../components/RemovePlace'

class EditGuide extends Component {

  state = {
    guide: {},
    isLoaded: false
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
        isLoaded: true
      })
    } catch(error){
      console.log(error)
    }
  }

  showGuidePlaces = (places, id) => {
    console.log(places[0]._id)
    return places.map(place => (
      <div key={place._id} className="places-div">
        <h4>{place.name}</h4>
        <p>{place.what}</p>
        <p>{place.location}</p>
        <p>{place.description}</p>
        <RemovePlace id={id} place={place._id}/>
      </div>
    ))
  }

  render() {
    const { guide, isLoaded } = this.state;
    console.log(this.state)
    return (
      <div className="edit-main-div">
        <h2>Add Places</h2>
        {!checkIfEmpty(guide) ? <EditForm guide={guide}/> : null}
        {isLoaded && !emptyArray(guide.places) ? this.showGuidePlaces(guide.places, guide._id)  : "Loading ..."}
      </div>
    );
  }
}

export default withAuth(EditGuide);