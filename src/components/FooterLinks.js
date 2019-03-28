import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FooterLinks extends Component {
  render() {
    return (
      <div className="footer-links">
        <Link to="/favorites">Favorites</Link>
        <Link to="/user/guides">Admin</Link>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default FooterLinks;