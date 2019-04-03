import React, { Component } from 'react';
import guideService from '../service/guideService';
import { emptyArray } from '../helpers/conditionals';
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
          id={guide._id}
        />
      </div>
    ))
  }
  render() {
    const { favorites, isLoaded } = this.state;
    return (
      <div className="favorite-main-div">
        <h2>Favorites</h2>
        {isLoaded && !emptyArray(favorites) ? this.displayFavorites() : null}
      </div>
    );
  }
}

export default Favorites;