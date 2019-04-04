import React, { Component } from 'react';
import guideService from '../service/guideService';
import { emptyArray } from '../helpers/conditionals';
import GuideCard from '../components/GuideCard';
import { connect } from 'react-redux';
import { sendError } from '../actions/errorActions';

class Favorites extends Component {

  state = {
    favorites: [],
    isLoaded: false
  }

  componentDidMount(){
    this.getFavorites()
  }

  getFavorites = async () => {
    const { push } = this.props.history;
    const { sendError } = this.props;
    try {
      const favorites = await guideService.getFavorites()
      this.setState({
        favorites: [...favorites.favorites],
        isLoaded: true
      })
    } catch(error) {
      sendError(error)
      push('/error')
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

export default connect(null, { sendError })(Favorites);