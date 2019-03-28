import React, { Component } from 'react';

class GuideCard extends Component {
  render() {
    const {location, title} = this.props
    return (
      <div>
        <h4>{title}</h4>
        <p>Location: {location}</p>
      </div>
    );
  }
}

export default GuideCard;