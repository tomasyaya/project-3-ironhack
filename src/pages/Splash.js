import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

class Splash extends Component {
  render() {
    return (
      <div className="splash-screen-main">
        <div className="splash-screen-inner">
          <img src="./images/guide2.png" alt="logo"/>
          <h1>Guide Me</h1>
          <button className="login-button">
            <Link to='/login'>Login</Link>  
          </button>
          <p>
            Don't have an account? <Link to='/signup' id="signup">Signup</Link>  
          </p>
        </div>
      </div>
    );
  }
}

export default withAuth(Splash);