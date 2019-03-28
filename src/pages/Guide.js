import React, { Component } from 'react';
import guideServices from '../service/guideService';
import { withAuth } from '../providers/AuthProvider';
import { emptyArray } from '../helpers/conditionals'; 

class Guide extends Component {

  state = {
    guide: {},
    isLoaded: false,
    isFavorite: false
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

  handleClick = async () => {
    const { id } = this.props.match.params;
    const { isFavorite } = this.state
    try {
      await guideServices.toggleToFavorites(id);
      this.setState({
        isFavorite: !isFavorite
      })
    } catch(error){
      console.log(error)
    }
  }

  render() {
    const { title, location } = this.state.guide;
    const { isLoaded, guide, isFavorite } = this.state;
    return (
      <div>
        <h1>Guide</h1>
        <h4>{title}</h4>
        <p>Address: {location}</p>
        {isLoaded && !emptyArray(guide.places) ? this.showPlaces(guide.places) : null}
        <button onClick={this.handleClick}>
          {isFavorite ? "Already a Fav!" : "Add Fav!"}
        </button>
      </div>
    );
  }
}

export default withAuth(Guide);