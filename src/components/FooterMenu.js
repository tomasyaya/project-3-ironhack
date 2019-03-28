import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import FooterLinks from './FooterLinks';

class FooterMenu extends Component {
  
  render() {
    const { isLogged } = this.props
    return (
      <div className="footer-menu">
        {isLogged ? <FooterLinks /> : null}
      </div>
    );
  }
}

export default withAuth(FooterMenu);