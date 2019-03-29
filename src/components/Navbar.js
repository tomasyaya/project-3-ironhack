import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withAuth } from '../providers/AuthProvider';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
  
  render() {
    const { isLogged, user, logout, history } = this.props;
    const { username } = user;
    if (isLogged) {
      return <div>
        <p onClick={history.goBack}>
          <FontAwesomeIcon icon="arrow-left" />
        </p>
        <p>{ username }</p>
        <p onClick={logout}>Logout</p>
      </div>
    } else {
      return <div>
        {/* <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link> */}
      </div>
    }
  
  }
}

export default withRouter(withAuth(Navbar));