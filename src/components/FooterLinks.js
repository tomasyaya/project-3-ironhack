import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FooterLinks extends Component {
  render() {
    return (
      <div className="footer-links">
        <Link to="/private">Private</Link>
        <Link to="/create">New Guide</Link>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default FooterLinks;