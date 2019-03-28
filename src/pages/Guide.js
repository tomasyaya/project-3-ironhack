import React, { Component } from 'react';
import guideServices from '../service/guideService';
import { withAuth } from '../providers/AuthProvider';
import { emptyArray } from '../helpers/conditionals'; 

class Guide extends Component {

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
      const guide = await guideServices.getGuide(id);
      this.setState({
        guide,
        isLoaded: true
      })
    } catch(error){
      console.log(error)
    }
  }

  showPlaces = (places) => {
    return places.map(place => (
      <div key={place._id}>
        <p>{place.name}</p>
        <p>type: {place.what}</p>
        <p>{place.location}</p>
        <p>{place.description}</p>
      </div>
    ))
  }

  render() {
    const { title, location } = this.state.guide;
    const { isLoaded, guide } = this.state;
    return (
      <div>
        <h1>Guide</h1>
        <h4>{title}</h4>
        <p>Address: {location}</p>
        {isLoaded && !emptyArray(guide.places) ? this.showPlaces(guide.places) : null}
      </div>
    );
  }
}

export default withAuth(Guide);