import React, { Component } from 'react';

class OwnGuide extends Component {
  render() {
    const {location, title } = this.props
    return (
      <div>
        <h4>{title}</h4>
        <p>{location}</p>
      </div>
    );
  }
}

export default OwnGuide;