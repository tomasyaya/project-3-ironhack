import React, { Component } from 'react';
import guideServices from '../service/guideService';
import { withAuth } from '../providers/AuthProvider';
import { emptyArray } from '../helpers/conditionals'; 
import CommentForm from '../components/CommentForm';

class Guide extends Component {

  state = {
    guide: {},
    comments: [],
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
      const { comments } = guide;
      this.setState({
        guide,
        isLoaded: true,
        comments
      })
    } catch(error){
      console.log(error)
    }
  }

  showPlaces = (places) => {
    return places.map(place => (
      <div className="place-container" key={place._id}>
        <h4>{place.name}</h4>
        <p>{place.what}</p>
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
    const { isLoaded, guide, isFavorite, comments } = this.state;
    const { id } = this.props.match.params;
    console.log(comments)
    return (
      <div className="guide-detail-main">
        <h1>Guide</h1>
        <h4>{title}</h4>
        <p>Address: {location}</p>
        <button onClick={this.handleClick}>
          {isFavorite ? "Already a Fav!" : "Add Fav!"}
        </button>
        <h4>Places</h4>
        <div className="places-wrap-div">
          {isLoaded && !emptyArray(guide.places) ? this.showPlaces(guide.places) : null}
        </div>
        <CommentForm  id={id}/>
      </div>
    );
  }
}

export default withAuth(Guide);