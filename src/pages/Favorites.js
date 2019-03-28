import React, { Component } from 'react';
import guideService from '../service/guideService';
import { emptyArray } from '../helpers/conditionals';
import { Link } from 'react-router-dom';
import GuideCard from '../components/GuideCard';

class Favorites extends Component {

  state = {
    favorites: [],
    isLoaded: false
  }

  componentDidMount(){
    this.getFavorites()
  }

  getFavorites = async () => {
    try {
      const favorites = await guideService.getFavorites()
      this.setState({
        favorites: [...favorites.favorites],
        isLoaded: true
      })
    } catch(error) {
      console.log(error)
    }
  }

  displayFavorites = () => {
    const { favorites } = this.state;
    return favorites.map(guide => (
      <div key={guide._id}>
        <GuideCard 
          title={guide.title}
          location={guide.location}
        />
        <Link to={`/guide/${guide._id}`}>See More!</Link>
      </div>
    ))
  }
  render() {
    const { favorites, isLoaded } = this.state;
    console.log(favorites)
    return (
      <div>
        <h2>Favorites</h2>
        {isLoaded && !emptyArray(favorites) ? this.displayFavorites() : null}
      </div>
    );
  }
}

export default Favorites;