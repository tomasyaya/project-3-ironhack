import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import guideService from '../service/guideService';
import EditForm from '../components/EditForm';
import { checkIfEmpty, emptyArray } from '../helpers/conditionals';

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

  showGuidePlaces = (places) => {
    return places.map(place => (
      <div key={place._id}>
        <h4>{place.name}</h4>
        <p>type: {place.what}</p>
        <p>address: {place.location}</p>
        <p>{place.description}</p>
      </div>
    ))
  }

  render() {
    const { guide, isLoaded } = this.state;
    return (
      <div>
        <h2>Edit Guide</h2>
        {!checkIfEmpty(guide) ? <EditForm guide={guide}/> : null}
        {isLoaded && !emptyArray(guide.places) ? this.showGuidePlaces(guide.places)  : "Loading ..."}
      </div>
    );
  }
}

export default withAuth(EditGuide);