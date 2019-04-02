import React, { Component } from 'react';
import placeService from '../service/placeService';
import PlaceReviews from '../components/PlaceReviews';
import { checkEqual } from '../helpers/conditionals';

class Place extends Component {

  state = {
    place: {},
    isLoaded: false,
    reviews: [],
    average: 0,
    reviewCount: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    }
  }

  componentDidMount() {
    this.getPlaces()
    
  }

  getPlaces = async () => {
    const { id } = this.props.match.params
    try {
      const place = await placeService.getPlace(id)
      const { reviews } = place
      this.setState({
        place,
        reviews: [...reviews]
      })
      this.sumReviews()
      this.averageReview()
      this.setState({
        isLoaded: true
      })
    } catch(error) {
      console.log(error)
    }
  }

  sumReviews = () => {
    const { reviews, reviewCount } =  this.state;
    reviews.forEach(data => {
      const { review } = data;  
      reviewCount[review] += 1;
    })
  }

  averageReview = () => {
    const { reviews } =  this.state;
    const length = reviews.length;
    const sum = reviews.reduce((acc, next) => {
      return acc + next.review
    },0)
    let average = sum / length
    this.setState({
      average,
      isLoaded: true
    })
  }

  render() {
    const { type, name, location, description, images } = this.state.place
    return (
      <div className="place-detail-main">
        
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{type}</p>
        <p>{location}</p>
        <PlaceReviews
          getPlace={this.getPlaces}
        />
      </div>
    );
  }
}

export default Place;