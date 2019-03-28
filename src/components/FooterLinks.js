import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FooterLinks extends Component {
  render() {
    return (
      <div>
        <Link to="private">Private</Link>
      </div>
    );
  }
}

export default FooterLinks;