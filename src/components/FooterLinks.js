import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FooterLinks extends Component {
  render() {
    return (
      <div className="footer-links">
        <Link to="/favorites">
          <FontAwesomeIcon icon="heart" id="heart" />
        </Link>
        <Link to="/">
          <FontAwesomeIcon icon="stop-circle" id="home" />
        </Link>
        <Link to="/user/guides">
          <FontAwesomeIcon icon="folder-plus" id="favorite" />
        </Link>
      </div>
    );
  }
}

export default FooterLinks;