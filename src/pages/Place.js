import React, { Component } from 'react';
import placeService from '../service/placeService';
import PlaceReviews from '../components/PlaceReviews';

class Place extends Component {

  state = {
    place: {},
    isLoaded: false
  }

  componentDidMount() {
    this.getPlaces()
  }

  getPlaces = async () => {
    const { id } = this.props.match.params
    try {
      const place = await placeService.getPlace(id)
      this.setState({
        place,
        isLoaded: true
      })
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { type, name, location, description, images } = this.state.place
    
    return (
      <div className="place-detail-main">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{type}</p>
        <p>{location}</p>
        <PlaceReviews />
      </div>
    );
  }
}

export default Place;