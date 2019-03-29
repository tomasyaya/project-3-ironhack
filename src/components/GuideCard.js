import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GuideCard extends Component {
  render() {
    const {location, title, id} = this.props
    return (
      <div className="guide-card">
        <h4>{title}</h4>
        <p>Location: {location}</p>
        <Link to={`/guide/${id}`}>Check it!</Link>
      </div>
    );
  }
}

export default GuideCard;