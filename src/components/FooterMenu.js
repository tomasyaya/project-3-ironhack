import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import FooterLinks from './FooterLinks';

class FooterMenu extends Component {
  
  render() {
    const { isLogged } = this.props
    const div = <div className="footer-menu">
        <FooterLinks />
     </div>
    return (
        <>
        {isLogged ? div : null}
      </>
    );
  }
}

export default withAuth(FooterMenu);