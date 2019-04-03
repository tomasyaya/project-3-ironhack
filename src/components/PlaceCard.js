import React, { Component } from 'react';
import { emptyArray } from '../helpers/conditionals';
import { Link } from 'react-router-dom';

class PlaceCard extends Component {


  render() {
    const { images, location, name, type, description, id } = this.props;
    
    return (
      <div className="place-container" key={id}>
          {!emptyArray(images) ? 
            <img src={images[0].url}  alt="place-img" /> 
          : null }
          <h4>{name}</h4>
          <p>{type}</p>
          <p>{location}</p>
          <p>{description}</p>
          <Link to={`/place/${id}`}>More</Link>
      </div>
    );
  }
}

export default PlaceCard;